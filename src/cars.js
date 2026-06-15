const cars = [
  { 
    id: 1, 
    name: 'Lamborghini Huracan', 
    price: 'от 1000000 руб', 
    type: 'sport', 
    image: './public/Lamborghini_Huracan_20150525_7811.jpg', 
    description: 'Итальянский суперкар с неповторимым дизайном и мощным двигателем V10.' 
  },
  { 
    id: 2, 
    name: 'Ferrari F8 Tributo', 
    price: 'от 2800000 руб', 
    type: 'sport', 
    image: './public/2021_Ferrari_F8_Tributo.jpg', 
    description: 'Икона итальянского автопрома с потрясающей динамикой.' 
  },
  { 
    id: 3, 
    name: 'Porsche 911 Turbo S', 
    price: 'от 2030000 руб', 
    type: 'sport', 
    image: './public/sport-car-with-black-white-autotuning-driving-forest.jpg', 
    description: 'Немецкое качество и невероятная управляемость.' 
  },
  { 
    id: 4, 
    name: 'Mercedes-Benz S-Class', 
    price: 'от 1100000 руб', 
    type: 'luxury', 
    image: './public/Mercedes-Benz_S_.jpg', 
    description: 'Воплощение роскоши и комфорта.' 
  },
  { 
    id: 5, 
    name: 'BMW i8', 
    price: 'от 5000000 руб', 
    type: 'electric', 
    image: './public/2016_BMW_i8.jpg', 
    description: 'Гибридный спорткар будущего.' 
  },
  { 
    id: 6, 
    name: 'Audi R8', 
    price: 'от 7010000 руб', 
    type: 'sport', 
    image: './public/Audi_R8_V10.jpg', 
    description: 'Немецкий суперкар с характером.' 
  }
]

function displayCars(filter = 'all') {
  const container = document.getElementById('carsContainer')
  const filteredCars = filter === 'all' ? cars : cars.filter(car => car.type === filter)

  container.innerHTML = filteredCars.map(car => `
    <div class="col-md-6 col-lg-4">
      <div class="car-card card h-100 border-0 shadow-sm">
        <img src="${car.image}" class="card-img-top" alt="${car.name}">
        <div class="card-body">
          <h5 class="card-title fw-bold">${car.name}</h5>
          <p class="card-text text-primary h5">${car.price}</p>
          <p class="card-text">${car.description}</p>
          <button class="btn btn-dark" onclick="showCarDetails('${car.name}', '${car.price}', '${car.description}', '${car.image}')">
            Подробнее
          </button>
        </div>
      </div>
    </div>
  `).join('')
}

document.getElementById('carFilter').addEventListener('change', (e) => {
  displayCars(e.target.value)
})

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

window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar')
  if (window.scrollY > 50) {
    navbar.classList.add('navbar-scrolled')
  } else {
    navbar.classList.remove('navbar-scrolled')
  }
})

displayCars()