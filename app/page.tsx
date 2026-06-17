import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <>
    {/* <header className="bg-blue-300 top-0 z-50 border-b   w-full">
      <a>
        <h1 className="text-xl font-bold">AI-news-summary</h1>
      </a>
    </header> */}
    <main className="flex min-h-screen flex-col items-center p-6  bg-[url('/bg-yokohama.jpg')] bg-cover bg-center bg-fixed">
      <div className="w-full max-w-md space-y-8 bg-white/60 p-8 rounded-xl shadow-lg backdrop-blur-sm">

        <div className="w-full max-w-md space-y-8">
          <h1 className="text-3xl font-bold ">タイトル</h1>
          <p>説明</p>
        </div>

        <form className="flex flex-col gap-4 ">
          <Input className="bg-background" placeholder="URLを入力..."/>
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
