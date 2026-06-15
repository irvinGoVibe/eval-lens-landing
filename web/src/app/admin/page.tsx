import Link from "next/link";

const CARDS = [
  {
    href: "/admin/blog/articles",
    title: "Articles",
    desc: "Write and publish long-form blog articles in Markdown.",
    cta: "Manage articles",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M5 3h7l3 3v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M7 9h6M7 12h6M7 15h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/admin/blog/reposts",
    title: "Reposts",
    desc: "Curate photo and video loop posts with galleries and captions.",
    cta: "Manage reposts",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="7.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="m4 14 4-3 3 2 3-3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/admin/home/featured",
    title: "Home blog block",
    desc: "Pick which articles appear in the home page blog block and their order.",
    cta: "Edit selection",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 8.5 10 3l7 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 9v7h10V9" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function AdminHome() {
  return (
    <div>
      <p className="admin-eyebrow">EvalLense CMS</p>
      <h1 className="admin-h1">Dashboard</h1>
      <p className="admin-sub">
        Manage blog content and the blog block on the home page.
      </p>
      <div className="admin-cards">
        {CARDS.map((card) => (
          <Link key={card.href} className="admin-card" href={card.href}>
            <span className="admin-card__icon">{card.icon}</span>
            <span className="admin-card__title">{card.title}</span>
            <span className="admin-card__desc">{card.desc}</span>
            <span className="admin-card__cta">
              {card.cta}
              <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
