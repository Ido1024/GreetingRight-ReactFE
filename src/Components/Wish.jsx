import React, { useState } from 'react';
import './Wish.css';

const Wish = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult('');

    try {
      const response = await fetch('http://localhost:5000/generate-wish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setResult(data.wish || 'No wish returned.');
    } catch (err) {
      console.error(err);
      setResult('Error generating wish.');
    } finally {
      setLoading(false);
    }
  };

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
          <h3>Generated Wish:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default Wish;
