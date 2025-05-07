import React, { useState, useEffect } from 'react';
import { generateWish } from '../api/wishService';
import './Wish.css';

const Wish = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [wishes, setWishes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedWishes = JSON.parse(localStorage.getItem('wishes') || '[]');
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setWishes(storedWishes.slice(0, 3)); // Load only 3 most recent
    setFavorites(storedFavorites);
  }, []);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const wish = await generateWish(text);
      const newWish = wish || 'No wish returned.';
      const updatedWishes = [newWish, ...wishes].slice(0, 3); // Keep only 3
      setWishes(updatedWishes);
      localStorage.setItem('wishes', JSON.stringify(updatedWishes));
      setText('');
    } catch (err) {
      console.error(err);
      alert('Error generating wish.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (wish) => {
    const updatedFavorites = favorites.includes(wish)
      ? favorites.filter((w) => w !== wish)
      : [...favorites, wish];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
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
              className={`star-icon ${favorites.includes(wish) ? 'favorited' : ''}`}
              onClick={() => toggleFavorite(wish)}
            >
              ★
            </span>
          </div>
          <p>{wish}</p>
        </div>
      ))}
    </div>
  );
};

export default Wish;
