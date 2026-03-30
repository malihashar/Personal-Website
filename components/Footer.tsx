export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 text-sm text-slate-400 md:flex-row">
        <p>© {new Date().getFullYear()} Muhammad Ali Hashar</p>
        <p>Toronto, Canada</p>
      </div>
    </footer>
  );
}
