import { NextResponse } from 'next/server';
import { database } from '@/lib/firebase';
import { ref, get } from 'firebase/database';

export async function GET() {
  try {
    if (!database) {
      throw new Error('Firebase database is not initialized');
    }

    const adviceRef = ref(database, 'advice');
    const snapshot = await get(adviceRef);
    
    if (snapshot.exists()) {
      const adviceData = snapshot.val();
      const adviceArray = Object.entries(adviceData).map(([key, value]) => ({
        id: key,
        ...(value as object)
      }));
      return NextResponse.json(adviceArray);
    } else {
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error('Error fetching advice:', error);
    return NextResponse.json({ error: 'Failed to fetch advice' }, { status: 500 });
  }
}