import Link from "next/link";

const footerLinks = {
  Learn: [
    { href: "/academy", label: "Football Academy" },
    { href: "/academy/rules", label: "Rules" },
    { href: "/academy/positions", label: "Positions" },
    { href: "/academy/formations", label: "Formations" },
    { href: "/academy/tactics", label: "Tactics" },
  ],
  Explore: [
    { href: "/players", label: "Players" },
    { href: "/teams", label: "Teams" },
    { href: "/coaches", label: "Coaches" },
    { href: "/glossary", label: "Glossary" },
  ],
  Tools: [
    { href: "/sensei", label: "AI Football Sensei" },
    { href: "/predictor", label: "World Cup Predictor" },
    { href: "/compare", label: "Compare" },
  ],
};

export default function Footer() {
  return (
    <footer
      id="main-footer"
      className="mt-auto border-t border-border-light bg-background-secondary"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <span className="text-2xl">⚽</span>
              <span>
                Learn<span className="text-accent">Football</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-foreground-muted">
              The easiest way for complete beginners to become knowledgeable
              football fans.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground-secondary">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border-light pt-8 sm:flex-row">
          <p className="text-xs text-foreground-muted">
            © {new Date().getFullYear()} TacticSensei. All rights reserved.
          </p>
          <p className="text-xs text-foreground-muted">
            Built with ❤️ for football beginners
          </p>
        </div>
      </div>
    </footer>
  );
}
