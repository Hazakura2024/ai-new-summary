import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function historyPage() {
  const summaries = await prisma.summary.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center p-6 pt-24 bg-[url('/bg-yokohama.jpg')] bg-cover bg-center bg-fixed">
      <div className="w-full max-w-md space-y-8 bg-white/60 p-8 rounded-xl shadow-lg backdrop-blur-sm">
        <h1 className="text-3xl font-bold ">履歴</h1>
        {summaries.reverse().map((summary) => (
          <li key={summary.id}>
            <Link
              href={`/summary/${summary.id}`}
              className="text-blue-500 hover:underline"
            >
              <div>{summary.title}</div>
              <div>{String(summary.createdAt.toLocaleString("ja-JP"))}</div>
            </Link>
          </li>
        ))}
      </div>
    </main>
  );
}
