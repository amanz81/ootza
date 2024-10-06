import React, { useState, useEffect } from 'react';
import AdviceCard from '../components/AdviceCard';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import ShareAdvice from '../components/ShareAdvice';
import { db } from '../lib/firebase';
import { ref, push, set, onValue, update } from 'firebase/database';

export default function Home() {
  const [advice, setAdvice] = useState([]);
  const [showShareAdvice, setShowShareAdvice] = useState(false);

  useEffect(() => {
    const adviceRef = ref(db, 'advice');

    const unsubscribe = onValue(adviceRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Received data from Firebase:', data);
      if (data) {
        const adviceList = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        console.log('Processed advice list:', adviceList);
        setAdvice(adviceList);
      } else {
        console.log('No data received from Firebase');
        setAdvice([]);
      }
    }, (error) => {
      console.error("Error fetching advice:", error);
    });

    return () => unsubscribe();
  }, []);

  const handleShareAdvice = () => {
    setShowShareAdvice(true);
  };

  const handleCloseShareAdvice = () => {
    setShowShareAdvice(false);
  };

  const handleAddAdvice = async (newAdvice) => {
    try {
      const adviceRef = ref(db, 'advice');
      const newAdviceRef = push(adviceRef);
      const adviceWithMetadata = {
        ...newAdvice,
        text: newAdvice.content,
        createdAt: Date.now(),
        likes: 0
      };
      await set(newAdviceRef, adviceWithMetadata);
      console.log('New advice added:', adviceWithMetadata);
      handleCloseShareAdvice();
    } catch (error) {
      console.error('Error adding advice:', error);
    }
  };

  const handleLike = async (adviceId) => {
    try {
      const adviceRef = ref(db, `advice/${adviceId}`);
      const currentAdvice = advice.find(a => a.id === adviceId);
      if (currentAdvice) {
        await update(adviceRef, {
          likes: (currentAdvice.likes || 0) + 1
        });
        console.log(`Advice ${adviceId} liked`);
      }
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const latestAdvice = [...advice].sort((a, b) => b.createdAt - a.createdAt);
  const topAdvice = [...advice].sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 5);

  console.log('Rendering with advice:', advice);
  console.log('Latest advice:', latestAdvice);
  console.log('Top advice:', topAdvice);

  return (
    <div className={styles.container}>
      <Head>
        <title>Ootza! - Share and Discover Advice</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header onShareAdvice={handleShareAdvice} />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Ootza!
        </h1>

        {showShareAdvice && (
          <ShareAdvice 
            onAddAdvice={handleAddAdvice}
            onClose={handleCloseShareAdvice}
          />
        )}

        <div>
          <h2>Debug Info:</h2>
          <p>Total advice count: {advice.length}</p>
          <p>Latest advice count: {latestAdvice.length}</p>
          <p>Top advice count: {topAdvice.length}</p>
        </div>

        {topAdvice.length > 0 && (
          <section id="top-advice" className={styles.adviceSection}>
            <h2 className={styles.sectionTitle}>Top Advice</h2>
            <div className={styles.adviceGrid}>
              {topAdvice.map((advice) => (
                <AdviceCard key={advice.id} advice={advice} onLike={handleLike} />
              ))}
            </div>
          </section>
        )}

        {latestAdvice.length > 0 && (
          <section id="latest-advice" className={styles.adviceSection}>
            <h2 className={styles.sectionTitle}>Latest Advice</h2>
            <div className={styles.adviceGrid}>
              {latestAdvice.map((advice) => (
                <AdviceCard key={advice.id} advice={advice} onLike={handleLike} />
              ))}
            </div>
          </section>
        )}

        {advice.length === 0 && (
          <p className={styles.noAdvice}>No advice available at the moment. Be the first to share some wisdom!</p>
        )}
      </main>

      <footer className={styles.footer}>
        {/* ... your footer content ... */}
      </footer>
    </div>
  );
}