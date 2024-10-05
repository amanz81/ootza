import { useState } from 'react';
import styles from '../styles/ShareAdviceModal.module.css';
import { addAdvice } from '../lib/api';
import { categories } from '../lib/categories';

const ShareAdviceModal = ({ isOpen, onClose }) => {
  const [advice, setAdvice] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (advice && category) {
      await addAdvice(advice, category);
      setAdvice('');
      setCategory('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Share Your Advice</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
            placeholder="Enter your advice here"
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <div className={styles.buttonGroup}>
            <button type="submit">Share</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShareAdviceModal;