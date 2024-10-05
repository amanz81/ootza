import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

const ShareAdvice = ({ onSubmit, onClose }) => {
  const [advice, setAdvice] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');

  const predefinedCategories = ['Health', 'Relationships', 'Career', 'Finance', 'Personal Growth', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCategory = category === 'custom' ? customCategory : category;
    onSubmit({ advice, category: finalCategory });
    setAdvice('');
    setCategory('');
    setCustomCategory('');
  };

  return (
    <div className={styles.shareAdviceOverlay}>
      <div className={styles.shareAdvicePopup}>
        <h2 className={styles.shareAdviceTitle}>Share Your Advice</h2>
        <form onSubmit={handleSubmit} className={styles.shareAdviceForm}>
          <textarea
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
            placeholder="Enter your advice here..."
            className={styles.shareAdviceTextarea}
            required
          />
          <div className={styles.categorySelection}>
            <label htmlFor="category" className={styles.categoryLabel}>Choose a category:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={styles.categorySelect}
              required
            >
              <option value="">Select a category</option>
              {predefinedCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
              <option value="custom">Create custom category</option>
            </select>
          </div>
          {category === 'custom' && (
            <input
              type="text"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="Enter custom category"
              className={styles.customCategoryInput}
              required
            />
          )}
          <div className={styles.shareAdviceButtons}>
            <button type="submit" className={styles.shareAdviceButton}>
              Share Advice
            </button>
            <button type="button" onClick={onClose} className={styles.shareAdviceCloseButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShareAdvice;