const API_URL = "http://localhost:8001";

const welcome = document.getElementById("welcome");
const userAvatar = document.getElementById("user-avatar");
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");

const logoutButton = document.getElementById("logout-button");


window.addEventListener(
    "DOMContentLoaded",
    loadUser
);


logoutButton.addEventListener(
    "click",
    async function (event) {

        event.preventDefault();

        await logout();

    }
);


async function loadUser() {

    try {

        const response = await fetch(
            `${API_URL}/me`,
            {
                credentials: "include"
            }
        );


        if (!response.ok) {

            window.location.href = "login.html";

            return;

        }


        const user = await response.json();


        welcome.textContent =
            `Welcome back, ${user.username} 👋`;

        userAvatar.textContent =
            user.username.charAt(0).toUpperCase();

        userName.textContent =
            user.username;

        userEmail.textContent =
            user.email;

    }

    catch (error) {

        alert("Unable to connect to the server.");

    }

}


async function logout() {

    try {

        await fetch(
            `${API_URL}/logout`,
            {
                method: "POST",

                credentials: "include"
            }
        );

    }

    catch (error) {

        console.error(error);

    }

    finally {

        window.location.href = "login.html";

    }

}