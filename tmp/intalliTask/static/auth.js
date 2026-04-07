const API_BASE_URL = 'http://localhost:8080/api/auth';

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

/**
 * Handles the signup form submission.
 */
if (signupForm) {
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${API_BASE_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                alert('Signup successful! Please log in.');
                window.location.href = 'login.html'; // Redirect to login page
            } else {
                const errorText = await response.text();
                alert(`Signup failed: ${errorText}`);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('An error occurred. Please try again.');
        }
    });
}

/**
 * Handles the login form submission.
 */
if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                localStorage.setItem('jwtToken', token);
                
                // Decode token to check the role (username in this case)
                const payload = JSON.parse(atob(token.split('.')[1]));
                
                if (payload.sub === 'admin') {
                    // If the username is 'admin', redirect to the admin page
                    window.location.href = 'admin.html';
                } else {
                    // Otherwise, redirect to the standard user page
                    window.location.href = 'dashboard.html';
                }
            } else {
                alert('Login failed: Invalid username or password.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again.');
        }
    });
}