export type BlogType = {
  content: string;
  createdAt: string;
  description: string;
  id: number;
  image: ImageType;
  publishedAt: string;
  readTime: number;
  slug: string;
  tags: TagType[];
  title: string;
  updatedAt: string;
};

export type ImageType = {
  url: string | null;
};

export type TagType = {
  id: number;
  name: string;
  updatedAt: string;
};

export type PaginationType = {
  limit: number;
  start: number;
  total: number;
};

export type MetaType = {
  pagination: PaginationType;
};

export type BlogResponseType = {
  data: BlogType[];
  meta: MetaType;
};

export type TagResponseType = {
  data: TagType[];
  meta: MetaType;
};

export type SearchParamsProps = {
  searchParams: { [key: string]: string | undefined };
};
