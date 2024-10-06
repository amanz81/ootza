import React, { useState, useEffect, useCallback } from 'react';
import { categories } from '../lib/categories';
import styles from '../styles/Home.module.css';

const ShareAdvice = ({ onAddAdvice, onClose }) => {
  const [advice, setAdvice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (advice.trim() && !isSubmitting && advice.length <= 200) {  // Updated to 200
      setIsSubmitting(true);
      try {
        await onAddAdvice({
          content: advice,
          category: selectedCategory === 'Custom' ? customCategory : selectedCategory,
        });
        setAdvice('');
        setSelectedCategory('');
        setCustomCategory('');
        onClose();
      } catch (error) {
        // You might want to show an error message to the user here
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [advice, selectedCategory, customCategory, onAddAdvice, onClose]);

  useEffect(() => {
    return () => {
      setIsSubmitting(false);
    };
  }, []);

  return (
    <div className={styles.shareAdviceOverlay}>
      <div className={styles.shareAdvicePopup}>
        <h2 className={styles.shareAdviceTitle}>Share Your Advice</h2>
        <form onSubmit={handleSubmit} className={styles.shareAdviceForm}>
          <textarea
            value={advice}
            onChange={(e) => setAdvice(e.target.value.slice(0, 200))}  // Updated to 200
            placeholder="Enter your advice here (max 200 characters)..."  // Updated placeholder
            className={styles.shareAdviceTextarea}
            maxLength={200}  // Updated to 200
          />
          <div className={styles.characterCount}>
            {advice.length}/200 characters  // Updated to 200
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.categorySelect}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {selectedCategory === 'Custom' && (
            <input
              type="text"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="Enter custom category"
              required
              className={styles.customCategoryInput}
            />
          )}
          <div className={styles.shareAdviceButtons}>
            <button 
              type="submit" 
              className={`${styles.shareAdviceButton} ${styles.modernButton} ${styles.primaryButton}`}
              disabled={isSubmitting || advice.length === 0 || advice.length > 200}  // Updated to 200
            >
              {isSubmitting ? 'Sharing...' : 'Share Advice'}
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className={`${styles.shareAdviceButton} ${styles.modernButton} ${styles.secondaryButton}`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShareAdvice;