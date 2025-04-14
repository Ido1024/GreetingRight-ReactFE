import React, { useState, useEffect } from 'react';
import { generateWish } from '../api/wishService';
import './Wish.css';

const Wish = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(stored);
  }, []);

  const updateFavorites = (newList) => {
    setFavorites(newList);
    localStorage.setItem('favorites', JSON.stringify(newList));
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult('');

    try {
      const wish = await generateWish(text);
      setResult(wish || 'No wish returned.');
    } catch (err) {
      console.error(err);
      setResult('Error generating wish.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    if (!result) return;

    const updated = favorites.includes(result)
      ? favorites.filter((w) => w !== result)
      : [...favorites, result];

    updateFavorites(updated);
  };

  const isFavorite = result && favorites.includes(result);

  return (
    <div className="input-page">
      <div className="large-textarea-wrapper">
        <textarea
          className="large-textarea"
          maxLength="255"
          placeholder="Type something awesome..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="char-counter">{text.length}/255</div>
      </div>

      <button className="action-button" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Generating...' : 'Submit'}
      </button>

      {result && (
        <div className="result-box">
          <div className="wish-header">
            <h3>Generated Wish:</h3>
            <span className={`star-icon ${isFavorite ? 'favorited' : ''}`} onClick={toggleFavorite}>
              ★
            </span>
          </div>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default Wish;
