const API_URL = "http://localhost:8001";

const form = document.getElementById("login-form");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const loginButton = document.getElementById("login-button");

const errorMessage = document.getElementById("form-error");

const toggleButton = document.getElementById("toggle-password");



form.addEventListener("submit", login);

toggleButton.addEventListener("click", togglePassword);



function togglePassword() {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        toggleButton.textContent = "Hide";

    }

    else {

        passwordInput.type = "password";

        toggleButton.textContent = "Show";

    }

}



async function login(event) {

    event.preventDefault();

    clearError();

    const username = usernameInput.value.trim();

    const password = passwordInput.value;


    // Validation

    if (username === "") {

        showError("Please enter your username.");

        return;

    }

    if (password === "") {

        showError("Please enter your password.");

        return;

    }


    setLoading();


    try {

        const response = await fetch(
           `${API_URL}/login`, 
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify({
                    username,
                    password
                })
            }
        );


        if (response.ok) {

            window.location.href = "dashboard.html";

            return;

        }


        const data = await response.json();

        showError(data.detail);

    }

    catch (error) {

        showError("Unable to connect to the server.");

    }

    finally {

        stopLoading();

    }

}



function setLoading() {

    loginButton.disabled = true;

    loginButton.textContent = "Logging in...";

}



function stopLoading() {

    loginButton.disabled = false;

    loginButton.textContent = "Login";

}



function showError(message) {

    errorMessage.textContent = message;

}



function clearError() {

    errorMessage.textContent = "";

}