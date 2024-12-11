import { PageProps } from "@/.next/types/app/layout";
import { BlogItem } from "@/shared/components/blogItem";
import { Pagination } from "@/shared/components/pagination";
import { BlogResponseType, SearchParamsProps } from "@/types";
import { fetchAPI } from "@/utils/fetch-api";
import Head from "next/head";

const PAGE_LIMIT = 3;

const getBlogs = async ({
  page = 1,
  search,
  tag,
}: {
  page?: number;
  search?: string;
  tag?: string;
}) => {
  const { data, meta } = await fetchAPI<BlogResponseType>("/blogs", {
    pagination: {
      limit: PAGE_LIMIT,
      start: (page - 1) * PAGE_LIMIT,
    },
    populate: {
      image: { fields: ["url"] },
      tags: { fields: ["name"] },
    },
    sort: { publishedAt: "desc" },
    ...(search
      ? {
          filters: {
            $or: [
              { title: { $contains: search } },
              { description: { $contains: search } },
              { content: { $contains: search } },
              { tags: { $contains: search } },
            ],
          },
        }
      : {}),
    ...(tag
      ? {
          filters: {
            tags: {
              name: {
                $eq: tag,
              },
            },
          },
        }
      : {}),
  });

  return { blogs: data, pagination: meta.pagination, pageNumber: page };
};

export default async function Home({
  params,
}: {
  params: Promise<{
    ["search"]: string | undefined;
    ["tag"]: string | undefined;
    ["page"]: string | undefined;
  }>;
}) {
  const { page, search, tag } = await params;
  const { blogs, pagination, pageNumber } = await getBlogs({
    page: Number(page || 1),
    search,
    tag,
  });

  const pageTitle = tag ? `Blogs tagged with "${tag}"` : "Latest Blogs";
  const pageDescription = tag
    ? `Explore blogs related to "${tag}".`
    : "Discover the latest blogs on our platform. Stay informed and inspired with our curated content.";
  const pageUrl = `${process.env.NEXT_PUBLIC_BLOG_APP_URL}${
    tag ? `?tag=${tag}` : ""
  }`;
  const keywords = tag
    ? `blogs, ${tag}, articles, content`
    : "blogs, latest articles, news, updates";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={"/public/blogApp.jpg"} />
        <meta property="og:site_name" content="Blog App" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={"/public/blogApp.jpg"} />
      </Head>

      {blogs.length > 0 ? (
        <ul className="grid grid-cols-1 gap-y-8 lg:gap-y-0 grid-cols-1 lg:grid-cols-3 lg:justify-start lg:gap-x-8">
          {blogs.map((item) => (
            <li
              key={item.id}
              className="group w-full mx-auto max-lg:max-w-xl border border-gray-300 rounded-2xl"
            >
              <BlogItem blog={item} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 text-sm">No results found</p>
      )}

      <div className="flex justify-center mt-10 gap-x-4">
        <Pagination
          pageNumber={pageNumber}
          isNext={pagination.start + pagination.limit < pagination.total}
        />
      </div>
    </>
  );
}
