// Mobile menu functionality
const menuToggle = document.querySelector(".menu-toggle")
const closeMenu = document.querySelector(".close-menu")
const mobileMenu = document.querySelector(".mobile-menu")
const menuOverlay = document.querySelector(".menu-overlay")
const mobileMenuLinks = document.querySelectorAll(".mobile-menu ul li a")

function openMenu() {
  mobileMenu.classList.add("active")
  menuOverlay.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeMenuFunc() {
  mobileMenu.classList.remove("active")
  menuOverlay.classList.remove("active")
  document.body.style.overflow = ""
}

menuToggle.addEventListener("click", openMenu)
closeMenu.addEventListener("click", closeMenuFunc)
menuOverlay.addEventListener("click", closeMenuFunc)

// Close menu when clicking on a link
mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", closeMenuFunc)
})

// Portfolio filter functionality
const filterButtons = document.querySelectorAll(".filter-btn")
const portfolioItems = document.querySelectorAll(".portfolio-item")

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"))

    // Add active class to clicked button
    this.classList.add("active")

    // Get filter value
    const filterValue = this.getAttribute("data-filter")

    // Filter portfolio items
    portfolioItems.forEach((item) => {
      if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
        item.classList.remove("hidden")
      } else {
        item.classList.add("hidden")
      }
    })
  })
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      })
    }
  })
})
