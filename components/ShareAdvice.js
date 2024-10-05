import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Home.module.css';

const ShareAdvice = ({ advice, onShare }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <>
      <button className={styles.shareAdviceButton} onClick={onShare}>
        <span>Share Advice</span>
      </button>
      <div className={styles.adviceCard}>
        <p>{advice.text}</p>
        <div className={styles.adviceFooter}>
          <button
            className={`${styles.likeButton} ${liked ? styles.liked : ''}`}
            onClick={handleLike}
          >
            <FontAwesomeIcon icon={faHeart} className={styles.heartIcon} />
            <span>{advice.likes}</span>
          </button>
          <span className={styles.categoryTag} data-category={advice.category}>
            {advice.category}
          </span>
        </div>
      </div>
    </>
  );
};

export default ShareAdvice;