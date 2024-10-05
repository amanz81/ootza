import React, { useState } from 'react';
import styles from '../styles/LikeButton.module.css';
import { addLike, removeLike } from '../lib/api';

const LikeButton = ({ adviceId, likes, onLike }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = async () => {
    try {
      if (hasLiked) {
        await removeLike(adviceId);
        setLikeCount(prevCount => prevCount - 1);
      } else {
        await addLike(adviceId);
        setLikeCount(prevCount => prevCount + 1);
      }
      setHasLiked(!hasLiked);
      if (onLike) onLike(adviceId, likeCount + (hasLiked ? -1 : 1));
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  return (
    <button 
      className={`${styles.likeButton} ${hasLiked ? styles.liked : ''}`} 
      onClick={handleLike}
    >
      <span className={styles.icon}>❤</span>
      <span className={styles.count}>{likeCount}</span>
    </button>
  );
};

export default LikeButton;