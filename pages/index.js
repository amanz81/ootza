import React, { useState, useEffect } from 'react';
import AdviceCard from '../components/AdviceCard';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import ShareAdvice from '../components/ShareAdvice';
import { db, auth } from '../lib/firebase';
import { ref, push, set, onValue } from 'firebase/database';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Home() {
  const [advice, setAdvice] = useState([]);
  const [showShareAdvice, setShowShareAdvice] = useState(false);

  useEffect(() => {
    if (!db) {
      console.error('Realtime Database instance not available');
      return;
    }

    const adviceRef = ref(db, 'advice');

    // Fetch all advice and listen for changes
    const unsubscribe = onValue(adviceRef, (snapshot) => {
      const data = snapshot.val();
      const adviceList = data ? Object.entries(data).map(([key, value]) => ({id: key, ...value})) : [];
      setAdvice(prevAdvice => {
        // Merge new data with existing data, prioritizing new data
        const mergedAdvice = [...adviceList, ...prevAdvice];
        // Remove duplicates based on id
        return Array.from(new Map(mergedAdvice.map(item => [item.id, item])).values());
      });
    });

    // Cleanup function to unsubscribe from the listener
    return () => unsubscribe();
  }, []);

  const handleShareAdvice = () => {
    setShowShareAdvice(true);
  };

  const handleCloseShareAdvice = () => {
    setShowShareAdvice(false);
  };

  const handleAddAdvice = async (newAdvice) => {
    if (!db) {
      console.error('Realtime Database instance not available');
      return;
    }
    try {
      const adviceRef = ref(db, 'advice');
      const newAdviceRef = push(adviceRef);
      const newAdviceId = newAdviceRef.key;
      const adviceWithMetadata = {
        ...newAdvice,
        id: newAdviceId,
        createdAt: Date.now(),
        likes: 0
      };
      await set(newAdviceRef, adviceWithMetadata);
      
      // Update local state
      setAdvice(prevAdvice => [adviceWithMetadata, ...prevAdvice]);
      
      // Close the form after successful submission
      handleCloseShareAdvice();
    } catch (error) {
      console.error('Error adding advice:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleLike = (adviceId) => {
    // This function is now just for logging purposes
    console.log(`Advice ${adviceId} liked`);
  };

  const latestAdvice = [...advice].sort((a, b) => b.createdAt - a.createdAt).slice(0, 20);
  const topAdvice = [...advice].sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 5);

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