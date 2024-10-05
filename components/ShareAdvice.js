import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

const ShareAdvice = ({ onSubmit }) => {
  const [advice, setAdvice] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ advice, category });
    setAdvice('');
    setCategory('');
  };

  return (
    <div className={styles.shareAdviceContainer}>
      <h2 className={styles.shareAdviceTitle}>Share Your Advice</h2>
      <form onSubmit={handleSubmit} className={styles.shareAdviceForm}>
        <textarea
          value={advice}
          onChange={(e) => setAdvice(e.target.value)}
          placeholder="Enter your advice here..."
          className={styles.shareAdviceTextarea}
          required
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (e.g., Health, Relationships)"
          className={styles.shareAdviceInput}
          required
        />
        <button type="submit" className={styles.shareAdviceButton}>
          Share Advice
        </button>
      </form>
    </div>
  );
};

export default ShareAdvice;