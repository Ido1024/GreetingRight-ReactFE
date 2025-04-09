// src/Components/Wish.jsx
import React, { useState } from 'react';
import './Wish.css'; // Import the page-specific CSS file

const Wish = () => {
  const [text, setText] = useState('');  // State to manage the text input

  return (
    <div>
      {/* MAIN CONTENT */}
      <div className="forms-section input-page">
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
        <button className="action-button">Submit</button>
      </div>
    </div>
  );
};

export default Wish;
