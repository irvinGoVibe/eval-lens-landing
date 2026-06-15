"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const GROUPS = [
  {
    title: "Blog",
    links: [
      { href: "/admin/blog/articles", label: "Articles" },
      { href: "/admin/blog/reposts", label: "Reposts" },
    ],
  },
  {
    title: "Home",
    links: [{ href: "/admin/home/featured", label: "Blog block" }],
  },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="admin-nav">
      {GROUPS.map((group) => (
        <div key={group.title}>
          <p className="admin-nav__group-title">{group.title}</p>
          {group.links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`admin-nav__link${active ? " is-active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
