import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <>
    <header className="fixed top-0 z-50 w-full border-b border-slate-200/50 bg-white/60 shadow-lg backdrop-blur-sm p-2">
      <a>
        <h1 className="text-xl font-bold">AI-news-summary</h1>
      </a>
    </header>
    <main className="flex min-h-screen flex-col items-center p-6 pt-24 bg-[url('/bg-yokohama.jpg')] bg-cover bg-center bg-fixed">
      <div className="w-full max-w-md space-y-8 bg-white/60 p-8 rounded-xl shadow-lg backdrop-blur-sm">

        <div className="w-full max-w-md space-y-8">
          <h1 className="text-3xl font-bold ">記事の要約を生成</h1>
          <p>ネットニュースの記事のURLを入力すると、AIが3文で記事の要約を生成します。</p>
        </div>

        <form className="flex flex-col gap-4">
          <Input className="bg-white" placeholder="URLを入力..."/>
          <Button className="font-bold">要約を生成</Button>
        </form>

        <Card className="mt-8 border-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">要約結果</CardTitle>
            <CardDescription>タイトル</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>1行</li>
              <li>2行</li>
              <li>3行</li>
            </ul>
          </CardContent>
        </Card>

      </div>
    </main>
    </>
  );
}
