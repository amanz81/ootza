import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';
import ShareAdviceModal from './ShareAdviceModal';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">
            <a>
              <span className={styles.logoIcon}>🦉</span> Ootza!
            </a>
          </Link>
        </div>
        <nav className={styles.nav}>
          <button className={styles.shareAdviceButton} onClick={() => setIsModalOpen(true)}>
            Share Advice
          </button>
        </nav>
      </header>
      <ShareAdviceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;