document.addEventListener('DOMContentLoaded', function() {
    // Función para renderizar los productos en el resumen del pedido
    function renderizarProductosPago() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const tbody = document.querySelector('.tabla-resumen tbody');
        const tfoot = document.querySelector('.tabla-resumen tfoot td:last-child');
        
        // Limpiar tabla
        tbody.innerHTML = '';
        
        // Calcular total
        let total = 0;
        
        // Agregar cada producto
        carrito.forEach(producto => {
            const subtotal = producto.precio * producto.cantidad;
            total += subtotal;
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>S/${subtotal.toFixed(2)}</td>
            `;
            tbody.appendChild(tr);
        });
        
        // Actualizar total
        tfoot.textContent = `S/${total.toFixed(2)}`;
    }

    // Llamar a la función para renderizar los productos y calcular el total
    renderizarProductosPago();

    // Función para manejar el envío del formulario
    const formularioPago = document.getElementById('formulario-pago');
    if (formularioPago) {
        formularioPago.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir el envío del formulario por defecto

            // Obtener los datos del formulario
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const direccion = document.getElementById('direccion').value.trim();
            const metodoPago = document.getElementById('metodo-pago').value;
            const comentarios = document.getElementById('comentarios').value.trim();

            // Validar campos requeridos
            if (!nombre || !email || !direccion || !metodoPago) {
                alert("Por favor, completa todos los campos requeridos.");
                return;
            }

            // Crear el objeto de datos del pedido
            const pedidoData = {
                nombre,
                email,
                direccion,
                metodoPago,
                comentarios,
                productos: [
                    { nombre: "Prime Video", cantidad: 1, precio: 17.00 } // Ejemplo de producto, puedes hacerlo dinámico
                ],
                total: 17.00
            };

            // Guardar los datos en localStorage
            localStorage.setItem('pedido', JSON.stringify(pedidoData));

            // Redirigir a la página de seguimiento de pedidos
            window.location.href = 'seguimiento-pedidos.html';
        });
    }

    // Función para mostrar las opciones de pago (Yape/Plin o Transferencia)
    function configurarOpcionesPago() {
        const metodoPago = document.getElementById('metodo-pago');
        const opcionesYapePlin = document.getElementById('opciones-yape-plin');
        const opcionesTransferencia = document.getElementById('opciones-transferencia');
        
        if (metodoPago) {
            metodoPago.addEventListener('change', function() {
                // Mostrar las opciones de pago según la selección
                if (this.value === 'yape-plin') {
                    opcionesYapePlin.style.display = 'block';
                    opcionesTransferencia.style.display = 'none';
                } else if (this.value === 'transferencia') {
                    opcionesYapePlin.style.display = 'none';
                    opcionesTransferencia.style.display = 'block';
                } else {
                    opcionesYapePlin.style.display = 'none';
                    opcionesTransferencia.style.display = 'none';
                }
            });
        }
    }

    // Llamar a la función de configurar opciones de pago
    configurarOpcionesPago();
});
