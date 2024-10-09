document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("my-form");
    var submitButton = document.getElementById("my-form-button");
    var status = document.getElementById("my-form-status");

    if (form && submitButton && status) {
        async function handleSubmit(event) {
            event.preventDefault();
            submitButton.disabled = true;
            submitButton.innerText = "Sending...";
            status.innerHTML = "";
            status.classList.remove("success", "error");
            var data = new FormData(form);

            try {
                let response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    status.innerHTML = "Thanks for your submission!";
                    status.classList.add("success");
                    form.reset();
                } else {
                    let responseData = await response.json();
                    if (responseData.errors) {
                        status.innerHTML = responseData.errors.map(error => error.message).join(", ");
                    } else {
                        status.innerHTML = "Oops! There was a problem submitting your form.";
                    }
                    status.classList.add("error");
                }
            } catch (error) {
                status.innerHTML = "Oops! There was a problem submitting your form.";
                status.classList.add("error");
            } finally {
                submitButton.disabled = false;
                submitButton.innerText = "Submit";
            }
        }

        form.addEventListener("submit", handleSubmit);
    }

    // Typing effect for different sections
    const typingEffects = [
        { id: "typing-text", text: "Crafting Your Vision with Our Bliss" },
        { id: "typing-text-service", text: "Transforming ideas into powerful digital experiences through our wide range of services." },
        { id: "typing-text-about", text: "Driven by innovation and excellence, Clyvysys is here to empower businesses through digital transformation and strategic solutions." },
        { id: "typing-text-contact", text: "We’re here to help. Reach out to us for any inquiries, consultations, or support." }
    ];

    typingEffects.forEach(({ id, text }) => {
        const typingElement = document.getElementById(id);
        if (typingElement) {
            let index = 0;
            typingElement.innerHTML = "";

            function typeCharacter() {
                if (index < text.length) {
                    typingElement.innerHTML += text.charAt(index);
                    index++;
                    setTimeout(typeCharacter, 100);
                } else {
                    typingElement.classList.add("blinking-cursor");
                }
            }

            typeCharacter();
        }
    });

    // Cookie Consent Banner
    const cookieConsent = document.getElementById("cookie-consent");
    const acceptCookies = document.getElementById("accept-cookies");

    if (cookieConsent && acceptCookies) {
        if (!getCookie('cookieConsent')) {
            cookieConsent.style.display = "block";
        }

        acceptCookies.addEventListener("click", function () {
            setCookie('cookieConsent', 'true', 365);
            cookieConsent.style.display = "none";
        });
    }
});

// Additional utility functions
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookiesArray = document.cookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i];
        while (cookie.charAt(0) === ' ') cookie = cookie.substring(1);
        if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length);
    }
    return null;
}

// Smooth background transition on scroll
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    header.style.backgroundColor = window.scrollY > 50 ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0)";
});
