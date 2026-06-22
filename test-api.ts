import 'dotenv/config'; // .envを読み込む
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import OpenAI from "openai";

const openai = new OpenAI();

async function runTest() {
  const url = "https://ja.wikipedia.org/wiki/Next.js"; // テスト用のURL（何でもOK）
  
  try {
    console.log(`[1/3] URLからHTMLを取得中...: ${url}`);
    const res = await fetch(url);
    const html = await res.text();

    console.log(`[2/3] JSDOMで本文を抽出中...`);
    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();
    
    if (!article) throw new Error("本文の抽出に失敗しました");
    console.log(`✅ タイトル取得成功: ${article.title}`);

    console.log(`[3/3] OpenAI APIで要約中...`);
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "3行の箇条書きで要約して" },
        { role: "user", content: `タイトル: ${article.title}\n本文: ${article.textContent.substring(0, 1000)}` }
      ]
    });

    console.log("\n🎉 【テスト成功】AIの回答:");
    console.log(completion.choices[0].message.content);

  } catch (error) {
    console.error("❌ エラー発生:", error);
  }
}

runTest();