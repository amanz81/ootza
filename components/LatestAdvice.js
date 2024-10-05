import { useState, useEffect } from 'react';
import { ref, onValue, query, orderByChild, limitToLast } from 'firebase/database';
import { db } from '../lib/firebase';

export default function LatestAdvice() {
  const [latestAdvice, setLatestAdvice] = useState([]);

  useEffect(() => {
    const advicesRef = ref(db, 'advices');
    const latestAdvicesQuery = query(advicesRef, orderByChild('date'), limitToLast(20));

    const unsubscribe = onValue(latestAdvicesQuery, (snapshot) => {
      const advices = [];
      snapshot.forEach((childSnapshot) => {
        advices.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      setLatestAdvice(advices.reverse());
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Latest Advice</h2>
      {latestAdvice.map((advice) => (
        <div key={advice.id}>
          <p>{advice.text}</p>
          <p>Category: {advice.category}</p>
        </div>
      ))}
    </div>
  );
}