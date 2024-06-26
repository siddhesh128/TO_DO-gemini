import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);

export async function POST(req) {
  try {
    const { query } = await new Response(req.body).json();
    if (!query) {
      throw new Error("Query parameter is missing in the request body");
    }
    const customQuery = `this is my todo task give me some suggestions to complete it, suggest time management techniques,recommend resources or tools, prioritization tips, ${query}`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(customQuery);
    const response = await result.response;
    const text = response.text();
    return NextResponse.json(text);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
