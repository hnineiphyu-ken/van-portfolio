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

// Portfolio filter + pagination functionality
const paginationContainer = document.getElementById("portfolio-pagination")
const filterButtons = document.querySelectorAll(".filter-btn")
const portfolioItems = document.querySelectorAll(".portfolio-item")

const itemsPerPage = 9
let currentFilter = "all"
let currentPage = 1

function getFilteredItems() {
  return Array.from(portfolioItems).filter(
    (item) => currentFilter === "all" || item.getAttribute("data-category") === currentFilter
  )
}

function renderPagination(totalPages) {
  paginationContainer.innerHTML = ""

  if (totalPages <= 1) return

  const prevBtn = document.createElement("button")
  prevBtn.type = "button"
  prevBtn.className = "page-btn prev"
  prevBtn.textContent = "<"
  prevBtn.disabled = currentPage === 1
  prevBtn.setAttribute("aria-label", "Previous page")
  prevBtn.addEventListener("click", () => {
    currentPage = Math.max(1, currentPage - 1)
    renderPage()
  })
  paginationContainer.appendChild(prevBtn)

  for (let p = 1; p <= totalPages; p++) {
    const btn = document.createElement("button")
    btn.type = "button"
    btn.className = "page-btn" + (p === currentPage ? " active" : "")
    btn.textContent = String(p)
    btn.setAttribute("aria-label", `Go to page ${p}`)
    btn.addEventListener("click", () => {
      currentPage = p
      renderPage()
    })
    paginationContainer.appendChild(btn)
  }

  const nextBtn = document.createElement("button")
  nextBtn.type = "button"
  nextBtn.className = "page-btn next"
  nextBtn.textContent = ">"
  nextBtn.disabled = currentPage === totalPages
  nextBtn.setAttribute("aria-label", "Next page")
  nextBtn.addEventListener("click", () => {
    currentPage = Math.min(totalPages, currentPage + 1)
    renderPage()
  })
  paginationContainer.appendChild(nextBtn)
}

function renderPage() {
  const filtered = getFilteredItems()
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage))
  if (currentPage > totalPages) currentPage = totalPages

  // Hide all items first
  portfolioItems.forEach((item) => item.classList.add("hidden"))

  const startIndex = (currentPage - 1) * itemsPerPage
  const visibleItems = filtered.slice(startIndex, startIndex + itemsPerPage)
  visibleItems.forEach((item) => item.classList.remove("hidden"))

  renderPagination(totalPages)
}

// Filter button events

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"))

    // Add active class to clicked button
    this.classList.add("active")
    
    currentFilter = this.getAttribute("data-filter")
    currentPage = 1
    renderPage()
  })
})

// Initial render
renderPage()

// Content section pagination functionality
const contentPaginationContainer = document.getElementById("content-pagination")
const contentItems = document.querySelectorAll(".content-grid")

const contentItemsPerPage = 3
let currentContentPage = 1

function renderContentPagination(totalPages) {
  contentPaginationContainer.innerHTML = ""

  if (totalPages <= 1) return

  const prevBtn = document.createElement("button")
  prevBtn.type = "button"
  prevBtn.className = "page-btn prev"
  prevBtn.textContent = "<"
  prevBtn.disabled = currentContentPage === 1
  prevBtn.setAttribute("aria-label", "Previous page")
  prevBtn.addEventListener("click", () => {
    currentContentPage = Math.max(1, currentContentPage - 1)
    renderContentPage()
  })
  contentPaginationContainer.appendChild(prevBtn)

  for (let p = 1; p <= totalPages; p++) {
    const btn = document.createElement("button")
    btn.type = "button"
    btn.className = "page-btn" + (p === currentContentPage ? " active" : "")
    btn.textContent = String(p)
    btn.setAttribute("aria-label", `Go to page ${p}`)
    btn.addEventListener("click", () => {
      currentContentPage = p
      renderContentPage()
    })
    contentPaginationContainer.appendChild(btn)
  }

  const nextBtn = document.createElement("button")
  nextBtn.type = "button"
  nextBtn.className = "page-btn next"
  nextBtn.textContent = ">"
  nextBtn.disabled = currentContentPage === totalPages
  nextBtn.setAttribute("aria-label", "Next page")
  nextBtn.addEventListener("click", () => {
    currentContentPage = Math.min(totalPages, currentContentPage + 1)
    renderContentPage()
  })
  contentPaginationContainer.appendChild(nextBtn)
}

function renderContentPage() {
  const totalPages = Math.max(1, Math.ceil(contentItems.length / contentItemsPerPage))
  if (currentContentPage > totalPages) currentContentPage = totalPages

  // Hide all content items first
  contentItems.forEach((item) => item.classList.add("hidden"))

  const startIndex = (currentContentPage - 1) * contentItemsPerPage
  const visibleItems = Array.from(contentItems).slice(startIndex, startIndex + contentItemsPerPage)
  visibleItems.forEach((item) => item.classList.remove("hidden"))

  renderContentPagination(totalPages)
}

// Initial content render
if (contentItems.length > 0) {
  renderContentPage()
}

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
