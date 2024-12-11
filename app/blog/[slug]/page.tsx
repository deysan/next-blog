import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

import { Badge } from "@/shared/ui/badge";
import { BlogResponseType } from "@/types";
import { formatDate } from "@/utils/api-helpers";
import { fetchAPI } from "@/utils/fetch-api";

const getBlog = async (slug: string | undefined) => {
  try {
    const { data } = await fetchAPI<BlogResponseType>("/blogs", {
      filters: { slug },
      populate: {
        image: { fields: ["url"] },
        tags: { fields: ["name"] },
      },
    });
    return data[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string | undefined }>;
}) {
  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) return notFound();

  const imageUrl = blog.image?.url ?? "/public/blogApp.jpg";
  const pageTitle = blog.title;
  const pageDescription =
    blog.description ??
    "Explore this article to learn more about the topic discussed.";
  const pageUrl = `${process.env.NEXT_PUBLIC_BLOG_APP_URL}/${slug}`;
  const keywords =
    blog.tags.map((tag) => tag.name).join(", ") || "blog, articles";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Blog App" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
      </Head>

      <section>
        <Image
          src={imageUrl}
          alt={blog.title}
          height={200}
          width={1216}
          className="rounded-t-2xl max-h-[200px] object-cover"
        />
        <h1 className="text-4xl font-bold text-gray-900 mb-4 mt-8">
          {blog.title}
        </h1>

        <p className="text-gray-500 text-sm">{formatDate(blog.publishedAt)}</p>

        <hr className="mt-4 mb-8" />

        <Markdown className="my-8 rich-text">{blog.content}</Markdown>

        <div className="flex gap-x-4 justify-end">
          {blog.tags.map(({ id, name }) => (
            <Link key={id} href={`/?tag=${name}`}>
              <Badge name={name} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
