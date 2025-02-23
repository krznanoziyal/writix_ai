import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const res = await fetch('https://bursting-pika-equipped.ngrok-free.app/brainstorming', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Flask API error:', errorText);
      return NextResponse.json(
        { error: `Flask API responded with status ${res.status}` },
        { status: res.status }
      );
    }

    const result = await res.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Proxy API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}