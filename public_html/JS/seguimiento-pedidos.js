document.addEventListener('DOMContentLoaded', function () {
    // Obtener los datos del pedido desde localStorage
    const pedidoData = JSON.parse(localStorage.getItem('pedido'));

    if (pedidoData) {
        // Mostrar detalles del pedido
        const pedidoId = document.querySelector('.pedido-header h3');
        const fechaPedido = document.querySelector('.fecha-pedido');
        const listaProductos = document.querySelector('.lista-productos');
        const totalPedido = document.querySelector('.pedido-total strong');

        pedidoId.textContent = `Pedido #${pedidoData.id || '001'}`;  // Asegúrate de que el ID sea dinámico
        fechaPedido.textContent = pedidoData.fecha || new Date().toLocaleDateString();  // Si tienes la fecha guardada en el pedido, reemplázala por pedido.fecha

        // Limpiar la lista de productos (eliminar el predeterminado)
        listaProductos.innerHTML = '';

        // Verificar si hay productos en el pedido
        if (pedidoData.productos && pedidoData.productos.length > 0) {
            // Agregar productos del pedido
            pedidoData.productos.forEach(producto => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="producto-nombre">${producto.nombre}</span>
                    <span class="producto-cantidad">${producto.cantidad} x S/${producto.precio}</span>
                    <span class="producto-subtotal">S/${(producto.cantidad * producto.precio).toFixed(2)}</span>
                `;
                listaProductos.appendChild(li);
            });

            // Mostrar el total
            totalPedido.textContent = `S/${pedidoData.total.toFixed(2)}`;
        } else {
            // Si no hay productos en el pedido, mostrar un mensaje o eliminar el área de productos
            listaProductos.innerHTML = '<p>No hay productos en este pedido.</p>';
            totalPedido.textContent = 'S/0.00';
        }

        // Mostrar los detalles del cliente si es necesario
        const detallesCliente = document.createElement('div');
        detallesCliente.innerHTML = `
            <p><strong>Nombre:</strong> ${pedidoData.nombre}</p>
            <p><strong>Email:</strong> ${pedidoData.email}</p>
            <p><strong>Dirección:</strong> ${pedidoData.direccion}</p>
        `;
        document.querySelector('.pedido-detalle').appendChild(detallesCliente);
    } else {
        alert('No se encontró el pedido.');
    }
});
