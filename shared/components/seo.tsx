import Head from "next/head";

export function SEO({
  title,
  description,
  url,
  image = "/public/blogApp.jpg",
  keywords = "blogs, articles, content",
  type = "website",
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  keywords?: string;
  type?: string;
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Blog App" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
