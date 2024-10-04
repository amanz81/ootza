import { NextResponse } from 'next/server';
import { database } from '@/lib/firebase';
import { ref, push, set } from 'firebase/database';

export async function POST(request: Request) {
  try {
    if (!database) {
      throw new Error('Firebase database is not initialized');
    }

    const body = await request.json();
    console.log('New advice received:', body);

    if (!body.category || !body.advice) {
      throw new Error('Missing category or advice');
    }

    const newAdviceRef = push(ref(database, 'advice'));
    const newAdvice = {
      id: newAdviceRef.key,
      category: body.category,
      text: body.advice,
      likes: 0,
      date: new Date().toISOString()
    };

    console.log('Attempting to save new advice:', newAdvice);
    await set(newAdviceRef, newAdvice);
    console.log('New advice saved successfully');

    return NextResponse.json({ success: true, message: 'Advice saved successfully', advice: newAdvice });
  } catch (error) {
    console.error('Error saving advice:', error);
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : 'Error saving advice' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(adviceDatabase);
}