// product.js - shows detail based on id from URL and products in localStorage
const params = new URLSearchParams(location.search);
const id = parseInt(params.get('id'));
const products = JSON.parse(localStorage.getItem('products')) || [];
const p = products.find(x=>x.id===id);
const el = document.getElementById('productDetail');

if(!p){
  el.innerHTML = '<div class="alert alert-warning">Producto no encontrado</div>';
} else {
  el.innerHTML = `
    <div class="row">
      <div class="col-md-6"><img src="${p.img}" class="img-fluid"></div>
      <div class="col-md-6">
        <h2>${p.name}</h2>
        <p class="text-muted">${p.category}</p>
        <h3>$${p.price}</h3>
        <p>Descripción de ejemplo. Añade más datos desde el panel admin.</p>
        <button id="buyNow" class="btn btn-primary">Añadir al carrito</button>
      </div>
    </div>
  `;
  document.getElementById('buyNow').onclick = ()=> {
    let cart = JSON.parse(localStorage.getItem('cart'))||[];
    const existing = cart.find(i=>i.id===p.id);
    if(existing) existing.qty++;
    else cart.push({id:p.id,name:p.name,price:p.price,qty:1});
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Producto agregado al carrito');
  }
}
