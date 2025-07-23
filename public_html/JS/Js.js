// Funcionalidad de registro
document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.getElementById('formRegistro');

    if (formRegistro) {
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = formRegistro.nombre.value.trim();
            const correo = formRegistro.correo.value.trim();
            const contrasena = formRegistro.contrasena.value.trim();

            if (!nombre || !correo || !contrasena) {
                alert("Por favor, complete todos los campos.");
                return;
            }

            // Obtener usuarios previamente registrados
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

            // Verificar si el correo ya está registrado
            const usuarioExistente = usuarios.find(u => u.correo === correo);
            if (usuarioExistente) {
                alert("Este correo ya está registrado.");
                return;
            }

            // Crear un nuevo usuario
            const nuevoUsuario = { nombre, correo, contrasena };

            // Agregar el nuevo usuario a la lista de usuarios
            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Guardar usuarios en localStorage

            alert("Registro exitoso. Ahora puedes iniciar sesión.");

            // Redirigir a la página de inicio de sesión
            setTimeout(() => {
                window.location.href = 'inicio-Sesion.html';  // Redirige a la página de login
            }, 2000); // Espera 2 segundos antes de redirigir
        });
    }
});

// Carrusel de productos
document.addEventListener("DOMContentLoaded", () => {
    const productosWrapper = document.querySelector(".productos-wrapper");
    const productos = document.querySelectorAll(".producto");
    const scrollSpeed = 1; // velocidad de desplazamiento
    let scrollPosition = 0;

    // Función para mover el carrusel
    function moverCarrusel() {
        productosWrapper.scrollLeft += scrollSpeed; // Desplazamiento de los productos

        // Verificar si se ha llegado al final y volver al principio
        if (productosWrapper.scrollLeft >= productosWrapper.scrollWidth / 2) {
            productosWrapper.scrollLeft = 0; // Volver al principio
        }

        // Llamar de nuevo a la función para hacer el desplazamiento continuo
        requestAnimationFrame(moverCarrusel);
    }

    // Iniciar movimiento
    moverCarrusel();
});

// Acordeón para mostrar/ocultar respuestas
document.addEventListener("DOMContentLoaded", function() {
    // Obtener todos los botones de acordeón
    const acordeones = document.querySelectorAll(".acordeon");

    // Añadir un evento 'click' a cada uno de los botones
    acordeones.forEach(button => {
        button.addEventListener("click", function() {
            // Alternar la visibilidad de la respuesta correspondiente
            const respuesta = this.nextElementSibling;

            // Alternar la clase 'activo' para animación (si quieres agregar animación)
            this.classList.toggle("activo");
            
            if (respuesta.style.display === "block") {
                respuesta.style.display = "none";  // Ocultar la respuesta
            } else {
                respuesta.style.display = "block"; // Mostrar la respuesta
            }
        });
    });
});

// Menú hamburguesa
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.getElementById('nav-list');

    // Agregar un evento de clic al botón del menú
    menuToggle.addEventListener('click', () => {
        // Alternar la clase 'show' que controla la visibilidad
        navList.classList.toggle('show');
    });
});

// Verificación de sesión activa (mostrar perfil y cerrar sesión)
document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    const nombreUsuario = document.getElementById('nombre-usuario');
    const btnLogout = document.getElementById('btn-logout');
    const navUsuario = document.getElementById('nav-usuario');
    const navLogin = document.getElementById('nav-login');

    // Si el usuario está logueado, mostrar su nombre y el botón de logout
    if (usuarioLogueado) {
        nombreUsuario.textContent = usuarioLogueado.nombre;
        navUsuario.style.display = 'block';  // Mostrar el perfil y botón de logout
        navLogin.style.display = 'none';    // Ocultar el botón de login
    } else {
        navUsuario.style.display = 'none';  // Ocultar el perfil y botón de logout
        navLogin.style.display = 'block';   // Mostrar el botón de login
    }

    // Lógica para cerrar sesión
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            localStorage.removeItem('usuarioLogueado');  // Eliminar el usuario del localStorage
            alert("Sesión cerrada");
            window.location.href = 'inicio-Sesion.html'; // Redirigir a la página de inicio de sesión
        });
    }
});

// Función para manejar el login
document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById('formLogin');

    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

            const correo = formLogin.correo.value.trim();
            const contrasena = formLogin.contrasena.value.trim();

            // Obtener los usuarios registrados desde localStorage
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

            // Verificar si el correo y la contraseña coinciden
            const usuario = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);
            
            if (usuario) {
                // Si el usuario existe, guardar su información en localStorage
                localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));

                // Redirigir al usuario a la página de inicio
                window.location.href = 'index.html'; // Redirigir a la página principal
            } else {
                alert("Correo o contraseña incorrectos.");
            }
        });
    }
});
