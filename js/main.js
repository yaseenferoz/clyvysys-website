document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("my-form");
    var submitButton = document.getElementById("my-form-button");
    var status = document.getElementById("my-form-status");

    async function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission

        // Disable the submit button to prevent multiple submissions
        submitButton.disabled = true;
        submitButton.innerText = "Sending..."; // Change button text to indicate sending

        // Clear the status message
        status.innerHTML = "";
        status.classList.remove("success", "error"); // Remove any existing classes

        // Collect form data
        var data = new FormData(form);

        try {
            // Send form data to Formspree
            let response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            // Handle the response
            if (response.ok) {
                status.innerHTML = "Thanks for your submission!";
                status.classList.add("success"); // Add success class for styling
                form.reset(); // Reset the form
            } else {
                // Handle errors returned by Formspree
                let responseData = await response.json();
                if (responseData.errors) {
                    status.innerHTML = responseData.errors.map(error => error.message).join(", ");
                } else {
                    status.innerHTML = "Oops! There was a problem submitting your form.";
                }
                status.classList.add("error"); // Add error class for styling
            }
        } catch (error) {
            // Handle network or other errors
            status.innerHTML = "Oops! There was a problem submitting your form.";
            status.classList.add("error"); // Add error class for styling
        } finally {
            // Re-enable the submit button and reset its text
            submitButton.disabled = false;
            submitButton.innerText = "Submit";
        }
    }

    // Add event listener to handle form submission
    form.addEventListener("submit", handleSubmit);
});
document.addEventListener("DOMContentLoaded", function () {
    // Check if consent cookie is already set
    if (!getCookie('cookieConsent')) {
        // Show the cookie consent banner
        document.getElementById("cookie-consent").style.display = "block";
    }

    // Handle the "Accept" button click
    document.getElementById("accept-cookies").addEventListener("click", function () {
        setCookie('cookieConsent', 'true', 365); // Set consent cookie for 1 year
        document.getElementById("cookie-consent").style.display = "none"; // Hide banner
    });
});

// Set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Get a cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const cookiesArray = document.cookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i];
        while (cookie.charAt(0) === ' ') cookie = cookie.substring(1, cookie.length);
        if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length, cookie.length);
    }
    return null;
}
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) { // Adjust the scroll position threshold as needed
        header.style.backgroundColor = "rgba(0, 0, 0, 0.8)"; // Solid color after scrolling down
    } else {
        header.style.backgroundColor = "rgba(0, 0, 0, 0)"; // Transparent when at the top
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const typingText = document.getElementById("typing-text");
    typingText.style.width = ""; // This will trigger the CSS typing effect
});

// Delete a cookie
function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}
// document.addEventListener("contextmenu", function (e) {
//     e.preventDefault(); // Disables right-click
// });

// document.addEventListener("keydown", function (e) {
//     // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
//     if (e.keyCode === 123 || // F12
//         (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
//         (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
//         (e.ctrlKey && e.keyCode === 85)) { // Ctrl+U (view page source)
//         e.preventDefault();
//     }
// });
