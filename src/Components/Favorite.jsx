import React, { useEffect, useState } from 'react';
import './Wish.css';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (wishToRemove) => {
    const updated = favorites.filter((wish) => wish !== wishToRemove);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="page-container">
      <h1 className="center-title">Your Favorite Wishes</h1>

      {favorites.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.1rem' }}>
          You don't have any favorite wishes yet. ⭐
        </p>
      ) : (
        favorites.map((wish, index) => (
          <div key={index} className="result-box">
            <div className="wish-header">
              <h4>Wish #{index + 1}</h4>
              <span
                className="star-icon favorited"
                title="Remove from favorites"
                onClick={() => removeFavorite(wish)}
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
