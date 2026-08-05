/* =========================================================
   MUHAMMAD AWAIS — 3D PORTFOLIO SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     LOADER — fast boot sequence, capped under 1s,
     click anywhere to skip
  ======================================================= */

  const loader = document.getElementById("scene-loader");
  const loaderStatus = document.getElementById("loader-status");

  const bootLines = [
    "INITIALIZING",
    "LOADING INTERFACE",
    "WELCOME, MUHAMMAD AWAIS"
  ];

  let loaderHidden = false;

  function hideLoader() {

    if (loaderHidden) return;

    loaderHidden = true;

    if (loader) {
      loader.classList.add("hidden");
    }

  }

  if (loaderStatus) {

    let lineIndex = 0;

    loaderStatus.textContent = bootLines[0];

    const bootInterval = setInterval(() => {

      lineIndex++;

      if (lineIndex >= bootLines.length) {
        clearInterval(bootInterval);
        return;
      }

      loaderStatus.textContent = bootLines[lineIndex];

    }, 260);

  }

  if (loader) {

    loader.addEventListener("click", hideLoader);

  }

  /* hard cap: never keep the loader up longer than ~950ms,
     regardless of asset load time */
  setTimeout(hideLoader, 950);

  window.addEventListener("load", () => {
    setTimeout(hideLoader, 350);
  });

});

  /* =======================================================
     SMOOTH SCROLL — LENIS
  ======================================================= */

  if (typeof Lenis !== "undefined") {

    window.lenis = new Lenis({
      duration: 1.1,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    function raf(time) {
      window.lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

  }


  /* =======================================================
     HERO NAME — 3D LETTER REVEAL
  ======================================================= */

  const nameLines =
    document.querySelectorAll(".name-line");

  if (nameLines.length) {

    let globalDelay = 0.15;

    nameLines.forEach((line, lineIndex) => {

      const originalWord = line.textContent.trim();

      line.setAttribute("aria-label", originalWord);
      line.textContent = "";

      [...originalWord].forEach(char => {

        const letter = document.createElement("span");

        letter.className = "name-letter";
        letter.textContent = char;
        letter.style.animationDelay = `${globalDelay}s`;

        line.appendChild(letter);

        globalDelay += 0.045;

      });

      /* pause before the next line starts dropping in */
      globalDelay += 0.25;

    });

  }


  /* =======================================================
     STICKY HEADER
  ======================================================= */

  const header = document.querySelector(".site-header");

  const handleHeader = () => {
    if (!header) return;

    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleHeader);
  handleHeader();


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const navbar = document.querySelector(".navbar");

  if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {
      navbar.classList.toggle("open");

      const icon = menuToggle.querySelector("i");

      if (icon) {
        if (navbar.classList.contains("open")) {
          icon.classList.remove("bi-list");
          icon.classList.add("bi-x-lg");
        } else {
          icon.classList.remove("bi-x-lg");
          icon.classList.add("bi-list");
        }
      }
    });


    /* Close menu after clicking link */

    navbar.querySelectorAll(".nav-link").forEach(link => {

      link.addEventListener("click", () => {

        navbar.classList.remove("open");

        const icon = menuToggle.querySelector("i");

        if (icon) {
          icon.classList.remove("bi-x-lg");
          icon.classList.add("bi-list");
        }

      });

    });

  }


  /* =======================================================
     HERO TYPING EFFECT
  ======================================================= */

  const roleElement =
    document.getElementById("hero-role-text");

  const roles = [
    "WEB DEVELOPER",
    "AI / ML ENTHUSIAST",
    "PYTHON DEVELOPER",
    "FRONTEND DEVELOPER"
  ];

  let roleIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function typeRole() {

    if (!roleElement) return;

    const currentRole = roles[roleIndex];

    if (!deleting) {

      roleElement.textContent =
        currentRole.substring(
          0,
          characterIndex + 1
        );

      characterIndex++;

      if (characterIndex === currentRole.length) {

        deleting = true;

        setTimeout(typeRole, 1500);

        return;
      }

      setTimeout(typeRole, 75);

    } else {

      roleElement.textContent =
        currentRole.substring(
          0,
          characterIndex - 1
        );

      characterIndex--;

      if (characterIndex === 0) {

        deleting = false;

        roleIndex++;

        if (roleIndex >= roles.length) {
          roleIndex = 0;
        }

        setTimeout(typeRole, 300);

        return;
      }

      setTimeout(typeRole, 40);
    }
  }

  typeRole();


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  /* Stagger siblings inside the same parent so each
     section cascades in from the one before it,
     instead of every card popping in at once. */

  const staggerCounts = new Map();

  revealElements.forEach(element => {

    const parent = element.parentElement;

    const count =
      staggerCounts.get(parent) || 0;

    element.style.setProperty(
      "--stagger",
      `${Math.min(count * 0.12, 0.48)}s`
    );

    staggerCounts.set(parent, count + 1);

  });

  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add("visible");

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12
        }
      );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const sections =
    document.querySelectorAll("section[id]");

  const navLinks =
    document.querySelectorAll(".nav-link");

  const updateActiveNav = () => {

    let currentSection = "";

    sections.forEach(section => {

      const sectionTop =
        section.offsetTop - 180;

      if (window.scrollY >= sectionTop) {
        currentSection = section.id;
      }

    });

    navLinks.forEach(link => {

      link.classList.remove("active");

      const href =
        link.getAttribute("href");

      if (
        href === `#${currentSection}`
      ) {
        link.classList.add("active");
      }

    });

  };

  window.addEventListener(
    "scroll",
    updateActiveNav
  );

  updateActiveNav();


  /* =======================================================
     3D TILT CARDS
  ======================================================= */

  const tiltCards =
    document.querySelectorAll(
      ".skill-3d-card, .project-3d-card"
    );

  tiltCards.forEach(card => {

    card.addEventListener(
      "mousemove",
      event => {

        if (window.innerWidth <= 800) {
          return;
        }

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;

        const rotateX =
          ((y - centerY) / centerY) * -4;

        const rotateY =
          ((x - centerX) / centerX) * 4;

        card.style.transform =
          `perspective(1000px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-8px)`;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform = "";

      }
    );

  });


  /* =======================================================
     MAGNETIC BUTTONS
  ======================================================= */

  const magneticTargets =
    document.querySelectorAll(
      ".hero-btn, .nav-cta, .send-btn"
    );

  magneticTargets.forEach(button => {

    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    button.addEventListener("mousemove", event => {

      const rect =
        button.getBoundingClientRect();

      const x =
        event.clientX - rect.left - rect.width / 2;

      const y =
        event.clientY - rect.top - rect.height / 2;

      button.style.transform =
        `translate(${x * 0.25}px, ${(y * 0.35) - 3}px)`;

    });

    button.addEventListener("mouseleave", () => {

      button.style.transform = "";

    });

  });


  /* =======================================================
     PROFILE 3D MOUSE MOVEMENT
  ======================================================= */

  const profile =
    document.querySelector(".hero-profile");

  if (profile) {

    document.addEventListener(
      "mousemove",
      event => {

        if (window.innerWidth <= 800) {
          return;
        }

        const x =
          (event.clientX / window.innerWidth) - 0.5;

        const y =
          (event.clientY / window.innerHeight) - 0.5;

        const rotateY = x * 8;
        const rotateX = y * -6;

        profile.style.transform =
          `translateY(-50%)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)`;

      }
    );

  }


  /* =======================================================
     SMOOTH SCROLL
  ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(targetId);

          if (!target) return;

          event.preventDefault();

          const headerHeight =
            header
              ? header.offsetHeight
              : 0;

          const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            20;

          if (window.lenis) {

            window.lenis.scrollTo(targetPosition, {
              duration: 1.2
            });

          } else {

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth"
            });

          }

        }
      );

    });


  /* =======================================================
     CONTACT FORM
  ======================================================= */

  const contactForm =
    document.querySelector(".contact-form");

  if (contactForm) {

    const statusEl =
      contactForm.querySelector("#form-status");

    contactForm.addEventListener(
      "submit",
      async event => {

        event.preventDefault();

        const button =
          contactForm.querySelector(
            ".send-btn"
          );

        if (!button) return;

        const originalHTML =
          button.innerHTML;

        button.innerHTML =
          `<i class="bi bi-hourglass-split"></i>
           Sending...`;

        button.style.pointerEvents =
          "none";

        if (statusEl) {
          statusEl.textContent = "";
          statusEl.className = "form-status";
        }

        try {

          const response =
            await fetch(contactForm.action, {
              method: "POST",
              headers: {
                "Accept": "application/json"
              },
              body: new FormData(contactForm)
            });

          if (response.ok) {

            button.innerHTML =
              `<i class="bi bi-check2"></i>
               Message Sent`;

            if (statusEl) {
              statusEl.textContent =
                "Thanks! Your message has been sent — I'll get back to you soon.";
              statusEl.classList.add("success");
            }

            contactForm.reset();

          } else {

            throw new Error("Submission failed");

          }

        } catch (error) {

          button.innerHTML =
            `<i class="bi bi-x-lg"></i>
             Failed — Try Again`;

          if (statusEl) {
            statusEl.textContent =
              "Something went wrong. Please email me directly at m.awaisk118@gmail.com.";
            statusEl.classList.add("error");
          }

        } finally {

          setTimeout(() => {

            button.innerHTML =
              originalHTML;

            button.style.pointerEvents =
              "";

          }, 3000);

        }

      }
    );

  }


  /* =======================================================
     CUSTOM CURSOR
  ======================================================= */

  const isFinePointer =
    window.matchMedia("(pointer: fine)").matches;

  if (isFinePointer) {

    const cursorDot =
      document.createElement("div");

    cursorDot.className = "custom-cursor-dot";

    const cursorRing =
      document.createElement("div");

    cursorRing.className = "custom-cursor-ring";

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    let cursorTargetX = 0;
    let cursorTargetY = 0;

    let ringX = 0;
    let ringY = 0;

    document.addEventListener(
      "mousemove",
      event => {

        cursorTargetX = event.clientX;
        cursorTargetY = event.clientY;

        cursorDot.style.left = `${cursorTargetX}px`;
        cursorDot.style.top = `${cursorTargetY}px`;

        cursorDot.classList.add("visible");
        cursorRing.classList.add("visible");

      }
    );

    function animateCursorRing() {

      ringX += (cursorTargetX - ringX) * 0.18;
      ringY += (cursorTargetY - ringY) * 0.18;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      requestAnimationFrame(animateCursorRing);

    }

    animateCursorRing();

    const hoverTargets =
      "a, button, .nav-link, .skill-3d-card, .project-3d-card, .tech-list span, input, textarea";

    document.querySelectorAll(hoverTargets).forEach(element => {

      element.addEventListener("mouseenter", () => {
        cursorRing.classList.add("hovering");
      });

      element.addEventListener("mouseleave", () => {
        cursorRing.classList.remove("hovering");
      });

    });

  }


  /* =======================================================
     MOUSE GLOW
  ======================================================= */

  const glow =
    document.createElement("div");

  glow.className =
    "cursor-glow";

  document.body.appendChild(glow);

  const glowStyle =
    document.createElement("style");

  glowStyle.textContent = `

    .cursor-glow {

      position: fixed;

      width: 250px;
      height: 250px;

      border-radius: 50%;

      pointer-events: none;

      z-index: 1;

      background:
        radial-gradient(
          circle,
          rgba(0,234,255,.045),
          transparent 70%
        );

      transform:
        translate(-50%, -50%);

      transition:
        left .15s ease,
        top .15s ease;

    }

    @media (max-width: 800px) {

      .cursor-glow {
        display: none;
      }

    }

  `;

  document.head.appendChild(glowStyle);


  document.addEventListener(
    "mousemove",
    event => {

      glow.style.left =
        `${event.clientX}px`;

      glow.style.top =
        `${event.clientY}px`;

    }
  );


  /* =======================================================
     CURRENT YEAR
  ======================================================= */

  const year =
    document.querySelector(
      "#current-year"
    );

  if (year) {
    year.textContent =
      new Date().getFullYear();
  }


  /* =======================================================
     CONSOLE MESSAGE
  ======================================================= */

  console.log(
    "%c Muhammad Awais — Portfolio ",
    `
      background: #00eaff;
      color: #020308;
      font-size: 14px;
      font-weight: bold;
      padding: 8px 15px;
    `
  );