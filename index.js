const API = "https://fakestoreapi.com/products";
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentProduct = null;

document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
  loadProducts();
  updateCartUI();
});

function showLoader(show){
  document.getElementById("loader").classList.toggle("hidden", !show);
}

async function loadCategories(){
  const res = await fetch(API + "/categories");
  const categories = await res.json();
  const container = document.getElementById("categories");

  const allBtn = document.createElement("button");
  allBtn.className = "btn btn-outline btn-sm";
  allBtn.innerText = "All";
  allBtn.onclick = () => loadProducts();
  container.appendChild(allBtn);

  categories.forEach(cat=>{
    const btn = document.createElement("button");
    btn.className = "btn btn-outline btn-sm";
    btn.innerText = cat;
    btn.onclick = ()=> loadProducts(cat);
    container.appendChild(btn);
  });
}

async function loadProducts(category=""){
  showLoader(true);
  const url = category ? `${API}/category/${category}` : API;
  const res = await fetch(url);
  const products = await res.json();
  showLoader(false);
  displayProducts(products.slice(0,6));
}

function displayProducts(products){
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  products.forEach(product=>{
    const card = document.createElement("div");
    card.className = "card bg-base-100 shadow-md p-4";

    card.innerHTML = `
      <img src="${product.image}" class="h-40 object-contain mx-auto mb-3"/>
      <h3 class="font-bold truncate">${product.title}</h3>
      <p class="text-primary font-bold">$${product.price}</p>
      <span class="badge badge-outline mb-2">${product.category}</span>
      <p>⭐ ${product.rating.rate}</p>
      <div class="flex gap-2 mt-2">
        <button class="btn btn-sm btn-outline" onclick="openModal(${product.id})">Details</button>
        <button class="btn btn-sm btn-primary" onclick="addToCart(${product.id})">Add</button>
      </div>
    `;
    container.appendChild(card);
  });
}

async function openModal(id){
  const res = await fetch(`${API}/${id}`);
  const product = await res.json();
  currentProduct = product.id;

  document.getElementById("modal-title").innerText = product.title;
  document.getElementById("modal-image").src = product.image;
  document.getElementById("modal-description").innerText = product.description;
  document.getElementById("modal-price").innerText = product.price;
  document.getElementById("modal-rating").innerText = product.rating.rate;

  document.getElementById("productModal").showModal();
}

function closeModal(){
  document.getElementById("productModal").close();
}

async function addToCart(id){
  const res = await fetch(`${API}/${id}`);
  const product = await res.json();
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI(){
  document.getElementById("cart-count").innerText = cart.length;
}

function openCart(){
  const container = document.getElementById("cart-items");
  container.innerHTML = "";
  let total = 0;

  cart.forEach((item,index)=>{
    total += item.price;
    const div = document.createElement("div");
    div.className = "flex justify-between items-center mb-2";
    div.innerHTML = `
      <span class="truncate w-40">${item.title}</span>
      <span>$${item.price}</span>
      <button class="btn btn-xs btn-error" onclick="removeFromCart(${index})">X</button>
    `;
    container.appendChild(div);
  });

  document.getElementById("cart-total").innerText = total.toFixed(2);
  document.getElementById("cartModal").showModal();
}

function closeCart(){
  document.getElementById("cartModal").close();
}

function removeFromCart(index){
  cart.splice(index,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
  openCart();
}