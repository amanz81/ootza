import { db } from './firebase';
import { ref, push, serverTimestamp, get, query, orderByChild, limitToLast, update, increment } from 'firebase/database';

export const getAdvice = async (count = 5) => {
  const adviceRef = ref(db, 'advices');
  const adviceQuery = query(adviceRef, orderByChild('createdAt'), limitToLast(count * 2));
  const snapshot = await get(adviceQuery);
  const advices = [];
  snapshot.forEach((childSnapshot) => {
    const advice = { id: childSnapshot.key, ...childSnapshot.val() };
    if (advice.content && advice.content.trim() !== '') {
      advices.unshift(advice);
    }
  });
  return advices.slice(0, count);
};

export const getTopAdvice = async (count = 5) => {
  const adviceRef = ref(db, 'advices');
  const adviceQuery = query(adviceRef, orderByChild('likes'), limitToLast(count * 2));
  const snapshot = await get(adviceQuery);
  const advices = [];
  snapshot.forEach((childSnapshot) => {
    const advice = { id: childSnapshot.key, ...childSnapshot.val() };
    if (advice.content && advice.content.trim() !== '') {
      advices.unshift(advice);
    }
  });
  return advices.sort((a, b) => b.likes - a.likes).slice(0, count);
};

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

export const likeAdvice = async (adviceId) => {
  await addLike(adviceId);
  const adviceRef = ref(db, `advices/${adviceId}`);
  const snapshot = await get(adviceRef);
  return snapshot.val().likes;
};

export const addAdvice = async (content, category) => {
  const adviceRef = ref(db, 'advices');
  const newAdvice = {
    content,
    category,
    createdAt: serverTimestamp(),
    likes: 0
  };
  await push(adviceRef, newAdvice);
};

export const getAllAdvice = async () => {
  const adviceRef = ref(db, 'advices');
  const snapshot = await get(adviceRef);
  const advices = [];
  snapshot.forEach((childSnapshot) => {
    const advice = { id: childSnapshot.key, ...childSnapshot.val() };
    if (advice.content && advice.content.trim() !== '') {
      advices.push(advice);
    }
  });
  return advices;
};