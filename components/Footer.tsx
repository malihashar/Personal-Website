export default function Footer() {
  return (
    <footer className="relative z-10 mt-10 border-t border-[var(--border)] px-6 py-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-2 text-sm text-[var(--muted)] md:flex-row">
        <p>© {new Date().getFullYear()} Muhammad Ali Hashar</p>
        <p>Toronto, Canada</p>
      </div>
    </footer>
  );
}
