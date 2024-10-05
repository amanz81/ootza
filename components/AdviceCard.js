import { useState } from 'react';
import { ref, update } from 'firebase/database';
import { db } from '../lib/firebase';

export default function AdviceCard({ advice, onLike }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(advice.likes);

  const handleLike = async () => {
    const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
    const adviceRef = ref(db, `advices/${advice.id}`);

    try {
      await update(adviceRef, { likes: newLikeCount });
      setLikeCount(newLikeCount);
      setIsLiked(!isLiked);
      onLike(advice.id, newLikeCount);
    } catch (error) {
      console.error('Error updating like count:', error);
    }
  };

  return (
    <div className="advice-card">
      <p className="advice-text">{advice.text}</p>
      <p className="advice-category">Category: {advice.category}</p>
      <button
        className={`like-button ${isLiked ? 'liked' : ''}`}
        onClick={handleLike}
      >
        {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
      </button>

      <style jsx>{`
        .advice-card {
          background-color: #f0f0f0;
          border-radius: 5px;
          padding: 1rem;
          margin-bottom: 1rem;
        }
        .advice-text {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }
        .advice-category {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 0.5rem;
        }
        .like-button {
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 0.5rem 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }
        .like-button.liked {
          background-color: #4CAF50;
          color: white;
        }
        .like-button:hover {
          background-color: #e0e0e0;
        }
        .like-button.liked:hover {
          background-color: #45a049;
        }
        @media (max-width: 768px) {
          .advice-card {
            padding: 0.75rem;
          }
          .advice-text {
            font-size: 0.9rem;
          }
          .advice-category {
            font-size: 0.8rem;
          }
          .like-button {
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}