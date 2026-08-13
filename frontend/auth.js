/* =========================================
   CRACKIT AUTHENTICATION FRONTEND
========================================= */


/* =========================================
   SHOW / HIDE PASSWORD
========================================= */

function togglePassword(inputId, button) {

    const input =
        document.getElementById(inputId);


    if (!input) {
        return;
    }


    if (input.type === "password") {

        input.type = "text";

        button.textContent = "Hide";

    } else {

        input.type = "password";

        button.textContent = "Show";

    }

}



/* =========================================
   RESET PASSWORD VALIDATION
========================================= */

const resetForm =
    document.getElementById("resetForm");


if (resetForm) {

    resetForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const password =
                document.getElementById("newPassword").value;


            const confirmPassword =
                document.getElementById(
                    "confirmNewPassword"
                ).value;


            const error =
                document.getElementById("resetError");


            error.textContent = "";


            if (password.length < 8) {

                error.textContent =
                    "Password must contain at least 8 characters.";

                return;

            }


            if (password !== confirmPassword) {

                error.textContent =
                    "Passwords do not match.";

                return;

            }


            /*
             Later this will call the backend API.

             Example:

             fetch("/api/auth/reset-password", {
                 method: "POST",
                 ...
             })

            */


            window.location.href =
                "auth-success.html";

        }
    );

}



/* =========================================
   RESEND VERIFICATION
========================================= */

const resendButton =
    document.getElementById("resendButton");


if (resendButton) {

    resendButton.addEventListener(
        "click",
        function() {


            const message =
                document.getElementById(
                    "resendMessage"
                );


            /*
             Later the backend will actually
             resend the verification email.
            */


            message.textContent =
                "Verification email requested.";


            resendButton.disabled = true;


            resendButton.textContent =
                "Email requested";


            setTimeout(function() {

                resendButton.disabled = false;

                resendButton.textContent =
                    "Resend verification email";

                message.textContent = "";

            }, 5000);

        }
    );

}