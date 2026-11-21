/**
 * Oshadhi Purwa — Management Information Systems & Data Analyst Portfolio
 * Interactive Functionality & Modal Handling
 */

// Selected Project Data strictly aligned with Oshadhi Purwa's CV
const projectsData = {
  "inklink": {
    badge: "Full Stack Web Development",
    title: "InkLink — Creative Storytelling Platform",
    tagline: "Collaborative creative platform enabling users to write, publish, explore stories, leave reviews, and engage with community genres.",
    client: "Team Academic Project (NSBM)",
    role: "Full Stack Developer (Backend & Database)",
    timeline: "Academic Term",
    problem: "Writers and readers needed an organized digital space to publish serialized content, discover stories by genre, manage profile avatars, and engage through comments and community reactions with secure data persistence.",
    solution: "Engineered robust backend services using Java 17, Spring Boot 3.1, Spring Security, and Hibernate ORM coupled with a MySQL database. Integrated RESTful endpoints for user registration, story lifecycle management, avatar handling, and search discovery.",
    tech: ["Java 17", "Spring Boot 3.1", "Spring Security", "Spring MVC", "Hibernate", "MySQL", "REST APIs", "Git", "Maven"]
  },
  "simcast": {
    badge: "Web Development / UI",
    title: "Simcast — Web-Based News Platform",
    tagline: "Modern responsive digital media portal delivering news categories, user account management, and transparent safety policies.",
    client: "Web Development Project",
    role: "Frontend & UI Developer",
    timeline: "Academic Term",
    problem: "Designing an accessible news platform prioritizing information readability, user privacy policies, intuitive navigation, and reliable account creation.",
    solution: "Developed interactive UI modules including user authentication forms, an interactive FAQ section, Terms of Service, and Security Policy documentation. Ensured full responsiveness across mobile and desktop devices with clear hierarchy.",
    tech: ["HTML5", "CSS3", "JavaScript (ES6)", "Responsive Design", "UI/UX Usability", "Information Architecture"]
  },
  "bio-pohora": {
    badge: "Human Computer Interaction (HCI)",
    title: "BIO Pohora / Govipola Connect — Fertilizer Subsidy Management",
    tagline: "Agricultural digital transformation platform providing verifiable, offline-capable fertilizer quota tracking for Sri Lankan farmers.",
    client: "Human-Computer Interaction (HCI) Project",
    role: "HCI & UI Workflow Contributor",
    timeline: "Academic Term",
    problem: "Agricultural fertilizer subsidy distribution in Sri Lanka suffered from paper-based delays, lack of transparency, and rural connectivity challenges for farming communities.",
    solution: "Contributed to user-centered workflow designs featuring QR-based verification, digital token allocation, offline synchronization, automated SMS/app notifications, land registration, and transparent entitlement tracking.",
    tech: ["HCI Principles", "User-Centered Design", "Figma Prototyping", "QR Verification", "Offline Workflows", "Field Usability"]
  }
};

// Open Project Modal
function openProjectModal(projectId) {
  const data = projectsData[projectId];
  if (!data) return;

  const modal = document.getElementById("projectModal");
  if (!modal) return;

  document.getElementById("modalBadge").textContent = data.badge;
  document.getElementById("modalTitle").textContent = data.title;
  document.getElementById("modalTagline").textContent = data.tagline;
  document.getElementById("modalClient").textContent = data.client;
  document.getElementById("modalRole").textContent = data.role;
  document.getElementById("modalTimeline").textContent = data.timeline;
  document.getElementById("modalProblem").textContent = data.problem;
  document.getElementById("modalSolution").textContent = data.solution;

  const techContainer = document.getElementById("modalTech");
  techContainer.innerHTML = data.tech.map(t => `<span>${t}</span>`).join("");

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close Project Modal
function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Initialize DOM Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Modal Close Listeners
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalBackdrop = document.getElementById("projectModal");

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeProjectModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) {
        closeProjectModal();
      }
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProjectModal();
    }
  });

  // Smooth Scroll offset adjustment
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // App tile click interaction (interactive feedback)
  const appTiles = document.querySelectorAll(".app-tile");
  appTiles.forEach(tile => {
    tile.addEventListener("click", () => {
      const tech = tile.getAttribute("data-tech");
      tile.style.transform = "scale(0.92)";
      setTimeout(() => {
        tile.style.transform = "";
      }, 180);
    });
  });

  // Ensure Video Autoplays Smoothly
  const video = document.querySelector(".profile-portrait-video, .profile-circle-video");
  if (video) {
    video.play().catch(() => {
      // Autoplay fallback with mute
      video.muted = true;
      video.play();
    });
  }

  // =========================================================================
  // FIRST-LOAD INTRO ANIMATION SCREEN ("HELLO ! I AM OSHADHI PURWA")
  // =========================================================================
  const introLoader = document.getElementById("introLoader");
  const introProgressBar = document.getElementById("introProgressBar");
  const skipIntroBtn = document.getElementById("skipIntroBtn");

  function dismissIntro() {
    if (!introLoader || introLoader.classList.contains("intro-dismissed")) return;
    introLoader.classList.add("intro-dismissed");
    document.body.style.overflow = "";

    // Trigger hero section animations once intro opens
    setTimeout(() => {
      document.querySelectorAll("#hero .reveal-fade-up, #hero .reveal-fade-right, #hero .reveal-fade-left, #hero .reveal-zoom-in").forEach((el) => {
        el.classList.add("is-visible");
      });
      document.querySelectorAll("#hero .split-char").forEach((c) => c.classList.add("char-loaded"));
      document.querySelectorAll("#hero .split-word").forEach((w) => w.classList.add("word-loaded"));
    }, 150);
  }

  if (introLoader) {
    document.body.style.overflow = "hidden";

    // Progress bar fill animation
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 14 + 10;
      if (progress >= 100) {
        progress = 100;
        if (introProgressBar) introProgressBar.style.width = "100%";
        clearInterval(interval);
        setTimeout(dismissIntro, 500);
      } else {
        if (introProgressBar) introProgressBar.style.width = `${progress}%`;
      }
    }, 120);

    // Skip button click
    if (skipIntroBtn) {
      skipIntroBtn.addEventListener("click", () => {
        clearInterval(interval);
        if (introProgressBar) introProgressBar.style.width = "100%";
        dismissIntro();
      });
    }

    // Safety timeout: automatically dismiss after 2.6 seconds max
    setTimeout(() => {
      clearInterval(interval);
      dismissIntro();
    }, 2600);
  }

  // =========================================================================
  // TYPOGRAPHY SPLIT-TEXT SHIMMER & STAGGER ENGINE
  // =========================================================================
  const splitTextTargets = document.querySelectorAll(".split-text-target");
  splitTextTargets.forEach((el) => {
    const mode = el.getAttribute("data-speed") || "char";
    
    if (mode === "char") {
      const text = el.textContent.trim();
      el.innerHTML = "";
      const words = text.split(" ");
      words.forEach((w, wIndex) => {
        const wordContainer = document.createElement("span");
        wordContainer.style.display = "inline-block";
        wordContainer.style.whiteSpace = "nowrap";

        [...w].forEach((char) => {
          const wrap = document.createElement("span");
          wrap.className = "split-char-wrap";
          const inner = document.createElement("span");
          inner.className = "split-char";
          inner.textContent = char;
          wrap.appendChild(inner);
          wordContainer.appendChild(wrap);
        });

        el.appendChild(wordContainer);

        // Add space between words if not last
        if (wIndex < words.length - 1) {
          const spaceWrap = document.createElement("span");
          spaceWrap.className = "split-char-wrap";
          spaceWrap.innerHTML = "&nbsp;";
          el.appendChild(spaceWrap);
        }
      });

      // Set stagger delays smoothly
      const allChars = el.querySelectorAll(".split-char");
      allChars.forEach((c, idx) => {
        c.style.transitionDelay = `${Math.min(idx * 0.035, 1.2)}s`;
      });
    } else if (mode === "word") {
      const text = el.textContent.trim();
      const words = text.split(/\s+/);
      el.innerHTML = "";
      words.forEach((word, index) => {
        const wrap = document.createElement("span");
        wrap.className = "split-word-wrap";
        const inner = document.createElement("span");
        inner.className = "split-word";
        inner.textContent = word;
        inner.style.transitionDelay = `${Math.min(index * 0.04, 1.4)}s`;
        wrap.appendChild(inner);
        el.appendChild(wrap);
      });
    }
  });

  // =========================================================================
  // INTERSECTION OBSERVER FOR IN-VIEW REVEALS & TEXT LOADING ANIMATIONS
  // =========================================================================
  const revealElements = document.querySelectorAll(
    ".reveal-fade-up, .reveal-fade-right, .reveal-fade-left, .reveal-zoom-in, .cv-section-block, .split-text-target, .software-bars-grid"
  );

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;

        // Add visibility class
        target.classList.add("is-visible");

        // Custom delay attribute if supplied
        const delay = target.getAttribute("data-delay");
        if (delay) {
          target.style.transitionDelay = `${delay}s`;
        }

        // Trigger character stagger if element is split
        const chars = target.querySelectorAll(".split-char");
        chars.forEach((c) => c.classList.add("char-loaded"));

        // Trigger word stagger if element is split
        const words = target.querySelectorAll(".split-word");
        words.forEach((w) => w.classList.add("word-loaded"));

        // Trigger software skill progress bars animation
        const bars = target.querySelectorAll ? target.querySelectorAll(".bar-fill") : [];
        bars.forEach((bar) => {
          const targetW = bar.getAttribute("data-width") || "80%";
          bar.style.setProperty("--target-width", targetW);
          setTimeout(() => {
            bar.classList.add("bar-animated");
            bar.style.width = targetW;
          }, 150);
        });

        // If the section itself contains split-texts or bars, trigger children
        if (target.classList.contains("cv-section-block") || target.classList.contains("software-bars-grid") || target.closest(".poster-lower-sheet")) {
          target.querySelectorAll(".split-char").forEach((c) => c.classList.add("char-loaded"));
          target.querySelectorAll(".split-word").forEach((w) => w.classList.add("word-loaded"));
          target.querySelectorAll(".bar-fill").forEach((b) => {
            const w = b.getAttribute("data-width") || "80%";
            b.style.setProperty("--target-width", w);
            b.classList.add("bar-animated");
            b.style.width = w;
          });
        }

        // Stop unobserving so user can appreciate once triggered, or allow re-entry
        observer.unobserve(target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => revealObserver.observe(el));

  // =========================================================================
  // MULTI-SPEED SCROLL PARALLAX ENGINE
  // Different elements move at different relative speeds on scroll
  // =========================================================================
  const parallaxItems = document.querySelectorAll("[data-scroll-speed]");

  let ticking = false;
  let lastScrollY = window.pageYOffset;

  function updateParallax() {
    const scrollY = window.pageYOffset;
    const windowH = window.innerHeight;

    parallaxItems.forEach((item) => {
      const speed = parseFloat(item.getAttribute("data-scroll-speed")) || 0;
      if (speed === 0) return;

      const rect = item.getBoundingClientRect();
      const itemTop = rect.top + scrollY;
      const itemH = rect.height;

      // Only transform when element is within viewport margins
      if (scrollY + windowH > itemTop - 120 && scrollY < itemTop + itemH + 120) {
        // Calculate distance from center of viewport
        const delta = (scrollY + windowH * 0.5) - (itemTop + itemH * 0.5);
        const yOffset = delta * speed;
        
        // Retain any existing rotate or scale if any, apply translate3d for 60fps GPU acceleration
        item.style.transform = `translate3d(0, ${yOffset.toFixed(2)}px, 0)`;
      }
    });

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    lastScrollY = window.pageYOffset;
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // Initial calculation on page load
  setTimeout(updateParallax, 100);
});
