// ==========================================
// PORTFOLIO JAVASCRIPT
// Compatible with your current HTML
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ELEMENTS
    // ==========================================

    const header = document.getElementById("header");
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");


    // ==========================================
    // AOS ANIMATION
    // ==========================================

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 120
        });
    }


    // ==========================================
    // TYPED.JS
    // ==========================================

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


    // ==========================================
    // HEADER SCROLL EFFECT
    // ==========================================

    if (header) {
        window.addEventListener("scroll", () => {

            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        });
    }


    // ==========================================
    // SMOOTH SCROLL
    // ==========================================

    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (targetId && targetId.startsWith("#")) {

                const target = document.querySelector(targetId);

                if (target) {

                    e.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }

        });

    });


    // ==========================================
    // ACTIVE NAVIGATION LINK
    // ==========================================

    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    });


    // ==========================================
    // PROJECT CARD HOVER / CLICK EFFECT
    // ==========================================

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {

        card.addEventListener("click", () => {

            projectCards.forEach(item => {
                item.classList.remove("selected");
            });

            card.classList.add("selected");

        });

    });


    // ==========================================
    // EMAILJS CONTACT FORM
    // ==========================================

    if (contactForm) {

        contactForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const SERVICE_ID = "service_753xgur";
            const TEMPLATE_ID = "template_edmn3me";
            const PUBLIC_KEY = "A8GY5Y4s-MORVV50t";

            if (formStatus) {
                formStatus.innerText = "Sending...";
                formStatus.style.color = "var(--primary)";
            }

            // Prevent multiple submissions
            const submitButton = contactForm.querySelector(
                'button[type="submit"]'
            );

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerText = "Sending...";
            }


            emailjs.sendForm(
                SERVICE_ID,
                TEMPLATE_ID,
                contactForm,
                PUBLIC_KEY
            )

            .then(() => {

                if (formStatus) {
                    formStatus.innerText =
                        "✓ Message sent successfully!";
                    formStatus.style.color = "#22c55e";
                }

                contactForm.reset();

                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerText = "Send Message";
                }

                setTimeout(() => {

                    if (formStatus) {
                        formStatus.innerText = "";
                    }

                }, 4000);

            })

            .catch((error) => {

                console.error("EmailJS Error:", error);

                if (formStatus) {
                    formStatus.innerText =
                        "✗ Failed to send message. Please try again.";
                    formStatus.style.color = "#ef4444";
                }

                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerText = "Send Message";
                }

                setTimeout(() => {

                    if (formStatus) {
                        formStatus.innerText = "";
                    }

                }, 4000);

            });

        });

    }


    // ==========================================
    // SCROLL REVEAL FOR PROJECT CARDS
    // ==========================================

    const projectObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                    projectObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    projectCards.forEach(card => {

        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "opacity 0.7s ease, transform 0.7s ease";

        projectObserver.observe(card);

    });


    // ==========================================
    // CONSOLE MESSAGE
    // ==========================================

    console.log("Portfolio JavaScript loaded successfully.");
    console.log("Welcome to Kiran A.'s Portfolio!");

});
