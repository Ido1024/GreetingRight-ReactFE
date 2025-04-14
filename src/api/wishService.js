const FLASK_API_URL = process.env.REACT_APP_FLASK_URL || 'http://localhost:5000';

const handleWishResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const error = typeof data === 'string' ? data : data.error || 'Wish generation failed';
    throw new Error(error);
  }

  return data;
};

export async function generateWish(text) {
  const response = await fetch(`${FLASK_API_URL}/generate-wish`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  const data = await handleWishResponse(response);
  return data.wish;
}
