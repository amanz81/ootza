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
      if (data) {
        const adviceList = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        setAdvice(adviceList);
      } else {
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
      }
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const latestAdvice = [...advice].sort((a, b) => b.createdAt - a.createdAt);
  const topAdvice = [...advice].sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 20);

  return (
    <div className={styles.container}>
      <Head>
        <title>Ootza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header onShareAdvice={handleShareAdvice} />

      <main className={styles.main}>
        <h1 className={styles.title}>
          <span className={styles.welcomeText}>Welcome to</span> <span className={styles.ootzaText}>Ootza!</span>
        </h1>

        {showShareAdvice && (
          <ShareAdvice 
            onAddAdvice={handleAddAdvice}
            onClose={handleCloseShareAdvice}
          />
        )}

        <div className={styles.statsSection}>
          <h2 className={styles.statsSectionTitle}>Ootza! Stats</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h3>Total Advice</h3>
              <p>{advice.length}</p>
            </div>
            <div className={styles.statCard}>
              <h3>Latest Advice</h3>
              <p>{latestAdvice.length}</p>
            </div>
            <div className={styles.statCard}>
              <h3>Top Advice</h3>
              <p>{topAdvice.length}</p>
            </div>
          </div>
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