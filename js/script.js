
document.addEventListener("DOMContentLoaded", () => {

    // MOBILE NAVIGATION
    const menuToggle = document.getElementById("menu-btn");
    const navMenu = document.getElementById("navbar");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navMenu.classList.toggle("show");

            menuToggle.textContent = isOpen ? "✕" : "☰";
            menuToggle.setAttribute("aria-expanded", isOpen);

        });

        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("show");
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");

            });

        });

    }


    // ACTIVE NAVIGATION LINK
    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll("#navbar a").forEach(link => {

        const linkPage = link.getAttribute("href");

        link.classList.toggle("active", linkPage === currentPage);

    });


    // DYNAMIC FOOTER YEAR
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    // CURSOR GLOW
    const cursorGlow = document.querySelector(".cursor-glow");

    if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {

        document.addEventListener("mousemove", event => {

            cursorGlow.style.left = event.clientX + "px";
            cursorGlow.style.top = event.clientY + "px";

        });

    }


    // SCROLL REVEAL ANIMATION
    const revealElements = document.querySelectorAll(
        ".project-card, .service-card, .service-process-card, " +
        ".technology-card, .journey-card, .goals-grid > *, " +
        ".contact-item, .contact-form-box, .stat-item, " +
        ".intro-section, .cta-section, .projects-cta, .services-cta"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver((entries, obs) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => {

            element.classList.add("reveal");
            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    // 3D PROFILE CARD
    const profileCard = document.querySelector(".profile-card");

    if (profileCard && window.matchMedia("(pointer: fine)").matches) {

        profileCard.addEventListener("mousemove", event => {

            const rect = profileCard.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            profileCard.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        });

        profileCard.addEventListener("mouseleave", () => {

            profileCard.style.transform =
                "perspective(1000px) rotateX(5deg) rotateY(-10deg)";

        });

    }


    // CONTACT FORM - WHATSAPP
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const service =
                document.getElementById("service").value;

            const message =
                document.getElementById("message").value.trim();

            const phoneNumber = "923355116713";

            const status =
                document.getElementById("form-status");

            if (!/^\d{10,15}$/.test(phoneNumber)) {

                if (status) {
                    status.textContent =
                        "Please configure your WhatsApp number in script.js.";
                }

                return;

            }

            const whatsappMessage =
                `Hello M. Sohail Baghi!

Name: ${name}
Email: ${email}
Service: ${service}

Project Details:
${message}`;

            const whatsappURL =
                `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

            const newWindow = window.open(
                whatsappURL,
                "_blank"
            );

            if (status) {

                if (newWindow) {

                    newWindow.opener = null;

                    status.textContent =
                        "WhatsApp opened. Review your message and press Send.";

                } else {

                    status.textContent =
                        "Your browser blocked the popup. Please allow popups and try again.";

                }

            }

        });

    }

});
