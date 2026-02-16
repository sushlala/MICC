import Link from "next/link";

const SERVICES_LINKS = [
  { label: "Concierge", href: "/concierge" },
  { label: "Experiences", href: "/experiences" },
  { label: "Packages", href: "/packages" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Press", href: "#" },
  { label: "Contact", href: "#" },
];

const SMS_HREF = "sms:+1XXXXXXXXXX";

export function Footer() {
  return (
    <footer
      className="border-t border-[rgba(201,169,110,0.2)]"
      style={{
        background: "var(--navy)",
        paddingTop: 80,
        paddingBottom: 40,
      }}
    >
      <div className="max-w-[var(--container-max)] mx-auto px-[var(--container-pad)]">
        {/* ── 4-Column Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div>
            <Link
              href="/"
              className="font-display text-[1.4rem] tracking-wider"
              style={{ color: "var(--beige)" }}
            >
              MICC
            </Link>
            <p
              className="mt-4 text-[0.9rem] leading-relaxed"
              style={{ color: "rgba(245, 240, 232, 0.7)" }}
            >
              One text. One team.
              <br />
              Unforgettable night.
            </p>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4
              className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.15em] mb-5"
              style={{ color: "var(--beige)" }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.85rem] transition-colors duration-200 hover:text-[var(--beige)]"
                    style={{ color: "rgba(245, 240, 232, 0.6)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4
              className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.15em] mb-5"
              style={{ color: "var(--beige)" }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[0.85rem] transition-colors duration-200 hover:text-[var(--beige)]"
                    style={{ color: "rgba(245, 240, 232, 0.6)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Get Started */}
          <div>
            <h4
              className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.15em] mb-5"
              style={{ color: "var(--beige)" }}
            >
              Get Started
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={SMS_HREF}
                  className="text-[0.85rem] transition-colors duration-200 hover:text-[var(--beige)]"
                  style={{ color: "rgba(245, 240, 232, 0.6)" }}
                >
                  Text Us
                </a>
              </li>
              <li>
                <Link
                  href="/request"
                  className="text-[0.85rem] transition-colors duration-200 hover:text-[var(--beige)]"
                  style={{ color: "rgba(245, 240, 232, 0.6)" }}
                >
                  Start a Request
                </Link>
              </li>
              <li>
                <a
                  href="https://instagram.com/micc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[0.85rem] transition-colors duration-200 hover:text-[var(--beige)]"
                  style={{ color: "rgba(245, 240, 232, 0.6)" }}
                >
                  {/* Instagram icon */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                  @micc
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div
          className="mt-16 pt-6 border-t border-[rgba(201,169,110,0.1)] flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ color: "rgba(245, 240, 232, 0.5)" }}
        >
          <p className="font-sans text-[0.75rem]">
            &copy; 2026 MICC LLC
          </p>
          <div className="flex items-center gap-4 font-sans text-[0.75rem]">
            <Link href="#" className="hover:text-[var(--beige)] transition-colors duration-200">
              Privacy
            </Link>
            <Link href="#" className="hover:text-[var(--beige)] transition-colors duration-200">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
