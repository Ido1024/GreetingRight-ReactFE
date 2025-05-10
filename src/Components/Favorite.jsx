import React, { useEffect, useState } from 'react';
import { fetchFavoriteWishes, toggleFavoriteStatus } from '../api/wishService';
import './Wish.css';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);

  // Fetch favorite wishes from the backend
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoriteWishes = await fetchFavoriteWishes(); // Fetch favorite wishes from the backend
        setFavorites(favoriteWishes); // Update the state with the fetched favorites
      } catch (error) {
        console.error('Error loading favorite wishes:', error.message);
      }
    };

    loadFavorites();
  }, []);

  const removeFavorite = async (wish) => {
    try {
      await toggleFavoriteStatus(wish.id); // Toggle the favorite status in the backend
      const updatedFavorites = await fetchFavoriteWishes(); // Refresh the favorite wishes
      setFavorites(updatedFavorites); // Update the state with the refreshed favorites
    } catch (error) {
      console.error('Error toggling favorite status:', error.message);
    }
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
            <p>{wish.birthdayWish}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Favorite;
