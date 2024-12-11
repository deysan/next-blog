import Link from "next/link";

import { Search } from "./search";
import { Suspense } from "react";

export function Header() {
  return (
    <header className="flex items-center justify-between py-4 lg:py-6 flex-wrap gap-4">
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-semibold text-gray-900">
          Blog App
        </Link>
      </div>

      <Suspense fallback={<p>Loading...</p>}>
        <Search className="w-full flex-grow order-2 lg:order-none lg:max-w-md " />
      </Suspense>

      <div className="flex items-center gap-x-4">
        <a
          href="https://github.com/deysan"
          className="text-gray-500 hover:text-gray-700 transition-all duration-300 font-medium"
          target="_blank"
        >
          Author
        </a>
      </div>
    </header>
  );
}
