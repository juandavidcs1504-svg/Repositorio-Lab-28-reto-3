// Application logic: dynamic products, cart, animations, localStorage, optional Firebase hooks

const initialProducts = [
  {id:1,name:'Vestido de Noche',price:299,img:'assets/img/producto1.jpg',category:'Vestidos'},
  {id:2,name:'Reloj Clásico',price:450,img:'assets/img/producto2.jpg',category:'Accesorios'},
  {id:3,name:'Zapatillas Premium',price:180,img:'assets/img/producto3.jpg',category:'Calzado'},
  {id:4,name:'Bolso de Diseñador',price:520,img:'assets/img/producto4.jpg',category:'Bolsos'}
];

// Use localStorage to persist products (admin can add)
let products = JSON.parse(localStorage.getItem('products')) || initialProducts;
localStorage.setItem('products', JSON.stringify(products));

const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartItemsBox = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');

let cart = JSON.parse(localStorage.getItem('cart'))||[];

function renderProducts(){
  productsGrid.innerHTML = '';
  products.forEach(p=>{
    const col = document.createElement('div');
    col.className = 'col-sm-6 col-lg-3';
    col.innerHTML = `
      <div class="card product-card h-100">
        <img src="${p.img}" class="card-img-top" alt="${p.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.name}</h5>
          <p class="mb-2 text-muted">${p.category}</p>
          <div class="mt-auto d-flex gap-2">
            <button class="btn btn-outline-primary btn-sm view-btn" data-id="${p.id}">Ver</button>
            <button class="btn btn-primary btn-sm add-btn" data-id="${p.id}">Añadir - $${p.price}</button>
          </div>
        </div>
      </div>
    `;
    productsGrid.appendChild(col);
  });

  // attach listeners
  document.querySelectorAll('.add-btn').forEach(b=>b.onclick=(e)=>addToCart(parseInt(e.target.dataset.id)));
  document.querySelectorAll('.view-btn').forEach(b=>b.onclick=(e)=>openProductModal(parseInt(e.target.dataset.id)));
}

function addToCart(id){
  const p = products.find(x=>x.id===id);
  if(!p) return;
  const existing = cart.find(i=>i.id===id);
  if(existing) existing.qty++;
  else cart.push({id:p.id,name:p.name,price:p.price,qty:1});
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function renderCart(){
  cartItemsBox.innerHTML='';
  let total=0;
  cart.forEach((it,idx)=>{
    total += it.price * it.qty;
    const div = document.createElement('div');
    div.className='cart-item';
    div.innerHTML = `<div>${it.name} x${it.qty}</div><div>$${it.price*it.qty} <button class="btn btn-sm btn-link text-danger remove-btn" data-i="${idx}">Eliminar</button></div>`;
    cartItemsBox.appendChild(div);
  });
  document.querySelectorAll('.remove-btn').forEach(b=>b.onclick=(e)=>{ removeFromCart(parseInt(e.target.dataset.i)); });
  cartTotalEl.textContent = total;
  cartCount.textContent = cart.reduce((s,i)=>s+i.qty,0);
  localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(i){
  cart.splice(i,1);
  renderCart();
}

cartBtn.onclick = ()=> cartSidebar.classList.add('open');
closeCart.onclick = ()=> cartSidebar.classList.remove('open');

function openProductModal(id){
  // navigate to product page for detail (simple)
  window.location.href = 'product.html?id='+id;
}

// Dark mode toggle
document.getElementById('dark-btn').onclick = ()=> document.body.classList.toggle('bg-dark');

// Login modal
document.getElementById('loginBtn').onclick = ()=> {
  const modal = new bootstrap.Modal(document.getElementById('loginModal'));
  modal.show();
}

// Checkout button (demo)
document.getElementById('checkoutBtn').onclick = ()=> {
  alert('Checkout demo - total: $'+cart.reduce((s,i)=>s+i.price*i.qty,0));
  cart = [];
  renderCart();
}

// initial render
renderProducts();
renderCart();
