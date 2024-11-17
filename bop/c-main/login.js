document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    // Predefined admin credentials
    const adminEmail = 'admin@example.com'; 
    const adminPassword = 'admin123'; 

    // Clear error message when user starts typing
    const clearErrorMessage = () => {
        errorMessage.textContent = '';
    };

    // Event listener for form submission
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        clearErrorMessage(); 

        const email = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            errorMessage.textContent = 'Please enter both email and password.';
            return;
        }

        // Check if the entered credentials match the admin credentials
        if (email === adminEmail && password === adminPassword) {
            localStorage.setItem('currentUser', adminEmail); 
            window.location = 'admin.html';
            return;
        }

        // Get registered users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the email and password match any registered user
        const user = users.find(user => user.emailAddress === email && user.password === password);

        if (user) {
            localStorage.setItem('currentUser', user.emailAddress); 
            user.lastLogin = new Date().toLocaleString();
            localStorage.setItem("users", JSON.stringify(users));
            window.location = 'index.html';
        } else {
            errorMessage.textContent = 'Invalid email or password. Please try again.';
        }
    });

    document.getElementById('username').addEventListener('input', clearErrorMessage);
    document.getElementById('password').addEventListener('input', clearErrorMessage);
});
