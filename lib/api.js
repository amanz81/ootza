import { db } from './firebase';
import { ref, update, increment } from 'firebase/database';

export const addLike = async (adviceId) => {
  const adviceRef = ref(db, `advices/${adviceId}`);
  await update(adviceRef, {
    likes: increment(1)
  });
};

export const removeLike = async (adviceId) => {
  const adviceRef = ref(db, `advices/${adviceId}`);
  await update(adviceRef, {
    likes: increment(-1)
  });
};