import { Suspense } from "react";

import { BlogType, MetaType } from "@/types";

import { BlogItem } from "./blogItem";
import { Pagination } from "./pagination";

export function BlogList({
  blogs,
  pagination,
  pageNumber,
}: {
  blogs: BlogType[];
  pagination: MetaType["pagination"];
  pageNumber: number;
}) {
  return (
    <div>
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
        <Suspense fallback={<p>Loading...</p>}>
          <Pagination
            pageNumber={pageNumber}
            isNext={pagination.start + pagination.limit < pagination.total}
          />
        </Suspense>
      </div>
    </div>
  );
}
