import { getProducts } from "./firebase.js";

const renderCards = async (productsArr) => {
    
    const products = await productsArr;

    const card = document.querySelector('.card')


    products.forEach(product => {
        
        const card = document.createElement('div') 

        card.className = 'card col-6';

        card.innerHTML = `
  
        <div class="card-body">
          
            <h5 class="card-title">${product.data().name}</h5>
          
            <p class="card-text">${product.data().price}</p>
          
            <a href="#" class="btn btn-primary">Buy</a>
        
        </div>
        
        `;

    });

}

renderCards(getProducts());

const Clickbutton = document.querySelectorAll('button')

const tbody = document.querySelector('.tbody')

let carrito = []

Clickbutton.forEach(btn => {

    btn.addEventListener('click', addToCarritoItem)

})

function addToCarritoItem(e){

    const button = e.target

    const item = button.closest('.card')

    const itemTitle = item.querySelector('.card-title').textContent;

    const itemPrice = item.querySelector('.precio').textContent;

    const itemImg = item.querySelector('.card-img-top').src;
    
    const newItem = {

        title: itemTitle,

        precio: itemPrice,

        img: itemImg,

        cantidad: 1
    }

    addItemCarrito(newItem)
}

function addItemCarrito(newItem){

    const inputElemento = tbody.getElementsByClassName('input__elemento')

    for(let i =0; i < carrito.length; i++){
       
        if(carrito[i].title.trim() === newItem.title.trim()){
       
            carrito[i].cantidad ++;
       
            const inputValue = inputElemento[i]
       
            inputValue.value++;
       
            CarritoTotal()
       
            return null;
        }
    }

    carrito.push(newItem)
    
    renderCarrito()
}

function renderCarrito(){
    
    tbody.innerHTML = ''
    
    carrito.map(item => {
    
        const tr = document.createElement('tr')
    
        tr.classList.add('ItemCarrito')
    
        const Content = `

        <th scope="row">1</th>
    
        <td class="table__productos">
    
        <img src=${item.img} alt="">
    
        <h6 class="title">${item.title}</h6>
    
        </td>
    
        <td class="table__price"><p>${item.precio}</p></td>
    
        <td class="table__cantidad">
    
        <input type="number" min="1" value=${item.cantidad} class="input__elemento">
    
        <button class="delete btn btn-danger">X</button>
    
        </td>
        
        `;
        
        tr.innerHTML = Content;
        
        tbody.append(tr)

        tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
        
        tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)

    })
    
    CarritoTotal()
    
}

function CarritoTotal(){
    
    let Total = 0;
    
    const itemCartTotal = document.querySelector('.itemCartTotal')
    
    carrito.forEach((item) => {
    
        const precio = Number(item.precio.replace("$", ''))
    
        Total = Total + precio*item.cantidad
    
    })

    itemCartTotal.innerHTML = `Total $${Total}`
    
    addLocalStorage()

}

function removeItemCarrito(e){
    
    const buttonDelete = e.target
    
    const tr = buttonDelete.closest(".ItemCarrito")
    
    const title = tr.querySelector('.title').textContent;
    
    for(let i=0; i<carrito.lenght ; i++){
       
        if(carrito[i].title.trim() === title.trim()){
    
            carrito.splice(i, 1)
            
        }
    }
    
    tr.remove()
    
    CarritoTotal()

}

function sumaCantidad(e){
   
    const sumaInut = e.target
   
    const tr = sumaInut.closest(".ItemCarrito")
   
    const title = tr.querySelector('.title').textContent;
   
    carrito.forEach(item => {
   
        if(item.title.trim() === title){
   
            sumaInut.value < 1 ? (sumaInut.value = 1) : sumaInut.value;
   
            item.cantidad = sumaInut.value;
   
            CarritoTotal()

        }
   
    })

}

function addLocalStorage(){
 
    localStorage.setItem('carrito', JSON.stringify(carrito))

}

window.onload = function(){

    const storage = JSON.parse(localStorage.getItem('carrito'));

    if(storage){

        carrito = storage;

        renderCarrito()

    }

}

