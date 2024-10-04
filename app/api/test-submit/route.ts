import { NextResponse } from 'next/server';
import { database } from '@/lib/firebase';
import { ref, push, set } from 'firebase/database';

export async function POST() {
  try {
    if (!database) {
      throw new Error('Firebase database is not initialized');
    }

    const testAdvice = {
      id: 'test-advice',
      category: 'Test',
      text: 'This is a test advice',
      likes: 0,
      date: new Date().toISOString()
    };

    const newAdviceRef = push(ref(database, 'advice'));
    await set(newAdviceRef, testAdvice);

    return NextResponse.json({ success: true, message: 'Test advice saved successfully' });
  } catch (error) {
    console.error('Error saving test advice:', error);
    return NextResponse.json({ success: false, message: 'Error saving test advice' }, { status: 500 });
  }
}