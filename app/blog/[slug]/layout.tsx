import Link from "next/link";

import { Button } from "@/shared/ui/button";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}

      <Link href="/">
        <Button>Back to Home</Button>
      </Link>
    </>
  );
}
