import { BlogList } from "@/shared/components/blogList";
import { SEO } from "@/shared/components/seo";
import { fetchBlogs } from "@/utils/fetch-blogs";

export default async function TagPage({
  params,
  searchParams,
}: {
  params: Promise<{ tag: string | undefined }>;
  searchParams: Promise<{
    ["search"]: string | undefined;
    ["page"]: string | undefined;
  }>;
}) {
  const { tag } = await params;
  const { page, search } = await searchParams;

  const { blogs, pagination, pageNumber } = await fetchBlogs({
    page: Number(page || 1),
    search,
    tag,
  });

  const pageTitle = `Blogs tagged with "${tag}"`;
  const pageDescription = `Explore blogs related to "${tag}".`;
  const pageUrl = `${process.env.NEXT_PUBLIC_BLOG_APP_URL}/tags/${tag}`;
  const keywords = `blogs, ${tag}, articles, content`;

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        url={pageUrl}
        keywords={keywords}
      />

      <h1 className="text-center text-3xl font-bold mb-10">
        Blogs by tag <span className="text-indigo-600">“{tag}”</span>
      </h1>

      <BlogList blogs={blogs} pagination={pagination} pageNumber={pageNumber} />
    </>
  );
}
