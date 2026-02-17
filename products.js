const API = "https://fakestoreapi.com/products";
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let selectedProduct = null;

document.addEventListener("DOMContentLoaded", init);

function init() {
  loadCategories();
  loadProducts();
  updateCartCount();
}

/* FETCH HELPER */
async function fetchData(url) {
  const res = await fetch(url);
  return await res.json();
}

/* LOADER */
function showLoader(show) {
  document.getElementById("loader").classList.toggle("hidden", !show);
}

/* CATEGORIES */
async function loadCategories() {
  const categories = await fetchData(`${API}/categories`);
  const container = document.getElementById("category-container");

  container.appendChild(createCategoryButton("All", ""));

  categories.forEach(cat => {
    const formatted = cat.charAt(0).toUpperCase() + cat.slice(1);
    container.appendChild(createCategoryButton(formatted, cat));
  });
}

function createCategoryButton(text, value) {
  const btn = document.createElement("button");
  btn.className = "btn btn-sm btn-outline";
  btn.innerText = text;

  btn.onclick = () => {
    document
      .querySelectorAll("#category-container button")
      .forEach(b => b.classList.remove("btn-primary"));

    btn.classList.add("btn-primary");
    loadProducts(value);
  };

  return btn;
}

/* PRODUCTS */
async function loadProducts(category = "") {
  showLoader(true);

  const url = category ? `${API}/category/${category}` : API;
  const products = await fetchData(url);

  showLoader(false);
  displayProducts(products);
}

function displayProducts(products) {
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card bg-base-100 shadow";

    card.innerHTML = `
      <figure class="p-6 bg-base-200">
        <img src="${product.image}" class="h-40 object-contain"/>
      </figure>

      <div class="card-body p-4">
        <div class="flex justify-between items-center mb-1">
          <span class="badge badge-outline text-xs capitalize">
            ${product.category}
          </span>
          <span class="text-sm text-yellow-500">
            ⭐ ${product.rating.rate} (${product.rating.count})
          </span>
        </div>

        <h3 class="font-medium text-sm truncate">
          ${product.title}
        </h3>

        <p class="font-bold mt-1">$${product.price}</p>

        <div class="flex gap-2 mt-3">
          <button class="btn btn-sm btn-outline w-1/2"
                  onclick="openModal(${product.id})">
            Details
          </button>
          <button class="btn btn-sm btn-primary w-1/2"
                  onclick="addToCart(${product.id})">
            Add
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

/* MODAL*/
async function openModal(id) {
  const product = await fetchData(`${API}/${id}`);
  selectedProduct = product;

  document.getElementById("modal-title").innerText = product.title;
  document.getElementById("modal-image").src = product.image;
  document.getElementById("modal-description").innerText = product.description;
  document.getElementById("modal-price").innerText = product.price;
  document.getElementById("modal-rating").innerText =
    `${product.rating.rate} (${product.rating.count})`;

  document.getElementById("modal-add").onclick =
    () => addToCart(product.id);

  document.getElementById("productModal").showModal();
}

function closeModal() {
  document.getElementById("productModal").close();
}

/* CART */
async function addToCart(id) {
  const product = await fetchData(`${API}/${id}`);
  cart.push(product);
  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.length;
}
