// Career Page JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Job filtering functionality
  const locationFilter = document.getElementById("locationFilter");
  const departmentFilter = document.getElementById("departmentFilter");
  const jobCards = document.querySelectorAll(".job-card");
  const noPositionsMsg = document.getElementById("noPositions");

  // Function to filter jobs
  function filterJobs() {
    const selectedLocation = locationFilter.value.toLowerCase();
    const selectedDepartment = departmentFilter.value.toLowerCase();
    let visibleCount = 0;

    jobCards.forEach((card) => {
      const cardParent = card.closest(".col-12");
      const location = card
        .querySelector(".bi-geo-alt")
        .parentElement.textContent.toLowerCase()
        .trim();
      const department = card
        .querySelector(".bi-briefcase")
        .parentElement.textContent.toLowerCase()
        .trim();

      let showCard = true;

      // Check location filter
      if (
        selectedLocation !== "all locations" &&
        !location.includes(selectedLocation)
      ) {
        showCard = false;
      }

      // Check department filter
      if (
        selectedDepartment !== "all departments" &&
        !department.includes(selectedDepartment)
      ) {
        showCard = false;
      }

      // Show or hide the card
      if (showCard) {
        cardParent.classList.remove("d-none");
        visibleCount++;
      } else {
        cardParent.classList.add("d-none");
      }
    });

    // Show "no positions" message if no jobs match
    if (visibleCount === 0) {
      noPositionsMsg.classList.remove("d-none");
    } else {
      noPositionsMsg.classList.add("d-none");
    }
  }

  // Add event listeners to filters
  if (locationFilter && departmentFilter) {
    locationFilter.addEventListener("change", filterJobs);
    departmentFilter.addEventListener("change", filterJobs);
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && href !== "#!") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 80; // Adjust for fixed header
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Add animation class when cards come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe job cards for animation
  document.querySelectorAll(".job-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(card);
  });

  // Add hover effect to workplace images
  document.querySelectorAll(".workplace-image").forEach((image) => {
    image.addEventListener("mouseenter", function () {
      this.style.zIndex = "10";
    });
    image.addEventListener("mouseleave", function () {
      this.style.zIndex = "1";
    });
  });
});
