document.addEventListener('DOMContentLoaded', function() {
    // Función para enviar baucher de pago a WhatsApp
    const enviarBaucherBtns = document.querySelectorAll('#enviar-baucher');
    
    enviarBaucherBtns.forEach((btn) => {
        btn.addEventListener('click', function() {
            const pedidoId = this.getAttribute('data-pedido-id');
            const mensaje = `¡Hola! Soy cliente de "La Tiendita de LP". Aquí está mi baucher de pago para el pedido #${pedidoId}:\n\n`;

            // Puedes incluir más detalles si los tienes almacenados en el pedido
            const detallesPedido = `
                Producto: Prime Video\n
                Total: S/17.00\n
            `;

            const mensajeFinal = encodeURIComponent(mensaje + detallesPedido);
            window.open(`https://wa.me/51913550624?text=${mensajeFinal}`, '_blank');
        });
    });
});
