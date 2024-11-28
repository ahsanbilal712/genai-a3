import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    console.log('API route hit!');
    try {
        const { text } = await req.json();
        console.log('Received text:', text);

        const response = await fetch('http://localhost:8000/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            console.log('FastAPI response not ok:', response.status);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('FastAPI response:', data);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Translation error:', error);
        return NextResponse.json(
            { error: 'Translation failed' },
            { status: 500 }
        );
    }
} 