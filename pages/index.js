import { useState, useEffect } from 'react';
import AdviceCard from '../components/AdviceCard';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';
import { getAdvice, getTopAdvice } from '../lib/api';

export default function Home() {
  const [latestAdvice, setLatestAdvice] = useState([]);
  const [topAdvice, setTopAdvice] = useState([]);

  useEffect(() => {
    async function fetchAdvice() {
      const latest = await getAdvice(20);
      const top = await getTopAdvice(5);
      setLatestAdvice(latest);
      setTopAdvice(top);
    }
    fetchAdvice();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Ootza!</h1>
        
        {topAdvice.length > 0 && (
          <section className={styles.adviceSection}>
            <h2 className={styles.sectionTitle}>Top Advice</h2>
            <div className={styles.adviceGrid}>
              {topAdvice.map((advice) => (
                <AdviceCard key={advice.id} advice={advice} />
              ))}
            </div>
          </section>
        )}

        {latestAdvice.length > 0 && (
          <section className={styles.adviceSection}>
            <h2 className={styles.sectionTitle}>Latest Advice</h2>
            <div className={styles.adviceGrid}>
              {latestAdvice.map((advice) => (
                <AdviceCard key={advice.id} advice={advice} />
              ))}
            </div>
          </section>
        )}

        {latestAdvice.length === 0 && topAdvice.length === 0 && (
          <p className={styles.noAdvice}>No advice available at the moment. Be the first to share some wisdom!</p>
        )}
      </div>
    </>
  );
}