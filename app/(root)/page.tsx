import { BlogList } from "@/shared/components/blogList";
import { SEO } from "@/shared/components/seo";
import { fetchBlogs } from "@/utils/fetch-blogs";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    ["search"]: string | undefined;
    ["page"]: string | undefined;
  }>;
}) {
  const { page, search } = await searchParams;

  const { blogs, pagination, pageNumber } = await fetchBlogs({
    page: Number(page || 1),
    search,
  });

  const pageTitle = "Latest Blogs";
  const pageDescription =
    "Discover the latest blogs on our platform. Stay informed and inspired with our curated content.";
  const pageUrl = `${process.env.NEXT_PUBLIC_BLOG_APP_URL}`;
  const keywords = "blogs, latest articles, news, updates";

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        url={pageUrl}
        keywords={keywords}
      />

      <BlogList blogs={blogs} pagination={pagination} pageNumber={pageNumber} />
    </>
  );
}
