import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles/Home.module.css';

const ShareAdvice = ({ onAddAdvice, onClose }) => {
  const [advice, setAdvice] = useState('');
  const [category, setCategory] = useState('General');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (advice.trim() && !isSubmitting) {
      setIsSubmitting(true);
      console.log('Submitting advice:', { content: advice, category: category });
      try {
        await onAddAdvice({
          content: advice,
          category: category,
        });
        console.log('Advice submitted successfully');
        // Reset form state
        setAdvice('');
        setCategory('General');
        // Close the form
        onClose();
      } catch (error) {
        console.error('Error submitting advice:', error);
        // You might want to show an error message to the user here
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [advice, category, onAddAdvice, onClose]);

  useEffect(() => {
    return () => {
      // This cleanup function will run when the component unmounts
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
            onChange={(e) => setAdvice(e.target.value)}
            placeholder="Enter your advice here..."
            className={styles.shareAdviceTextarea}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.categorySelect}
          >
            <option value="General">General</option>
            <option value="Career">Career</option>
            <option value="Relationships">Relationships</option>
            <option value="Health">Health</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
            <option value="Personal Growth">Personal Growth</option>
            <option value="Technology">Technology</option>
            <option value="Travel">Travel</option>
            <option value="Hobbies">Hobbies</option>
          </select>
          <div className={styles.shareAdviceButtons}>
            <button type="submit" className={styles.shareAdviceButton} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Advice'}
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