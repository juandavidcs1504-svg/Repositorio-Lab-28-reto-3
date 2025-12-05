// admin.js - allows adding products (stored in localStorage)
const form = document.getElementById('productForm');
const list = document.getElementById('adminList');

function renderAdmin(){
  const products = JSON.parse(localStorage.getItem('products')) || [];
  list.innerHTML = '';
  products.forEach((p, idx)=>{
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `${p.name} - $${p.price} <button class="btn btn-sm btn-danger" data-i="${idx}">Eliminar</button>`;
    list.appendChild(li);
  });
  document.querySelectorAll('[data-i]').forEach(b=>b.onclick=(e)=>{
    const i = parseInt(e.target.dataset.i);
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(i,1);
    localStorage.setItem('products', JSON.stringify(products));
    renderAdmin();
  });
}

form.onsubmit = (e)=>{
  e.preventDefault();
  const name = document.getElementById('pName').value.trim();
  const price = Number(document.getElementById('pPrice').value);
  const img = document.getElementById('pImg').value.trim() || 'assets/img/producto1.jpg';
  if(!name || !price) return alert('Llena nombre y precio');
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const id = products.length ? Math.max(...products.map(p=>p.id))+1 : 1;
  products.push({id,name,price,img,category:'Sin categoría'});
  localStorage.setItem('products', JSON.stringify(products));
  form.reset();
  renderAdmin();
  alert('Producto agregado. Vuelve a la home para ver los cambios.');
}

renderAdmin();
