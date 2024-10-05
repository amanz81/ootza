import { useState } from 'react';
import styles from '../styles/AdviceCard.module.css';
import LikeButton from './LikeButton';

const AdviceCard = ({ advice }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`${styles.card} ${isHovered ? styles.hovered : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className={styles.advice}>{advice.content}</p>
      <div className={styles.meta}>
        <span className={styles.category}>{advice.category}</span>
        <span className={styles.date}>{new Date(advice.createdAt).toLocaleDateString()}</span>
        <LikeButton adviceId={advice.id} initialLikes={advice.likes} />
      </div>
    </div>
  );
};

export default AdviceCard;