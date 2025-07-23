document.getElementById('formulario-pago').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío tradicional del formulario

    // Obtener los valores del formulario
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

    // Obtener el carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Validar si hay productos en el carrito
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de proceder.");
        return;
    }

    // Crear el objeto de datos del pedido
    const pedidoData = {
        nombre,
        email,
        direccion,
        metodoPago,
        comentarios,
        productos: carrito, // Los productos del carrito
        total: carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0) // Total del pedido
    };

    // Guardar los datos del pedido en localStorage
    localStorage.setItem('pedido', JSON.stringify(pedidoData));

    // Construir el mensaje para WhatsApp con los detalles del pedido
    let mensaje = `
        Nuevo pago confirmado:
        - Nombre: ${pedidoData.nombre}
        - Correo: ${pedidoData.email}
        - Dirección: ${pedidoData.direccion}
        - Método de pago: ${pedidoData.metodoPago}
        - Comentarios: ${pedidoData.comentarios}
        - Productos: ${pedidoData.productos.map(producto => `${producto.nombre} x ${producto.cantidad} - S/${(producto.precio * producto.cantidad).toFixed(2)}`).join(', ')}
        - Total: S/${pedidoData.total.toFixed(2)}
    `;

    // Asegurarse de que el mensaje sea lo suficientemente corto para WhatsApp
    mensaje = mensaje.substring(0, 4000); // WhatsApp tiene un límite de 4000 caracteres para los mensajes

    // Enviar los datos a WhatsApp
    const url = `https://wa.me/51913550624?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank'); // Abrir WhatsApp en una nueva ventana
    localStorage.removeItem('carrito');

    // Redirigir a la página de seguimiento de pedidos
    window.location.href = 'seguimiento-pedidos.html';
});
