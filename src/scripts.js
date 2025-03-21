document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Handle successful login
            alert('Login successful!');
            // Optionally redirect to another page
            // window.location.href = '/dashboard';
        } else {
            // Handle errors
            errorMessage.textContent = data.msg;
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.textContent = 'An error occurred. Please try again.';
    }
});


//for reg 
document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const firstName = document.getElementById('firstName').value;
    const surname = document.getElementById('surname').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    const signupNotification = document.getElementById('signupNotification');

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, surname, username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Handle successful signup
            signupNotification.classList.remove('hidden');
            setTimeout(() => {
                window.location.href = 'login.html'; // Redirect to login page after showing the message
            }, 2000); // Redirect after 2 seconds
        } else {
            // Handle errors
            errorMessage.textContent = data.msg;
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.textContent = 'An error occurred. Please try again.';
    }
});
