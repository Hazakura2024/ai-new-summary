"use server";

import * as cheerio from "cheerio";
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
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(
        "ページの取得に失敗しました。URLが正しいか確認してください。",
      );
    }

    // ReadableStreamになってるのでテキストに
    const html = await response.text();

    // jQueryの慣習で$に
    const $ = cheerio.load(html);

    const articleTitle = $("title").text() || "無題の記事";

    $("script, style, noscript, iframe, nav, footer, header, aside").remove();

    const rawText = $("body").text().replace(/\s+/g, " ").trim();

    if (!rawText) {
      throw new Error("記事の本文を解析できませんでした");
    }

    const articleText = rawText.substring(0, 4000); // 安全のため上限指定

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "あなたは優秀な編集者です。与えられたWeb記事の本文を、重要度が高い順に必ず3行の箇条書き（改行区切り）で要約してください。余計な挨拶や解説、箇条書きの記号（・や-*など）は一切含めず、純粋なテキストの3行のデータだけを返してください.1つの文が終わるごとに、必ず改行（\\n）を入れること。",
        },
        {
          role: "user",
          content: `タイトル: ${articleTitle}\n\n本文\n${articleText}`,
        },
      ],
      temperature: 0.3,
    });

    const summaryContent = completion.choices[0].message.content;
    if (!summaryContent) {
      throw new Error("AIによる要約の生成に失敗しました🤣");
    }

    const savedSummary = await prisma.summary.create({
      data: {
        sourceUrl: url,
        title: articleTitle,
        content: summaryContent?.trim(),
      },
    });

    // 後で一覧などを作る場合のため、キャッシュをクリア
    revalidatePath("/");

    return { success: true, id: savedSummary.id };
  } catch (error: any) {
    console.error("要約生成エラー:", error);
    return {
      success: false,
      error: error.message || "予期せぬエラーが発生しました",
    };
  }
}
