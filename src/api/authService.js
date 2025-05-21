const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const error = typeof data === 'string' ? data : data.message || 'An error occurred';
    throw new Error(error);
  }

  return data;
};

export async function loginUser(credentials) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await handleResponse(response);
  sessionStorage.setItem('accessToken', data.accessToken);
  sessionStorage.setItem('refreshToken', data.refreshToken);
  return data;
}

export async function signupUser(credentials) {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  return await handleResponse(response); 
}

export async function refreshToken(token) {
  const response = await fetch(`${BASE_URL}/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: token }),
  });

  const data = await handleResponse(response);
  if (data.accessToken) {
    sessionStorage.setItem('accessToken', data.accessToken);
  }

  return data;
}

export async function logoutUser() {
    const refreshToken = sessionStorage.getItem('refreshToken');
  
    try {
      await fetch(`${BASE_URL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });
    } catch (err) {
      console.error('Logout request failed:', err);
    }
  
    sessionStorage.clear();
  }
  
