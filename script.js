// ==========================================
// PORTFOLIO JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ELEMENTS
    // ==========================================

    const header = document.getElementById("header");
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    const submitButton = document.getElementById("submit-btn");


    // ==========================================
    // AOS ANIMATION
    // ==========================================

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
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

        const handleHeaderScroll = () => {

            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        };

        window.addEventListener("scroll", handleHeaderScroll);

        // Run once when page loads
        handleHeaderScroll();
    }


    // ==========================================
    // SMOOTH SCROLL
    // ==========================================

    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // ==========================================
    // ACTIVE NAVIGATION
    // ==========================================

    const sections = document.querySelectorAll("section[id]");

    const updateActiveNavigation = () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 160;
            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    // ==========================================
    // PROJECT CARD EFFECT
    // ==========================================

    const projectCards =
        document.querySelectorAll(".project-card");

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
    // EMAILJS BROWSER SDK v4
    // ==========================================

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async function (e) {

                e.preventDefault();

                // ----------------------------------
                // Check EmailJS
                // ----------------------------------

                if (typeof emailjs === "undefined") {

                    console.error(
                        "EmailJS SDK is not loaded."
                    );

                    if (formStatus) {

                        formStatus.textContent =
                            "✗ Email service is not loaded.";

                        formStatus.style.color =
                            "#ef4444";

                    }

                    return;
                }


                // ----------------------------------
                // EmailJS Configuration
                // ----------------------------------

                const SERVICE_ID =
                    "service_753xgur";

                const TEMPLATE_ID =
                    "template_edmn3me";


                // ----------------------------------
                // Disable submit button
                // ----------------------------------

                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.textContent =
                        "Sending...";

                }


                // ----------------------------------
                // Show sending message
                // ----------------------------------

                if (formStatus) {

                    formStatus.textContent =
                        "Sending your message...";

                    formStatus.style.color =
                        "var(--primary)";

                }


                try {

                    // ----------------------------------
                    // Send form
                    // ----------------------------------

                    const response =
                        await emailjs.sendForm(
                            SERVICE_ID,
                            TEMPLATE_ID,
                            contactForm
                        );


                    // ----------------------------------
                    // Success
                    // ----------------------------------

                    console.log(
                        "EmailJS SUCCESS:",
                        response.status,
                        response.text
                    );


                    if (formStatus) {

                        formStatus.textContent =
                            "✓ Message sent successfully!";

                        formStatus.style.color =
                            "#22c55e";

                    }


                    // Clear form

                    contactForm.reset();


                    // ----------------------------------
                    // Hide status after 5 seconds
                    // ----------------------------------

                    setTimeout(() => {

                        if (formStatus) {
                            formStatus.textContent = "";
                        }

                    }, 5000);


                } catch (error) {

                    // ----------------------------------
                    // EmailJS ERROR
                    // ----------------------------------

                    console.error(
                        "EmailJS ERROR:",
                        error
                    );


                    let errorMessage =
                        "Failed to send message. Please try again.";


                    // EmailJS normally provides:
                    // error.status
                    // error.text

                    if (error && error.text) {

                        errorMessage =
                            error.text;

                    }


                    if (formStatus) {

                        formStatus.textContent =
                            "✗ " + errorMessage;

                        formStatus.style.color =
                            "#ef4444";

                    }

                } finally {

                    // ----------------------------------
                    // Enable button
                    // ----------------------------------

                    if (submitButton) {

                        submitButton.disabled = false;

                        submitButton.textContent =
                            "Send Message";

                    }

                }

            }
        );

    }


    // ==========================================
    // PROJECT SCROLL REVEAL
    // ==========================================

    if ("IntersectionObserver" in window) {

        const projectObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0)";

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        projectCards.forEach(card => {

            card.style.opacity = "0";

            card.style.transform =
                "translateY(30px)";

            card.style.transition =
                "opacity 0.7s ease, transform 0.7s ease";

            projectObserver.observe(card);

        });

    }


    // ==========================================
    // CONSOLE
    // ==========================================

    console.log(
        "Portfolio JavaScript loaded successfully."
    );

    console.log(
        "EmailJS contact form initialized."
    );

});
