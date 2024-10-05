import { useState, useEffect } from 'react';
import { ref, onValue, query, orderByChild, limitToLast } from 'firebase/database';
import { db } from '../lib/firebase';

export default function TopAdvice() {
  const [topAdvice, setTopAdvice] = useState([]);

  useEffect(() => {
    const advicesRef = ref(db, 'advices');
    const topAdvicesQuery = query(advicesRef, orderByChild('likes'), limitToLast(5));

    const unsubscribe = onValue(topAdvicesQuery, (snapshot) => {
      const advices = [];
      snapshot.forEach((childSnapshot) => {
        advices.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      setTopAdvice(advices.reverse());
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Top Advice</h2>
      {topAdvice.map((advice) => (
        <div key={advice.id}>
          <p>{advice.text}</p>
          <p>Likes: {advice.likes}</p>
        </div>
      ))}
    </div>
  );
}