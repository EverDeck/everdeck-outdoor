(function () {
  "use strict";

  /* ------------------------------------------------------------------ */
  /* Footer year                                                        */
  /* ------------------------------------------------------------------ */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------ */
  /* Sticky navbar state on scroll                                      */
  /* ------------------------------------------------------------------ */
  var navbar = document.getElementById("siteNavbar");
  function updateNavbarState() {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  }
  updateNavbarState();
  window.addEventListener("scroll", updateNavbarState, { passive: true });

  /* ------------------------------------------------------------------ */
  /* Close the Bootstrap mobile menu after tapping a nav link            */
  /* ------------------------------------------------------------------ */
  var navMain = document.getElementById("navMain");
  if (navMain && window.bootstrap) {
    navMain.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        var instance = bootstrap.Collapse.getOrCreateInstance(navMain, { toggle: false });
        instance.hide();
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Scroll reveal                                                       */
  /* ------------------------------------------------------------------ */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Project gallery filtering                                          */
  /* ------------------------------------------------------------------ */
  var filterButtons = document.querySelectorAll(".filter-btn");
  var galleryCols = document.querySelectorAll(".gallery-col");

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");

      var filter = btn.getAttribute("data-filter");
      galleryCols.forEach(function (col) {
        var match = filter === "all" || col.getAttribute("data-category") === filter;
        col.hidden = !match;
      });
    });
  });

  /* ------------------------------------------------------------------ */
  /* Before / after slider                                              */
  /* ------------------------------------------------------------------ */
  var baRange = document.getElementById("baRange");
  var baAfterWrap = document.getElementById("baAfterWrap");
  var baDivider = document.getElementById("baDivider");
  var baHandle = document.getElementById("baHandle");

  function updateBaSlider(value) {
    var pct = Math.min(100, Math.max(0, value));
    if (baAfterWrap) baAfterWrap.style.clipPath = "inset(0 0 0 " + pct + "%)";
    if (baDivider) baDivider.style.left = pct + "%";
    if (baHandle) baHandle.style.left = pct + "%";
  }

  if (baRange) {
    updateBaSlider(parseFloat(baRange.value));
    baRange.addEventListener("input", function () {
      updateBaSlider(parseFloat(baRange.value));
    });
  }

  /* ------------------------------------------------------------------ */
  /* Estimate form: Bootstrap validation styling + submission            */
  /* ------------------------------------------------------------------ */
  var FORM_ENDPOINT = "https://formspree.io/f/xnpqpnpb"; // e.g. a Formspree endpoint: https://formspree.io/f/xxxxxxx

  var form = document.getElementById("estimateForm");
  var submitBtn = document.getElementById("formSubmit");
  var submitLabel = document.getElementById("formSubmitLabel");
  var statusEl = document.getElementById("formStatus");

  function showStatus(message, type) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = "form-status is-visible " + (type === "success" ? "is-success" : "is-error");
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopPropagation();

      form.classList.add("was-validated");

      if (!form.checkValidity()) {
        showStatus("Please fill in the required fields above before submitting.", "error");
        var firstInvalid = form.querySelector(":invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      submitBtn.disabled = true;
      submitLabel.textContent = "Sending…";

      var isConfigured = FORM_ENDPOINT.indexOf("YOUR_FORM_ENDPOINT_HERE") === -1;

      if (!isConfigured) {
        // Development fallback: no live form endpoint configured yet.
        window.setTimeout(function () {
          submitBtn.disabled = false;
          submitLabel.textContent = "Request a Free Estimate";
          showStatus(
            "Thanks! This form isn't connected to an email service yet — add your Formspree (or similar) endpoint in js/script.js to start receiving submissions.",
            "error"
          );
        }, 500);
        return;
      }

      var formData = new FormData(form);

      fetch(FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          submitBtn.disabled = false;
          submitLabel.textContent = "Request a Free Estimate";
          if (response.ok) {
            form.reset();
            form.classList.remove("was-validated");
            showStatus("Thanks — your request has been sent. We'll be in touch soon.", "success");
          } else {
            showStatus("Something went wrong sending your request. Please call or email us directly.", "error");
          }
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitLabel.textContent = "Request a Free Estimate";
          showStatus("Something went wrong sending your request. Please call or email us directly.", "error");
        });
    });
  }
})();
