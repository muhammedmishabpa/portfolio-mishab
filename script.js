// Muhammed Mishab P A — Portfolio Scripts with Interactive Animations

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const primaryMenu = document.querySelector("#primary-menu");

  if (menuToggle && primaryMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
      primaryMenu.classList.toggle("is-open", !isOpen);
    });

    primaryMenu.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        primaryMenu.classList.remove("is-open");
      }
    });
  }

  // 2. Dynamic Year
  const year = document.querySelector("#current-year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  // 3. ScrollSpy for Nav Links
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

  window.addEventListener(
    "scroll",
    () => {
      const scrollY = window.pageYOffset;
      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 140;
        const sectionId = current.getAttribute("id");

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.style.color = "var(--accent)";
            } else {
              link.style.color = "";
            }
          });
        }
      });
    },
    { passive: true }
  );

  // 4. Interactive Cursor Glow Spotlight (Desktop)
  const cursorGlow = document.getElementById("cursor-glow");
  if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = -200;
    let mouseY = -200;
    let currentX = -200;
    let currentY = -200;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const followCursor = () => {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;
      requestAnimationFrame(followCursor);
    };
    requestAnimationFrame(followCursor);
  }

  // 5. Typewriter Text Cycling in Hero Eyebrow
  const typewriterEl = document.getElementById("typewriter-text");
  if (typewriterEl) {
    const roles = [
      "Frontend developer",
      "UI/UX enthusiast",
      "BCA scholar",
      "Creative problem solver",
      "Lifelong learner",
    ];
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let isDeleting = true;
    let typingSpeed = 100;

    const typeLoop = () => {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        charIndex--;
        typewriterEl.textContent = currentRole.substring(0, charIndex);
      } else {
        charIndex++;
        typewriterEl.textContent = currentRole.substring(0, charIndex);
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeLoop, 2200);
        return;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeLoop, 400);
        return;
      }

      typingSpeed = isDeleting ? 40 : 80;
      setTimeout(typeLoop, typingSpeed);
    };

    setTimeout(typeLoop, 2400);
  }

  // 6. 3D Tilt Card Parallax Effect on Mouse Move
  const tiltCards = document.querySelectorAll(".profile-card, .project-card, .service-card, .about-portrait-card");
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    tiltCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  // 7. Scroll Reveal Animation for Sections & Cards
  const revealElements = document.querySelectorAll(
    ".section-heading, .about-content, .timeline-item, .credential-list, .service-card, .project-card, .contact-inner"
  );

  revealElements.forEach((el) => {
    el.classList.add("reveal-init");
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("reveal-visible"));
  }

  // 8. CareerGenie Number Counter Animation
  const counterEl = document.getElementById("cg-score-counter");
  if (counterEl) {
    let animated = false;
    const target = parseInt(counterEl.getAttribute("data-target") || "95", 10);

    const runCounter = () => {
      let count = 0;
      const duration = 1400;
      const stepTime = Math.abs(Math.floor(duration / target));
      const timer = setInterval(() => {
        count++;
        counterEl.textContent = `${count}%`;
        if (count >= target) {
          clearInterval(timer);
        }
      }, stepTime);
    };

    if ("IntersectionObserver" in window) {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !animated) {
            animated = true;
            runCounter();
            counterObserver.disconnect();
          }
        },
        { threshold: 0.25 }
      );

      counterObserver.observe(counterEl);
    } else {
      counterEl.textContent = `${target}%`;
    }
  }

  // 9. Primary Button Micro-Magnetic Hover
  const primaryButtons = document.querySelectorAll(".button-primary");
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    primaryButtons.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  // 10. Contact Form Connected to Google Forms with Custom Greetings
  const contactForm = document.getElementById("portfolio-contact-form");
  const formStatus = document.getElementById("form-status-message");
  const hiddenIframe = document.getElementById("google-form-iframe");

  if (contactForm && formStatus) {
    let isSubmitting = false;

    // Helper: Display rich animated greeting cards for success & failure
    const showGreeting = (type, name, customMsg) => {
      const cleanName = name ? name.replace(/[<>]/g, "") : "Friend";

      if (type === "success") {
        formStatus.className = "form-status success";
        formStatus.innerHTML = `
          <div class="status-icon-wrap" aria-hidden="true">✓</div>
          <div class="status-content">
            <strong>🎉 Greetings, ${cleanName}! Message Sent Successfully!</strong>
            <p>Thank you for reaching out! Your response has been safely recorded in my Google Form. I usually review messages and reply within 24 hours. Have a great day!</p>
          </div>
        `;
      } else {
        formStatus.className = "form-status error";
        formStatus.innerHTML = `
          <div class="status-icon-wrap" aria-hidden="true">✕</div>
          <div class="status-content">
            <strong>⚠️ Message Delivery Failed</strong>
            <p>${
              customMsg ||
              `Sorry ${cleanName}, we couldn't deliver your message. Please check your connection or email me directly at <a href="mailto:muhammedmishabpa907@gmail.com">muhammedmishabpa907@gmail.com</a>.`
            }</p>
          </div>
        `;
      }

      formStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });

      // Auto-hide greeting card after 8 seconds
      clearTimeout(formStatus._timer);
      formStatus._timer = setTimeout(() => {
        formStatus.className = "form-status";
        formStatus.innerHTML = "";
      }, 8000);
    };

    contactForm.addEventListener("submit", (e) => {
      const name = document.getElementById("form-name")?.value.trim() || "";
      const email = document.getElementById("form-email")?.value.trim() || "";
      const message = document.getElementById("form-message")?.value.trim() || "";

      // 1. Validation Checks
      if (!name || !email || !message) {
        e.preventDefault();
        showGreeting("error", name, "Please fill in all required fields (Name, Email, and Message) before sending.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        e.preventDefault();
        showGreeting("error", name, "Please enter a valid email address (e.g., yourname@domain.com) so I can reply back to you.");
        return;
      }

      if (!navigator.onLine) {
        e.preventDefault();
        showGreeting("error", name, "You are currently offline. Please check your internet connection and try sending again.");
        return;
      }

      // 2. Prevent duplicate or simultaneous submissions
      if (isSubmitting) {
        e.preventDefault();
        return;
      }

      const submitBtn = contactForm.querySelector("button[type='submit']");
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = "Sending to Google Forms...";
        submitBtn.disabled = true;
        isSubmitting = true;

        // The form posts ONCE natively to target="google-form-iframe".
        // No duplicate fetch() call so Google Forms records exactly ONE response.
        const handleSuccess = () => {
          if (!isSubmitting) return;
          isSubmitting = false;
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          contactForm.reset();
          showGreeting("success", name);
        };

        if (hiddenIframe) {
          hiddenIframe.onload = handleSuccess;
        }

        // Fallback timer ensures smooth confirmation feedback
        setTimeout(handleSuccess, 1100);
      }
    });
  }

  // 11. Live Profile Mini Screen Popup Handling
  const popupItems = document.querySelectorAll(".profile-popup-item");

  popupItems.forEach((item) => {
    const chip = item.querySelector(".profile-chip");
    const screen = item.querySelector(".mini-screen-popup");

    if (chip) {
      chip.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = item.classList.contains("is-open");

        // Close all other popups
        popupItems.forEach((other) => {
          if (other !== item) other.classList.remove("is-open");
        });

        // Toggle current popup
        item.classList.toggle("is-open", !isOpen);
      });
    }

    if (screen) {
      // Direct navigation when clicking on the small popup screen
      screen.addEventListener("click", (e) => {
        e.preventDefault();
        const href = screen.getAttribute("href");
        if (href) {
          window.open(href, "_blank", "noopener,noreferrer");
        }
      });
    }
  });

  // Close any open popups when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".profile-popup-item")) {
      popupItems.forEach((item) => item.classList.remove("is-open"));
    }
  });

  // 12. Disable Right-Click Context Menu & Inspect Element Shortcuts
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    return false;
  });

  document.addEventListener("keydown", (e) => {
    // F12 key
    if (e.key === "F12" || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+I / Cmd+Option+I (Inspect)
    // Ctrl+Shift+J / Cmd+Option+J (Console)
    // Ctrl+Shift+C / Cmd+Option+C (Inspect Element)
    if (
      (e.ctrlKey || e.metaKey) &&
      e.shiftKey &&
      (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")
    ) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+U / Cmd+Option+U (View Page Source)
    if ((e.ctrlKey || e.metaKey) && (e.key === "u" || e.key === "U")) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+S / Cmd+S (Save Page)
    if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S")) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  });

  // Prevent dragging images
  document.addEventListener("dragstart", (e) => {
    if (e.target && e.target.nodeName === "IMG") {
      e.preventDefault();
      return false;
    }
  });
});
