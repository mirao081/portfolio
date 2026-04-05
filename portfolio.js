document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const projectCards = document.querySelectorAll(".project-card");

  const revealElements = (elements, offset = 100) => {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - offset) {
        el.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", () => {
    revealElements(sections);
    revealElements(projectCards, 150);
  });

  // Trigger once on load
  revealElements(sections);
  revealElements(projectCards, 150);

  // === Contact Form Handling with EmailJS ===
  emailjs.init("9qpoBKds0Z9e4CEFS");

  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
      event.preventDefault();

      emailjs.sendForm("service_p8p78cy", "template_hgu0rm9", this)

        .then(() => {
          alert("Message sent successfully!");
          contactForm.reset();
        }, (error) => {
          alert("Failed to send message. Error: " + JSON.stringify(error));
        });
    });
  }
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
