// ==========================================
// PORTFOLIO JAVASCRIPT
// Compatible with current HTML + EmailJS
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
                    "MCA Graduate",
                    "Full Stack Developer",
                    "Python Enthusiast",
                    "Problem Solver"
                ],

                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 1200,
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

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    });


    // ==========================================
    // PROJECT CARD CLICK EFFECT
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
    // ==========================================

    if (contactForm) {

        contactForm.addEventListener("submit", async function (e) {

            e.preventDefault();


            // --------------------------------------
            // EMAILJS CONFIGURATION
            // --------------------------------------

            const SERVICE_ID = "service_753xgur";
            const TEMPLATE_ID = "template_edmn3me";


            // --------------------------------------
            // STATUS
            // --------------------------------------

            if (formStatus) {

                formStatus.innerText = "Sending...";
                formStatus.style.color = "var(--primary)";

            }


            // --------------------------------------
            // SUBMIT BUTTON
            // --------------------------------------

            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );


            if (submitButton) {

                submitButton.disabled = true;
                submitButton.innerText = "Sending...";

            }


            // --------------------------------------
            // CHECK EMAILJS
            // --------------------------------------

            if (typeof emailjs === "undefined") {

                console.error(
                    "EmailJS library is not loaded."
                );

                if (formStatus) {

                    formStatus.innerText =
                        "Email service is not available.";

                    formStatus.style.color = "#ef4444";

                }

                if (submitButton) {

                    submitButton.disabled = false;
                    submitButton.innerText =
                        "Send Message";

                }

                return;

            }


            // --------------------------------------
            // SEND EMAIL
            // --------------------------------------

            try {

                const response = await emailjs.sendForm(
                    SERVICE_ID,
                    TEMPLATE_ID,
                    contactForm
                );


                // ----------------------------------
                // SUCCESS
                // ----------------------------------

                console.log(
                    "EmailJS SUCCESS:",
                    response.status,
                    response.text
                );


                if (formStatus) {

                    formStatus.innerText =
                        "✓ Message sent successfully!";

                    formStatus.style.color =
                        "#22c55e";

                }


                contactForm.reset();


                if (submitButton) {

                    submitButton.disabled = false;
                    submitButton.innerText =
                        "Send Message";

                }


                setTimeout(() => {

                    if (formStatus) {
                        formStatus.innerText = "";
                    }

                }, 5000);


            } catch (error) {

                // ----------------------------------
                // ERROR DETAILS
                // ----------------------------------

                console.error(
                    "========== EMAILJS ERROR =========="
                );

                console.error(
                    "Error object:",
                    error
                );

                console.error(
                    "Status:",
                    error?.status
                );

                console.error(
                    "Text:",
                    error?.text
                );

                console.error(
                    "Message:",
                    error?.message
                );

                console.error(
                    "Name:",
                    error?.name
                );

                console.error(
                    "==================================="
                );


                // ----------------------------------
                // USER MESSAGE
                // ----------------------------------

                if (formStatus) {

                    if (error?.status === 412) {

                        formStatus.innerText =
                            "✗ EmailJS configuration error. Please check your EmailJS service/template.";

                    } else {

                        formStatus.innerText =
                            "✗ Failed to send message. Please try again.";

                    }

                    formStatus.style.color =
                        "#ef4444";

                }


                // ----------------------------------
                // ENABLE BUTTON
                // ----------------------------------

                if (submitButton) {

                    submitButton.disabled = false;
                    submitButton.innerText =
                        "Send Message";

                }


                setTimeout(() => {

                    if (formStatus) {
                        formStatus.innerText = "";
                    }

                }, 6000);

            }

        });

    }


    // ==========================================
    // PROJECT SCROLL REVEAL
    // ==========================================

    if ("IntersectionObserver" in window) {

        const projectObserver =
            new IntersectionObserver(

                (entries) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.style.opacity = "1";

                            entry.target.style.transform =
                                "translateY(0)";

                            projectObserver.unobserve(
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
    // INITIAL HEADER STATE
    // ==========================================

    if (header && window.scrollY > 50) {

        header.classList.add("scrolled");

    }


    // ==========================================
    // CONSOLE MESSAGE
    // ==========================================

    console.log(
        "Portfolio JavaScript loaded successfully."
    );

    console.log(
        "EmailJS contact form initialized."
    );

});
