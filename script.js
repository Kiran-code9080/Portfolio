// ==========================================
// EMAILJS CONTACT FORM
// ==========================================

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {

    contactForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        // Show sending status
        if (formStatus) {
            formStatus.textContent = "Sending...";
            formStatus.style.color = "var(--primary)";
        }

        // Disable button
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }

        try {

            // Send form through EmailJS
            const response = await emailjs.sendForm(
                "service_753xgur",
                "template_edmn3me",
                contactForm
            );

            console.log("EmailJS SUCCESS:", response);

            if (formStatus) {
                formStatus.textContent =
                    "✓ Message sent successfully!";
                formStatus.style.color = "#22c55e";
            }

            // Clear form
            contactForm.reset();

        } catch (error) {

            console.error("EmailJS ERROR:", error);

            if (formStatus) {

                // Show actual EmailJS error
                if (error && error.text) {
                    formStatus.textContent =
                        "✗ " + error.text;
                } else {
                    formStatus.textContent =
                        "✗ Failed to send message. Please try again.";
                }

                formStatus.style.color = "#ef4444";
            }

        } finally {

            // Enable button again
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Send Message";
            }

        }

    });

}
