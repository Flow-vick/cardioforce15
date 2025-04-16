document.addEventListener('DOMContentLoaded', () => {
    const usernameDisplay = document.getElementById('username-display');
    const logoutButton = document.getElementById('logout-button');
    const thunderSound = document.getElementById('thunder-sound');
    const currentUser = localStorage.getItem('currentUser');

    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    usernameDisplay.textContent = currentUser;

    thunderSound.play().catch(error => {
        console.log("Erreur lors de la lecture du son :", error);
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
});