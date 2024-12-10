import Link from "next/link";

import { Search } from "./search";

export function Header() {
  return (
    <header className="flex items-center justify-between py-4 lg:py-6 flex-wrap gap-4">
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-semibold text-gray-900">
          Blog App
        </Link>
      </div>

      <Search className="w-full flex-grow order-2 lg:order-none lg:max-w-md " />

      <div className="flex items-center gap-x-4">
        <a
          href="#"
          className="text-gray-500 hover:text-gray-700 transition-all duration-300 font-medium"
        >
          About
        </a>
        <a
          href="#"
          className="text-gray-500 hover:text-gray-700 transition-all duration-300 font-medium"
        >
          Contact
        </a>
      </div>
    </header>
  );
}