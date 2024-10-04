import { NextResponse } from 'next/server';
import { database } from '@/lib/firebase';
import { ref, get } from 'firebase/database';

export async function GET() {
  try {
    console.log('Attempting to fetch advice from database');
    const adviceRef = ref(database, 'advice');
    const snapshot = await get(adviceRef);
    
    if (snapshot.exists()) {
      const adviceData = snapshot.val();
      const adviceArray = Object.entries(adviceData).map(([key, value]) => ({
        id: key,
        ...(value as object)
      }));
      console.log('Advice fetched successfully:', adviceArray);
      return NextResponse.json(adviceArray);
    } else {
      console.log('No advice found in database');
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error('Error fetching advice:', error);
    return NextResponse.json({ error: 'Failed to fetch advice' }, { status: 500 });
  }
}