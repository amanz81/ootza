import { useState } from 'react';
import { ref, push, serverTimestamp } from 'firebase/database';
import { db } from '../lib/firebase';

export default function ShareAdviceButton({ onAdviceSubmitted }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [advice, setAdvice] = useState('');
  const [category, setCategory] = useState('');

  const submitAdvice = async () => {
    if (advice.trim() === '' || category === '') {
      alert('Please enter advice and select a category');
      return;
    }

    const newAdvice = {
      text: advice,
      category,
      likes: 0,
      date: serverTimestamp(),
    };

    try {
      const advicesRef = ref(db, 'advices');
      const newAdviceRef = await push(advicesRef, newAdvice);
      console.log('Advice submitted successfully with key:', newAdviceRef.key);
      onAdviceSubmitted({ ...newAdvice, id: newAdviceRef.key });
      setAdvice('');
      setCategory('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding advice:', error);
      alert(`Failed to submit advice. Error: ${error.message}`);
    }
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Share Advice</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Share Your Advice</h2>
            <textarea
              value={advice}
              onChange={(e) => setAdvice(e.target.value)}
              placeholder="Enter your advice"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="Life">Life</option>
              <option value="Career">Career</option>
              <option value="Relationships">Relationships</option>
            </select>
            <button onClick={submitAdvice}>Submit</button>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
      `}</style>
    </>
  );
}