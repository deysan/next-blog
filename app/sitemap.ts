import { BlogResponseType, TagResponseType } from "@/types";
import { fetchAPI } from "@/utils/fetch-api";
import type { MetadataRoute } from "next";

async function fetchBlogs() {
  const { data } = await fetchAPI<BlogResponseType>("/blogs");
  return data;
}

async function fetchTags() {
  const { data } = await fetchAPI<TagResponseType>("/tags");
  return data;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = `${process.env.NEXT_PUBLIC_BLOG_APP_URL}`;

  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "daily" as const,
      priority: 1,
    },
  ];

  const [blogs, tags] = await Promise.all([fetchBlogs(), fetchTags()]);

  const blogPages = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt).toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const tagPages = tags.map((tag) => ({
    url: `${baseUrl}/tags/${tag.name}`,
    lastModified: new Date(tag.updatedAt).toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages, ...tagPages];
}
