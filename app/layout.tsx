export const metadata = {
  title: "Whisper 語音轉文字工具",
  description: "使用 OpenAI Whisper API 將語音轉換成文字",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
