"use client";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div>
      <div>
        <Link href="/store/my">My</Link>
        <Link href="/store/my/work">work</Link>
      </div>
      {children}
    </div>
  );
}
