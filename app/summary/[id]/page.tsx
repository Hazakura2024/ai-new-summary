// ルーティング用props

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

// Next.js 15から、params は非同期の Promise として受け取る
interface Props {
  params: Promise<{ id: string }>;
}

// dbから読み取り
export default async function SummaryPage({ params }: Props) {
  const { id } = await params;

  //
  const summary = await prisma.summary.findUnique({
    where: { id },
  });

  if (!summary) {
    notFound();
  }

  // 行ごとに分割
  const lines = summary.content
    .split("\n")
    .filter((line) => line.trim() !== "");

  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-6 pt-24 bg-[url('/bg-yokohama.jpg')] bg-cover bg-center bg-fixed">
        <div className="flex flex-col items-center   w-full max-w-md space-y-8 bg-white/60 p-8 rounded-xl shadow-lg backdrop-blur-sm">
          <div className="w-full max-w-md space-y-8">
            <h1 className="text-3xl font-bold ">記事の要約を生成</h1>
            <p>
              ネットニュースの記事のURLを入力すると、AIが3文で記事の要約を生成します。
            </p>
          </div>

          <Card className="border-2 border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">要約結果</CardTitle>
              <CardDescription>元の記事: {summary.title}</CardDescription>
              <div className="text-sm text-slate-500 mb-3 break-all">
                URL:{" "}
                <a
                  href={summary.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {summary.sourceUrl}
                </a>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                {lines.map((line, index) => (
                  <li key={index}>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Button asChild className="w-full">
            <Link href="/">新しい記事を要約する</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
