/* ==========================================
   PORTFOLIO MAIN JAVASCRIPT
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // Initialize Animate On Scroll (AOS)
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    // Initialize Typed.js
    if (typeof Typed !== "undefined") {
        const typedElement = document.getElementById("typed");
        if (typedElement) {
            new Typed("#typed", {
                strings: [
                    "MCA Student",
                    "Full Stack Developer",
                    "Python Enthusiast",
                    "Problem Solver"
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 1000,
                loop: true
            });
        }
    }

    // Header Blur on Scroll
    const header = document.getElementById("header");
    if (header) {
        const toggleHeaderClass = () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        };
        window.addEventListener("scroll", toggleHeaderClass);
        toggleHeaderClass();
    }

    // Dynamic Navigation Highlighting
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a");

    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener("scroll", () => {
            let current = "";

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.offsetHeight;

                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute("id");
                }
            });

            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${current}`) {
                    link.classList.add("active");
                }
            });
        });
    }

    // EmailJS Contact Form Handler
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    const submitBtn = document.getElementById("submit-btn");
    const emailTime = document.getElementById("email-time");

    if (contactForm) {
        contactForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            if (typeof emailjs === "undefined") {
                console.error("EmailJS SDK is not loaded.");
                if (formStatus) {
                    formStatus.textContent = "✕ Email service is unavailable.";
                    formStatus.style.color = "#ef4444";
                }
                return;
            }

            if (emailTime) {
                emailTime.value = new Date().toLocaleString();
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Sending...";
            }

            if (formStatus) {
                formStatus.textContent = "Sending your message...";
                formStatus.style.color = "var(--primary)";
            }

            try {
                const response = await emailjs.sendForm(
                    "service_753xgur",
                    "template_edmn3me",
                    contactForm
                );

                console.log("EmailJS SUCCESS:", response.status, response.text);

                if (formStatus) {
                    formStatus.textContent = "✓ Message sent successfully!";
                    formStatus.style.color = "#22c55e";
                }

                contactForm.reset();

                setTimeout(() => {
                    if (formStatus) {
                        formStatus.textContent = "";
                    }
                }, 5000);

            } catch (error) {
                console.error("EmailJS ERROR:", error);

                let errorMsg = "Failed to send message.";
                if (error && error.text) {
                    errorMsg = error.text;
                }

                if (formStatus) {
                    formStatus.textContent = "✕ " + errorMsg;
                    formStatus.style.color = "#ef4444";
                }
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = "Send Message";
                }
            }
        });
    }
});
