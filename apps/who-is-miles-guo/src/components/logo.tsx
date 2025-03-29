import clsx from "clsx";
import Link from "next/link";
import React from "react";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href={"/"} title="Home">
      <h2
        className={clsx(
          "text-lg font-semibold uppercase px-4 group-hover:text-pink-700 duration-300",
          className
        )}
      >
        Bloggers
      </h2>
    </Link>
  );
}
