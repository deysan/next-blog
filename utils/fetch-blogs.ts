import { BlogResponseType } from "@/types";

import { fetchAPI } from "./fetch-api";

const PAGE_LIMIT = 3;

export const fetchBlogs = async ({
  page = 1,
  search,
  tag,
  pageLimit = PAGE_LIMIT,
}: {
  page?: number;
  search?: string;
  tag?: string;
  pageLimit?: number;
}) => {
  try {
    const filters = {
      ...(tag && { tags: { name: tag } }),
      ...(search && {
        $or: [
          { title: { $contains: search } },
          { description: { $contains: search } },
          { content: { $contains: search } },
        ],
      }),
    };

    const { data, meta } = await fetchAPI<BlogResponseType>("/blogs", {
      pagination: {
        limit: pageLimit,
        start: (page - 1) * pageLimit,
      },
      populate: {
        image: { fields: ["url"] },
        tags: { fields: ["name"] },
      },
      sort: { publishedAt: "desc" },
      ...(Object.keys(filters).length ? { filters } : {}),
    });

    return { blogs: data, pagination: meta.pagination, pageNumber: page };
  } catch (error) {
    console.error(error);
    return {
      blogs: [],
      pagination: { limit: pageLimit, start: 0, total: 0 },
      pageNumber: page,
    };
  }
};
