const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)]/70 bg-[var(--background)]/75 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#home"
          className="font-heading text-sm font-semibold tracking-[0.22em] text-[var(--foreground)] transition hover:text-[var(--accent)]"
        >
          MH
        </a>
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
