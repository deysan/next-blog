"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { formUrlQuery } from "@/utils/query-params";

import { Button } from "../ui/button";

export function Pagination({
  pageNumber,
  isNext,
}: {
  pageNumber: number;
  isNext: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl);
  };

  if (!isNext && pageNumber === 1) return null;

  return (
    <div className="flex justify-center gap-x-4">
      <Button
        onClick={() => handleNavigation("prev")}
        disabled={pageNumber === 1}
      >
        Previous
      </Button>
      <Button onClick={() => handleNavigation("next")} disabled={!isNext}>
        Next
      </Button>
    </div>
  );
}
