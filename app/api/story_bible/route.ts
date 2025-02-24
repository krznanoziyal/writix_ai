//// filepath: /c:/Users/avira/Documents/Programming/hacksync/writix_ai/app/api/story_bible/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const res = await fetch("https://bursting-pika-equipped.ngrok-free.app/story_bible/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Story Bible API error:", errorText);
      return NextResponse.json({ error: `Story Bible API error: ${res.status}` }, { status: res.status });
    }

    const result = await res.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Proxy Story Bible API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}