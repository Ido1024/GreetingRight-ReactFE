const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

const authHeader = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
});

export async function saveWish(content) {
  const response = await fetch(`${BASE_URL}/wish`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({ content }),
  });
  const data = await response.json();
  return data;
}

export async function getUserWishes() {
  const response = await fetch(`${BASE_URL}/wish`, {
    method: 'GET',
    headers: authHeader(),
  });
  const data = await response.json();
  return data;
}

export async function deleteWish(content) {
  const response = await fetch(`${BASE_URL}/wish`, {
    method: 'DELETE',
    headers: authHeader(),
    body: JSON.stringify({ content }),
  });
  return response.ok;
}
