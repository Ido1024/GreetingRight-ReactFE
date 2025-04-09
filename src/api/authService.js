// src/api/authService.js
const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

export async function loginUser(credentials) {
    return fetch(`${backendUrl}/loginSignup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    }).then(response => response.json());
}

export async function refreshToken(token) {
    return fetch(`${backendUrl}/refresh-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: token }),
    }).then(response => response.json());
}