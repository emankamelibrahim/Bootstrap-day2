const products = [
  { img: './images/img-1.png', name: 'Laptop 1', stock: 10, price: 1200 },
  { img: './images/img-2.png', name: 'Laptop 2', stock: 5, price: 850 },
  { img: './images/img-3.png', name: 'Laptop 3', stock: 0, price: 450 },
  { img: './images/img-4.png', name: 'Laptop 4', stock: 8, price: 600 },
  { img: './images/img-5.png', name: 'Laptop 5', stock: 3, price: 3500 },
  { img: './images/img-6.png', name: 'Laptop 6', stock: 20, price: 200 },
  { img: './images/img-7.png', name: 'Laptop 7', stock: 0, price: 750 },
  { img: './images/img-8.png', name: 'Laptop 8', stock: 15, price: 320 },
  { img: './images/img-9.png', name: 'Laptop 9', stock: 7, price: 980 },
  { img: './images/img-10.png', name: 'Laptop 10', stock: 0, price: 1500 },
  { img: './images/img-11.png', name: 'Laptop 11', stock: 4, price: 2200 },
  { img: './images/img-12.png', name: 'Laptop 12', stock: 12, price: 150 }
]

const ITEMS_PER_PAGE = 4
let currentPage = 1
let currentFilter = 'all'

const filterNav = document.getElementById('stockFilter')

const setFilter = filter => {
  currentFilter = filter
  currentPage = 1
  updateFilterNav()
  render()
}

const updateFilterNav = () => {
  if (!filterNav) return
  filterNav.querySelectorAll('a[data-filter]').forEach(link => {
    link.classList.toggle('active', link.dataset.filter === currentFilter)
  })
}

function getFiltered () {
  if (currentFilter === 'instock') return products.filter(p => p.stock > 0)
  if (currentFilter === 'outofstock') return products.filter(p => p.stock === 0)
  return products
}

function getPageItems () {
  const filtered = getFiltered()
  const start = (currentPage - 1) * ITEMS_PER_PAGE
  return filtered.slice(start, start + ITEMS_PER_PAGE)
}

function stockBadge (stock) {
  return stock > 0
    ? `<span class="badge rounded-pill bg-success">In Stock (${stock})</span>`
    : `<span class="badge rounded-pill bg-danger">Out of Stock</span>`
}

function renderGrid (items) {
  document.getElementById('grid-container').innerHTML = items
    .map(
      p => `
      <div class="col-12 col-md-6 col-lg-3">
        <div class="card h-100 shadow-sm position-relative">
          <div class="m-3">${stockBadge(p.stock)}</div>
          <img src="${p.img}" class="card-img-top" alt="${p.name}" />
          <div class="card-body">
            <h6 class="card-title fw-bold">${p.name}</h6>
            <p class="mt-2 mb-0 fw-semibold text-primary">$${p.price.toLocaleString()}</p>
          </div>
        </div>
      </div>
    `
    )
    .join('')
}

function renderList (items) {
  document.getElementById('list-container').innerHTML = items
    .map(
      p => `
      <div class="card mb-3 shadow-sm">
        <div class="row g-0 align-items-center">
          <div class="col-md-3">
            <img src="${p.img}" class="img-fluid rounded-start" alt="${
        p.name
      }" />
          </div>
          <div class="col-md-9">
            <div class="card-body d-flex flex-column">
              <div class="d-flex justify-content-between align-items-start">
                <h5 class="card-title fw-bold mb-0">${p.name}</h5>
                ${stockBadge(p.stock)}
              </div>
              <p class="mt-2 fw-semibold text-primary fs-5">$${p.price.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join('')
}

function renderPagination () {
  const total = Math.ceil(getFiltered().length / ITEMS_PER_PAGE)
  const ul = document.getElementById('pagination')
  ul.innerHTML = ''

  for (let i = 1; i <= total; i++) {
    ul.innerHTML += `
        <li class="page-item ${i === currentPage ? 'active' : ''}">
          <a class="page-link" href="#" data-page="${i}">${i}</a>
        </li>`
  }

  ul.querySelectorAll('.page-link').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault()
      currentPage = parseInt(a.dataset.page)
      render()
    })
  })
}

function render () {
  const items = getPageItems()
  renderGrid(items)
  renderList(items)
  renderPagination()
}

setTimeout(() => {
  document.getElementById('loader').style.display = 'none'
  document.getElementById('tabContent').style.display = 'block'

  if (filterNav) {
    filterNav.querySelectorAll('a[data-filter]').forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault()
        setFilter(link.dataset.filter)
      })
    })
    updateFilterNav()
  }

  render()
}, 1500)
