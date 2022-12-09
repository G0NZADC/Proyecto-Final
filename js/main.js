
document.addEventListener('DOMContentLoaded', () => {

   let baseDeDatos = [
    { id: 1, nombre: "Multi GYM",  precio: 85000, imagen: './imag/imagen2.jpg' },
    { id: 3, nombre: "Cinta Eléctrica", precio: 270000, imagen: './imag/imagen3.jpg' },
    { id: 4, nombre: "Elíptico",  precio: 160000, imagen: './imag/imagen4.jpg' },
    { id: 5, nombre: "Mini Trampolin",   precio: 7500, imagen: './imag/imagen5.jpg' },
    { id: 6, nombre: "Bolsa de Peso 5kg",   precio: 6500, imagen: './imag/imagen6.jpg' },
    { id: 2, nombre: "Mancuerna Ajustable 25Kg",  precio: 25000, imagen: './imag/imagen1.jpg' },
    { id: 7, nombre: "Mancuerna Ajustable 7,5Kg", precio: 5000, imagen: './imag/imagen7.jpg' },
    { id: 8, nombre: "set Abdominales con soga", precio: 4800, imagen: './imag/imagen8.jpg' },
    { id: 9, nombre: "Banco de Abdominales",  precio: 59000,  imagen: './imag/imagen9.jpg' },
    { id: 10, nombre: "Pelota de Ejercicio 8Kg",   precio: 10000, imagen: './imag/imagen10.jpg' },
    { id: 11, nombre: "Disco para barra 11,3Kg",   precio: 7500, imagen: './imag/imagen11.jpg' },
    { id: 12, nombre: "Colchoneta protectora de piso",   precio: 7000, imagen: './imag/imagen12.jpg' },
    ];

    let carrito = [];
    let divisa = '$';
    let DOMitems = document.querySelector('#items');
    let DOMcarrito = document.querySelector('#carrito');
    let DOMtotal = document.querySelector('#total');
    let DOMbotonVaciar = document.querySelector('#boton-vaciar');
    let miLocalStorage = window.localStorage;
    
    // Productos
    
    function renderizarProductos() {
        
        baseDeDatos.forEach((info) => {
            
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
           
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
           
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
           
            const miNodoPrecio = document.createElement('p')
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${info.precio}${divisa}`
       
            const miNodoBoton = document.createElement('button')
            miNodoBoton.classList.add('btn', 'btn-primary')
            miNodoBoton.textContent = 'Agregar'
            miNodoBoton.setAttribute('marcador', info.id)
            miNodoBoton.addEventListener('click', agregarProductoAlCarrito)
        
            miNodoCardBody.appendChild(miNodoTitle)
            miNodoCardBody.appendChild(miNodoImagen)
            miNodoCardBody.appendChild(miNodoPrecio)
            miNodoCardBody.appendChild(miNodoBoton)
            miNodo.appendChild(miNodoCardBody)
            DOMitems.appendChild(miNodo)
        });
    }

    function agregarProductoAlCarrito(evento) {
        
        carrito.push(evento.target.getAttribute('marcador'))
        
        renderizarCarrito()
       
        guardarCarritoEnLocalStorage()
    }
    
     function renderizarCarrito() {
        
        DOMcarrito.textContent = ''
        
        const carritoSinDuplicados = [...new Set(carrito)]
        
        carritoSinDuplicados.forEach((item) => {
           
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                
                return itemBaseDatos.id === parseInt(item)
            })
           
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
               
                return itemId === item ? total += 1 : total
            }, 0)

            

            const miNodo = document.createElement('li')
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2')
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`

           

            const miBoton = document.createElement('button')
            miBoton.classList.add('btn', 'btn-danger', 'mx-4')
            miBoton.textContent = 'X'
            miBoton.style.marginLeft = '2rem'
            miBoton.dataset.item = item
            miBoton.addEventListener('click', borrarItemCarrito)
            miNodo.appendChild(miBoton)
            DOMcarrito.appendChild(miNodo)
        })

        DOMtotal.textContent = calcularTotal()
     }
    
     function borrarItemCarrito(evento) {
            
        const id = evento.target.dataset.item
        
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id
        })

        renderizarCarrito()
             
        guardarCarritoEnLocalStorage()

    }

    function calcularTotal() {
         
        return carrito.reduce((total, item) => {
            
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item)
            });
            
            return total + miItem[0].precio
        }, 0).toFixed(2)
    }

    
   
    
    function vaciarCarrito() {
        
        carrito = [];
    
        renderizarCarrito()

        localStorage.clear()

    }

    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito))
    }

    function cargarCarritoDeLocalStorage () {
      
        if (miLocalStorage.getItem('carrito') !== null) {
            
            carrito = JSON.parse(miLocalStorage.getItem('carrito'))
        }
    }

  
    DOMbotonVaciar.addEventListener('click', vaciarCarrito)

   
    cargarCarritoDeLocalStorage()
    renderizarProductos()
    renderizarCarrito()
}); 

