import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Header = ({ onShareAdvice }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/">
          <a className={styles.logo}>
            <span className={styles.logoIcon}>🦉</span>
            <span className={styles.logoText}>Ootza!</span>
          </a>
        </Link>
        <nav className={styles.nav}>
          <Link href="/#top-advice">
            <a className={styles.navLink}>Top Advice</a>
          </Link>
          <Link href="/#latest-advice">
            <a className={styles.navLink}>Latest Advice</a>
          </Link>
          <button onClick={onShareAdvice} className={styles.shareAdviceButtonHeader}>
            Share Advice
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;