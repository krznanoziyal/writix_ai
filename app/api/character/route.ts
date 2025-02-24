//// filepath: writix_ai/app/api/character/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const res = await fetch("https://bursting-pika-equipped.ngrok-free.app/character/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Character API error:", errorText);
      return NextResponse.json({ error: `Character API error: ${res.status}` }, { status: res.status });
    }

    const result = await res.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Proxy Character API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}