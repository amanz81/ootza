import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import { db } from '../lib/firebase';
import { ref, runTransaction } from 'firebase/database';

const AdviceCard = ({ advice, onLike }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    if (!advice || !advice.id) {
      console.error('Cannot like advice: Invalid advice object', advice);
      return;
    }

    const adviceRef = ref(db, `advice/${advice.id}`);
    try {
      await runTransaction(adviceRef, (currentAdvice) => {
        if (currentAdvice) {
          currentAdvice.likes = (currentAdvice.likes || 0) + 1;
        }
        return currentAdvice;
      });
      onLike(advice.id);
      setIsLiked(true);
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  if (!advice) {
    console.error('Invalid advice object: advice is undefined or null');
    return null;
  }

  const adviceContent = advice.content || advice.text; // Use 'text' if 'content' is not available

  if (!adviceContent) {
    console.error('Invalid advice object: missing content or text', advice);
    return null;
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.cardCategory}>{advice.category || 'Uncategorized'}</h3>
      <p>{adviceContent}</p>
      <div className={styles.cardFooter}>
        <span className={styles.likeCount}>{advice.likes || 0}</span>
        <button 
          onClick={handleLike} 
          className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
          disabled={isLiked}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.likeIcon}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AdviceCard;