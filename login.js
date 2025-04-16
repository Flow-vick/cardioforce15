document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const signupLink = document.getElementById('signup-link');
    const loginLink = document.getElementById('login-link');
    const loginSection = document.querySelector('.login-form');
    const signupSection = document.querySelector('.signup-form');
    const errorMessage = document.getElementById('error-message');
    const signupError = document.getElementById('signup-error');

    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginSection.style.display = 'none';
        signupSection.style.display = 'block';
    });

    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupSection.style.display = 'none';
        loginSection.style.display = 'block';
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('new-username').value;
        const password = document.getElementById('new-password').value;

        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username]) {
            signupError.textContent = 'Ce nom d’utilisateur existe déjà.';
            signupError.style.display = 'block';
            return;
        }

        users[username] = {
            password,
            programs: {}, // On ajoutera les programmes après
            progress: {}
        };
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', username);
        window.location.href = 'start.html';
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username] && users[username].password === password) {
            localStorage.setItem('currentUser', username);
            window.location.href = 'start.html';
        } else {
            errorMessage.textContent = 'Nom d’utilisateur ou mot de passe incorrect.';
            errorMessage.style.display = 'block';
        }
    });
});