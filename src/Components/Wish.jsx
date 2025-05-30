import React, { useState, useEffect } from 'react';
import { generateWish, fetchRecentWishes, toggleFavoriteStatus } from '../api/wishService';
import './Wish.css';

const Wish = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [wishes, setWishes] = useState([]);

  // Fetch recent wishes from the backend
  useEffect(() => {
    const loadWishes = async () => {
      try {
        const recentWishes = await fetchRecentWishes(); // Fetch recent wishes from the backend
        console.log('Recent Wishes:', recentWishes); // Log the fetched wishes
        setWishes(recentWishes); // Update the state with the fetched wishes
      } catch (error) {
        console.error('Error loading recent wishes:', error.message);
      }
    };

    loadWishes();
  }, []);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      await generateWish(text); // Generate a new wish in the backend
      const updatedWishes = await fetchRecentWishes(); // Fetch the updated recent wishes
      setWishes(updatedWishes); // Update the state with the new wishes
      setText('');
    } catch (err) {
      console.error(err);
      alert('Error generating wish.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (wish) => {
    try {
      await toggleFavoriteStatus(wish.id); // Toggle the favorite status in the backend
      const updatedWishes = await fetchRecentWishes(); // Refresh the recent wishes
      setWishes(updatedWishes); // Update the state with the refreshed wishes
    } catch (error) {
      console.error('Error toggling favorite status:', error.message);
    }
  };

  return (
    <div className="page-container">
      <h1 className="center-title">Generate a Wish</h1>

      <div className="large-textarea-wrapper">
        <textarea
          className="large-textarea"
          maxLength="255"
          placeholder="Type your wish inspiration..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="char-counter">{text.length}/255</div>
      </div>

      <div className="center-button">
        <button className="action-button" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Generating...' : 'Submit'}
        </button>
      </div>

      {wishes.map((wish, index) => (
        <div key={index} className="result-box">
          <div className="wish-header">
            <h4>Wish #{index + 1}</h4>
            <span
              className={`star-icon ${wish.favorite ? 'favorited' : ''}`} 
              onClick={() => toggleFavorite(wish)}
            >
              ★
            </span>
          </div>
          <p>{wish.birthdayWish}</p>
        </div>
      ))}
    </div>
  );
};

export default Wish;
