import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useAdvice() {
  const [topAdvice, setTopAdvice] = useState([]);
  const [latestAdvice, setLatestAdvice] = useState([]);

  useEffect(() => {
    const topQuery = query(collection(db, 'advice'), orderBy('likes', 'desc'), limit(10));
    const latestQuery = query(collection(db, 'advice'), orderBy('date', 'desc'), limit(20));

    const unsubscribeTop = onSnapshot(topQuery, (snapshot) => {
      setTopAdvice(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubscribeLatest = onSnapshot(latestQuery, (snapshot) => {
      setLatestAdvice(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeTop();
      unsubscribeLatest();
    };
  }, []);

  return { topAdvice, latestAdvice };
}