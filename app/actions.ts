"use server";

import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import OpenAI from "openai";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const openai = new OpenAI();

export async function createSummary(formData: FormData) {
    const url = formData.get("url") as string;
    if (!url) {
        throw new Error("URLが入力されていません");
    }

    
    try {
        
        const response = await fetch(url, {
            headers: {
                // ブラウザでアクセスしてますと名乗る
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            },
        });

        if (!response.ok) {
            throw new Error("ページの取得に失敗しました。URLが正しいか確認してください。");
        }

        // ReadableStreamになってるのでテキストに
        const html = await response.text()

        // 生のhtml文字列を仮想的なDOMに
        const dom = new JSDOM(html, {url})
        // mozillaが提供してるやつでreader.parce()で記事のタイトル、本文のテキストを抽出できる
        const reader = new Readability(dom.window.document);
        const article = reader.parse();

        if (!article || !article.textContent) {
            throw new Error("記事の本文を解析できませんでした");
        }

        const articleTitle = article.title || "無題の記事";
        const articleText = article.textContent.trim().substring(0,4000);// 安全のため上限指定

        
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "あなたは優秀な編集者です。与えられたWeb記事の本文を、重要度が高い順に必ず3行の箇条書き（改行区切り）で要約してください。余計な挨拶や解説、箇条書きの記号（・や-*など）は一切含めず、純粋なテキストの3行のデータだけを返してください。"
                },
                {
                    role: "user",
                    content: `タイトル: ${articleTitle}\n\n本文\n${articleText}`,
                }
            ],
            temperature: 0.3,
        });

        const summaryContent = completion.choices[0].message.content;
        if (!summaryContent) {
            throw new Error("AIによる要約の生成に失敗しました🤣")
        }


        const savedSummary = await prisma.summary.create({
            data: {
                sourceUrl: url,
                title: articleTitle,
                content: summaryContent?.trim(),
            },
        });

        // 後で一覧などを作る場合のため、キャッシュをクリア
        revalidatePath("/")

        return { success: true, id: savedSummary.id };


    } catch (error: any) {
        console.error("要約生成エラー:", error);
        return {success: false, error: error.message || "予期せぬエラーが発生しました"};
    }

}
