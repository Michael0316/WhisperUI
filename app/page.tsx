'use client'
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState("zh");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    if (!file) return alert("請上傳語音檔");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", language);

    setIsLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("轉換失敗");

      const text = await res.text();
      setResult(text);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "未知錯誤";
      setResult(`錯誤：${message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Whisper 語音轉文字工具</h1>
      <input type="file" accept="audio/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="zh">中文</option>
        <option value="en">English</option>
      </select>
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "轉換中..." : "開始轉換"}
      </button>
      <textarea rows={10} style={{ width: "100%", marginTop: 12 }} value={result} readOnly />
    </main>
  );
}
