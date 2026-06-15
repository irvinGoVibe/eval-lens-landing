"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const GROUPS = [
  {
    title: "Блог",
    links: [
      { href: "/admin/blog/articles", label: "Статьи" },
      { href: "/admin/blog/reposts", label: "Репосты" },
    ],
  },
  {
    title: "Главная",
    links: [{ href: "/admin/home/featured", label: "Блок «Блог»" }],
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
