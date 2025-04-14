import React, { useEffect, useState } from 'react';
import './Wish.css';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(stored);
  }, []);

  const toggleFavorite = (wish) => {
    const updated = favorites.includes(wish)
      ? favorites.filter((item) => item !== wish)
      : [...favorites, wish];

    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="input-page">
      <h2>Favorite Wishes</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        favorites.map((wish, index) => (
          <div key={index} className="result-box">
            <div className="wish-header">
              <h4>Wish #{index + 1}</h4>
              <span
                className="star-icon favorited"
                onClick={() => toggleFavorite(wish)}
              >
                ★
              </span>
            </div>
            <p>{wish}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Favorite;
