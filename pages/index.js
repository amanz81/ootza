import { useState, useEffect } from 'react';
import Head from 'next/head';
import { ref, onValue } from 'firebase/database';
import { db } from '../lib/firebase';
import Navigation from '../components/Navigation';
import TopAdvice from '../components/TopAdvice';
import LatestAdvice from '../components/LatestAdvice';
import ShareAdviceButton from '../components/ShareAdviceButton';
import AdviceCard from '../components/AdviceCard';

export default function Home() {
  const [submittedAdvice, setSubmittedAdvice] = useState([]);

  useEffect(() => {
    const advicesRef = ref(db, 'advices');
    const unsubscribe = onValue(advicesRef, (snapshot) => {
      const advices = [];
      snapshot.forEach((childSnapshot) => {
        advices.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      setSubmittedAdvice(advices.reverse());
    });

    return () => unsubscribe();
  }, []);

  const handleAdviceSubmitted = (newAdvice) => {
    setSubmittedAdvice((prevAdvice) => [newAdvice, ...prevAdvice]);
  };

  const handleLike = (id, newLikeCount) => {
    setSubmittedAdvice((prevAdvice) =>
      prevAdvice.map((advice) =>
        advice.id === id ? { ...advice, likes: newLikeCount } : advice
      )
    );
  };

  return (
    <div className="container">
      <Head>
        <title>Ootza - Anonymous Advice Sharing</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navigation />

      <main>
        <h1>Welcome to Ootza</h1>
        <ShareAdviceButton onAdviceSubmitted={handleAdviceSubmitted} />
        
        {submittedAdvice.length > 0 && (
          <div className="submitted-advice">
            <h2>Advice</h2>
            {submittedAdvice.map((advice) => (
              <AdviceCard key={advice.id} advice={advice} onLike={handleLike} />
            ))}
          </div>
        )}

        <TopAdvice />
        <LatestAdvice />
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          align-items: center;
        }
        main {
          flex: 1;
          max-width: 800px;
          width: 100%;
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        h1, h2 {
          text-align: center;
          width: 100%;
        }
        .submitted-advice {
          width: 100%;
          margin-top: 2rem;
        }
        @media (max-width: 768px) {
          main {
            padding: 1rem 0.5rem;
          }
          h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}