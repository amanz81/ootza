import { useState } from 'react';
import styles from '../styles/LikeButton.module.css';
import { likeAdvice } from '../lib/api';

const LikeButton = ({ adviceId, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    if (!isLiked) {
      const updatedLikes = await likeAdvice(adviceId);
      setLikes(updatedLikes);
      setIsLiked(true);
    }
  };

  return (
    <button 
      className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`} 
      onClick={handleLike}
    >
      <span className={styles.likeIcon}>❤</span>
      <span className={styles.likeCount}>{likes}</span>
    </button>
  );
};

export default LikeButton;