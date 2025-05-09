import { OpenAI } from "openai";

export const runtime = "edge";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const language = formData.get("language")?.toString() || "zh";

  if (!file) return new Response("未收到檔案", { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

  const transcription = await openai.audio.transcriptions.create({
    file: new File([buffer], file.name),
    model: "whisper-1",
    language,
    response_format: "text",
  });

  return new Response(transcription);
}
