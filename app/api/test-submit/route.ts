import { NextResponse } from 'next/server';
import { database } from '@/lib/firebase';
import { ref, push, set } from 'firebase/database';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Test submit received:', body);

    const testAdvice = {
      category: 'test',
      text: 'This is a test advice',
      likes: 0,
      date: new Date().toISOString()
    };

    const newAdviceRef = push(ref(database, 'advice'));
    await set(newAdviceRef, testAdvice);

    return NextResponse.json({ success: true, message: 'Test advice saved successfully' });
  } catch (error) {
    console.error('Error in test-submit:', error);
    return NextResponse.json({ success: false, message: 'Error in test submit' }, { status: 500 });
  }
}