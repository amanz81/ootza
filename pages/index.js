import { useState, useEffect } from 'react';
import AdviceCard from '../components/AdviceCard';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';
import { getAdvice, getTopAdvice, getAllAdvice } from '../lib/api';
import Head from 'next/head';
import ShareAdvice from '../components/ShareAdvice';
import Link from 'next/link'; // Import Link from Next.js

export default function Home() {
  const [latestAdvice, setLatestAdvice] = useState([]);
  const [topAdvice, setTopAdvice] = useState([]);
  const [allAdvice, setAllAdvice] = useState([]);
  const [showShareAdvice, setShowShareAdvice] = useState(false);

  useEffect(() => {
    async function fetchAdvice() {
      const latest = await getAdvice(20);
      const top = await getTopAdvice(5);
      const all = await getAllAdvice();
      setLatestAdvice(latest);
      setTopAdvice(top);
      setAllAdvice(all);
    }
    fetchAdvice();
  }, []);

  const handleShareAdvice = () => {
    setShowShareAdvice(true);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Ootza! - Share and Discover Advice</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/">
            <a className={styles.logo}>Ootza!</a>
          </Link>
          <nav className={styles.nav}>
            <Link href="/#all-advice">
              <a className={styles.navLink}>All Advices</a>
            </Link>
            <Link href="/#top-advice">
              <a className={styles.navLink}>Top Advice</a>
            </Link>
            <button className={styles.shareAdviceButtonHeader} onClick={handleShareAdvice}>
              Share Advice
            </button>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Ootza!
        </h1>

        {showShareAdvice && (
          <ShareAdvice onSubmit={(newAdvice) => {
            // Handle the new advice submission here
            setShowShareAdvice(false);
            // You might want to update the allAdvice state or refetch advice here
          }} />
        )}

        {topAdvice.length > 0 && (
          <section id="top-advice" className={styles.adviceSection}>
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

        {allAdvice.length > 0 && (
          <section id="all-advice" className={styles.adviceSection}>
            <h2 className={styles.sectionTitle}>All Advices</h2>
            <div className={styles.adviceGrid}>
              {allAdvice.map((advice) => (
                <AdviceCard key={advice.id} advice={advice} />
              ))}
            </div>
          </section>
        )}

        {latestAdvice.length === 0 && topAdvice.length === 0 && allAdvice.length === 0 && (
          <p className={styles.noAdvice}>No advice available at the moment. Be the first to share some wisdom!</p>
        )}
      </main>

      <footer className={styles.footer}>
        {/* ... your footer content ... */}
      </footer>
    </div>
  );
}