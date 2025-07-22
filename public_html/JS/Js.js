document.addEventListener("DOMContentLoaded", () => {

  //==================
  // Variables globales para el nav usuario y login
  //==================
  const navUsuario = document.getElementById('nav-usuario');
  const btnLogout = document.getElementById('btn-logout');
  const navLoginLi = document.getElementById('nav-login'); // ID que debe tener el <li> del login

  //==================
  // Funciones para manejo de usuarios en localStorage
  //==================
  function obtenerUsuarios() {
    const usuarios = localStorage.getItem('usuarios');
    return usuarios ? JSON.parse(usuarios) : [];
  }

  function guardarUsuarios(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }

  //==================
  // Login y Mostrar Usuario Logueado en el Navegador
  //==================
  const formLogin = document.getElementById('formLogin');

  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();

      const correo = formLogin.correo.value.trim();
      const contrasena = formLogin.contrasena.value.trim();

      if (!correo || !contrasena) {
        alert("Por favor, complete ambos campos.");
        return;
      }

      const usuarios = obtenerUsuarios();
      const usuarioValido = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);  // Validación

      if (usuarioValido) {
        alert("Inicio de sesión exitoso. ¡Bienvenido!");
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioValido));  // Guardamos el usuario logueado

        // Redirigir a la página principal
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 2000); // Espera 2 segundos antes de redirigir
      } else {
        alert("Correo o contraseña incorrectos.");
      }
    });
  }

  //==================
  // Mostrar usuario logueado en nav
  //==================
  function mostrarUsuarioEnNav() {
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));

    if (usuarioLogueado) {
      navUsuario.style.display = 'inline-flex';
      document.getElementById('nombre-usuario').textContent = usuarioLogueado.nombre || usuarioLogueado.correo;
      if (navLoginLi) navLoginLi.style.display = 'none';
    } else {
      navUsuario.style.display = 'none';
      if (navLoginLi) navLoginLi.style.display = 'list-item';
    }
  }

  mostrarUsuarioEnNav();

  //==================
  // Logout
  //==================
  btnLogout.addEventListener('click', () => {
    localStorage.removeItem('usuarioLogueado');
    if (navLoginLi) navLoginLi.style.display = 'list-item';
    navUsuario.style.display = 'none';
  });

});
