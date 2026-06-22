'use client';

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSummaryStore } from "@/store/useSummaryStore";
import { AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation"; // 🌟 画面遷移用のルーターをインポート

export default function Home() {
  const router = useRouter(); // 🌟 ルーターを初期化

  const {
    sourceUrl,
    setSourceUrl,
    isLoading,
    error,
    generateSummary,
    reset,
  } = useSummaryStore();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // 🌟 もしURLが「ない」なら何もしない（以前のコードは sourceUrl だけで判定していました）
    if (!sourceUrl) return;

    const formData = new FormData(event.currentTarget);
    
    // 🌟 generateSummary を実行し、成功したら id を受け取る
    const generatedId = await generateSummary(formData);

    // id が無事に返ってきたら、個別ページへリダイレクト！
    if (generatedId) {
      setSourceUrl(""); // 念のため入力欄をクリア
      router.push(`/summary/${generatedId}`);
    }
  }

  return (
    <>
    <main className="flex min-h-screen flex-col items-center p-6 pt-24 bg-[url('/bg-yokohama.jpg')] bg-cover bg-center bg-fixed">
      <div className="w-full max-w-md space-y-8 bg-white/60 p-8 rounded-xl shadow-lg backdrop-blur-sm">

        <div className="w-full max-w-md space-y-8">
          <h1 className="text-3xl font-bold ">記事の要約を生成</h1>
          <p>ネットニュースの記事のURLを入力すると、AIが3文で記事の要約を生成します。</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* 🌟 フォームのデータを正確に飛ばすために name, value, onChange を追加！ */}
          <Input 
            className="bg-white" 
            placeholder="URLを入力..."
            name="url"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            disabled={isLoading}
            required
          />
          <Button className="font-bold" type="submit" disabled={isLoading || !sourceUrl}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                AIが記事を読み込み中...
              </>
            ) : (
              "要約を生成する"
            )}
          </Button>
        </form>

        {/* エラー表示エリア */}
        {error && (
          <div className="flex items-center gap-2 p-4 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

      </div>
    </main>
    </>
  );
}