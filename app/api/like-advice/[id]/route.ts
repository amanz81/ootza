import { NextResponse } from 'next/server';
import { database } from '@/lib/firebase';
import { ref, runTransaction } from 'firebase/database';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ success: false, message: 'Invalid advice ID' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const unlike = body.unlike || false;

    const adviceRef = ref(database, `advice/${id}`);
    
    const result = await runTransaction(adviceRef, (currentAdvice) => {
      if (currentAdvice === null) {
        return null; // Abort the transaction
      }
      
      return {
        ...currentAdvice,
        likes: Math.max((currentAdvice.likes || 0) + (unlike ? -1 : 1), 0),
      };
    });

    if (result.committed) {
      const updatedAdvice = result.snapshot.val();
      return NextResponse.json({ 
        success: true, 
        message: unlike ? 'Advice unliked successfully' : 'Advice liked successfully', 
        likes: updatedAdvice.likes 
      });
    } else {
      return NextResponse.json({ success: false, message: 'Advice not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating like:', error);
    return NextResponse.json({ success: false, message: 'Error updating like' }, { status: 500 });
  }
}