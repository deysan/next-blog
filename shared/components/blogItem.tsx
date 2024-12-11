import Image from "next/image";
import Link from "next/link";

import { BlogType } from "@/types";
import { formatDate } from "@/utils/api-helpers";

import { Badge } from "../ui/badge";

export function BlogItem({ blog }: { blog: BlogType }) {
  return (
    <article>
      <div className="flex items-center">
        <Image
          src={blog.image.url ?? "/public/blogApp.jpg"}
          alt={blog.title}
          className="rounded-t-2xl w-full object-cover"
          width={400}
          height={200}
          priority
        />
      </div>

      <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
        <span className="text-indigo-600 font-medium mb-3 block">
          {formatDate(blog.publishedAt)}
        </span>

        <h4 className="text-xl text-gray-900 font-medium leading-8 mb-5 line-clamp-2">
          {blog.title}
        </h4>

        <p className="text-gray-500 leading-6 mb-4 line-clamp-2">
          {blog.description}
        </p>

        {blog.tags.length > 0 && (
          <div className="flex gap-2 mb-6">
            {blog.tags.map(({ id, name }) => (
              <Link key={id} href={`?tag=${name}`}>
                <Badge name={name} />
              </Link>
            ))}
          </div>
        )}

        <Link
          href={`/blog/${blog.slug}`}
          className="cursor-pointer text-lg text-indigo-600 font-semibold"
        >
          Read in {blog.readTime} minutes
        </Link>
      </div>
    </article>
  );
}
