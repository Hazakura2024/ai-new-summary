import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 z-50 flex justify-between items-center w-full border-b border-slate-200/50 bg-white/60 shadow-lg backdrop-blur-sm p-2">
      <Link href="/">
        <h1 className="text-xl font-bold">AI-news-summary</h1>
      </Link>
      <nav className="font-medium pr-2">
        <Link href="/history">history</Link>
      </nav>
    </header>
  );
}
