window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar')
  if (window.scrollY > 50) {
    navbar.classList.add('navbar-scrolled')
  } else {
    navbar.classList.remove('navbar-scrolled')
  }
})

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in')
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

document.querySelectorAll('.car-card, .testimonial-card, .feature-card').forEach(el => {
  observer.observe(el)
})

const contactForm = document.getElementById('contactForm')
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = document.getElementById('name')
    const email = document.getElementById('email')
    const message = document.getElementById('message')
    let isValid = true

    document.querySelectorAll('.error-message').forEach(el => el.remove())

    if (!name.value.trim()) {
      showError(name, 'Пожалуйста, введите ваше имя')
      isValid = false
    } else if (name.value.trim().length < 2) {
      showError(name, 'Имя должно содержать минимум 2 символа')
      isValid = false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.value.trim()) {
      showError(email, 'Пожалуйста, введите email')
      isValid = false
    } else if (!emailRegex.test(email.value)) {
      showError(email, 'Пожалуйста, введите корректный email')
      isValid = false
    }

    if (!message.value.trim()) {
      showError(message, 'Пожалуйста, введите сообщение')
      isValid = false
    } else if (message.value.trim().length < 10) {
      showError(message, 'Сообщение должно содержать минимум 10 символов')
      isValid = false
    }

    if (isValid) {
      const successAlert = document.createElement('div')
      successAlert.className = 'alert alert-success alert-dismissible fade show mt-3'
      successAlert.innerHTML = `
        <strong>Спасибо!</strong> Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `
      contactForm.appendChild(successAlert)
      contactForm.reset()

      setTimeout(() => {
        successAlert.remove()
      }, 5000)
    }
  })
}

function showError(element, message) {
  const error = document.createElement('div')
  error.className = 'error-message text-danger small mt-1'
  error.textContent = message
  element.parentNode.appendChild(error)
  element.classList.add('is-invalid')

  element.addEventListener('input', () => {
    error.remove()
    element.classList.remove('is-invalid')
  }, { once: true })
}

window.showCarDetails = (carName, carPrice, carDescription, carImage) => {
  const modalBody = document.querySelector('#carModal .modal-body')
  modalBody.innerHTML = `
    <img src="${carImage}" class="img-fluid rounded mb-3" alt="${carName}">
    <h4>${carName}</h4>
    <p class="text-primary h5 mb-3">${carPrice}</p>
    <p>${carDescription}</p>
    <h5>Характеристики:</h5>
    <ul>
      <li>Двигатель: 2.0 л Turbo</li>
      <li>Мощность: 250 л.с.</li>
      <li>Разгон 0-100 км/ч: 6.5 сек</li>
      <li>Расход топлива: 8.5 л/100 км</li>
    </ul>
  `
  const modal = new bootstrap.Modal(document.getElementById('carModal'))
  modal.show()
}