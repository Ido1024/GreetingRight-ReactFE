const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

export async function refreshToken(refreshToken) {
  const response = await fetch(`${BASE_URL}/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });
  if (!response.ok) throw new Error('Refresh failed');
  const data = await response.json();
  if (data.accessToken) {
    sessionStorage.setItem('accessToken', data.accessToken);
  }
  return data.accessToken;
}

export async function authFetch(url, options = {}) {
  let accessToken = sessionStorage.getItem('accessToken');
  let refreshTokenValue = sessionStorage.getItem('refreshToken');

  options.headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  let response = await fetch(url, options);

  if (response.status === 401 && refreshTokenValue) {
    try {
      const newAccessToken = await refreshToken(refreshTokenValue);
      options.headers.Authorization = `Bearer ${newAccessToken}`;
      response = await fetch(url, options);
    } catch (err) {
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      window.location.href = '/login';
      throw err;
    }
  }

  return response;
}