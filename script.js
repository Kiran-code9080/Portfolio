// Wait for the entire HTML document to be loaded
document.addEventListener("DOMContentLoaded", () => {

    // =======================
    // PRELOADER
    // =======================
    const preloader = document.getElementById("preloader");
    window.addEventListener("load", () => {
        preloader.classList.add("hidden");
    });

    // =======================
    // AOS Animation Init
    // =======================
    AOS.init({
        duration: 1000,
        once: true,
        offset: 120
    });

    // =======================
    // ELEMENT SELECTORS
    // =======================
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const header = document.querySelector(".header");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");
    const backToTopBtn = document.querySelector(".back-to-top");
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle.querySelector("i");
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    // =======================
    // MOBILE MENU TOGGLE
    // =======================
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // =======================
    // SCROLL EVENTS
    // =======================
    window.addEventListener("scroll", () => {
        const scrollY = window.pageYOffset;

        // Header background change
        header.classList.toggle("scrolled", scrollY > 50);

        // Back to Top visibility
        backToTopBtn.classList.toggle("visible", scrollY > 300);

        // Active nav link indicator
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute("id");
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add("active");
                } else {
                    navLink.classList.remove("active");
                }
            }
        });
    });

    // =======================
    // THEME (LIGHT / DARK)
    // =======================
    const applyTheme = (theme) => {
        if (theme === "light") {
            document.body.classList.add("light-mode");
            themeIcon.classList.replace("fa-moon", "fa-sun");
        } else {
            document.body.classList.remove("light-mode");
            themeIcon.classList.replace("fa-sun", "fa-moon");
        }
        localStorage.setItem("theme", theme);
    };

    const savedTheme = localStorage.getItem("theme") || "dark";
    applyTheme(savedTheme);

    themeToggle.addEventListener("click", () => {
        const newTheme = document.body.classList.contains("light-mode") ? "dark" : "light";
        applyTheme(newTheme);
    });

    // =======================
    // TYPING EFFECT
    // =======================
    new Typed(".typing-effect", {
        strings: ["Full Stack Developer"],
        typeSpeed: 70,
        backSpeed: 80,
        loop: true
    });

    // =======================
    // SKILLS FILTER
    // =======================
    const setupFilter = (filterButtonsSelector, cardsSelector) => {
        const filterBtns = document.querySelectorAll(filterButtonsSelector);
        const cards = document.querySelectorAll(cardsSelector);

        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                filterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const filter = btn.dataset.filter;

                cards.forEach(card => {
                    if (filter === "all" || card.dataset.category === filter) {
                        card.style.display = "block";
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        });
    };

    setupFilter(".skills-section .filter-btn", ".skill-card");

    // =======================
    // SVG TIMELINE ANIMATION
    // =======================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll(".timeline").forEach(el => observer.observe(el));

    // =======================
    // PROJECT MODAL
    // =======================
    const projectModal = document.getElementById("project-modal");
    const closeProjectModal = document.querySelector(".modal .close-btn");

    document.querySelectorAll(".project-card").forEach(card => {
        card.addEventListener("click", () => {
            document.getElementById("modal-img").src = card.querySelector("img").src;
            document.getElementById("modal-title").innerText = card.querySelector("h3").innerText;
            document.getElementById("modal-desc").innerText = card.querySelector("p").innerText;
            document.getElementById("modal-tags").innerHTML = card.querySelector(".project-tags").innerHTML;
            document.getElementById("modal-links").innerHTML = card.querySelector(".project-links").innerHTML;

            projectModal.style.display = "block";
        });
    });

    closeProjectModal.addEventListener("click", () => {
        projectModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === projectModal) projectModal.style.display = "none";
    });

    // =======================
    // ACHIEVEMENT MODAL (unchanged)
    // =======================
    const achievementModal = document.getElementById("achievement-modal");
    const closeAchModal = achievementModal.querySelector(".close-btn");

    document.querySelectorAll(".achievement-card").forEach(card => {
        card.addEventListener("click", () => {
            document.getElementById("modal-achievement-img").src = card.querySelector("img").src;
            document.getElementById("modal-achievement-desc").innerText = card.querySelector("p").innerText;

            achievementModal.style.display = "block";
        });
    });

    closeAchModal.addEventListener("click", () => {
        achievementModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === achievementModal) achievementModal.style.display = "none";
    });

    // =======================
    // CONTACT FORM (EMAILJS)
    // =======================
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // ✔ YOUR EmailJS credentials
        const SERVICE_ID = "service_753xgur";
        const TEMPLATE_ID = "template_edmn3me";
        const PUBLIC_KEY = "A8GY5Y4s-MORVV50t";

        formStatus.textContent = "Sending...";
        formStatus.style.color = "#ffffff";

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm, PUBLIC_KEY)
            .then(() => {
                formStatus.textContent = "Message sent successfully!";
                formStatus.style.color = "#22c55e";
                contactForm.reset();
                setTimeout(() => formStatus.textContent = "", 3000);
            })
            .catch(err => {
                console.error("EmailJS Error:", err);
                formStatus.textContent = "Failed to send message. Please try again.";
                formStatus.style.color = "#ef4444";
                setTimeout(() => formStatus.textContent = "", 3000);
            });
    });

});
