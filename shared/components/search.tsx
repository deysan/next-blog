"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { formUrlQuery, removeKeysFromQuery } from "@/utils/query-params";

export function Search({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("search");

  const [search, setSearch] = useState(query || "");
  const [queryString, setQueryString] = useState(searchParams.toString());

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: queryString,
          key: "search",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newQuery = removeKeysFromQuery({
            params: queryString,
            keysToRemove: ["search"],
          });

          router.push(`${window.location.pathname}?${newQuery}`, {
            scroll: false,
          });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, router, pathname, queryString, query]);

  useEffect(() => {
    setSearch(query || "");
    setQueryString(searchParams.toString());
  }, [searchParams]);

  return (
    <form className={`mx-auto ${className || ""}`.trim()}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative min-w-[300px]">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Image src="/search.svg" alt="Search" width={20} height={20} />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Search blog"
          required
          value={search}
          onChange={(e) => {
            const newQuery = removeKeysFromQuery({
              params: queryString,
              keysToRemove: ["page", "tag"],
            });

            setQueryString(newQuery);
            setSearch(e.target.value);
          }}
        />
      </div>
    </form>
  );
}
