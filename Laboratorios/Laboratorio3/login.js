// Inicializar el controlador de usuarios
const userController = new UserControl();

// Agregar el usuario con el nombre del estudiante
// Reemplaza "Tu Nombre" con tu nombre real
userController.addStudentUser("Quispe López Carla Andrea");

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si ya hay una sesión iniciada
    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
        // Redirigir al dashboard si ya hay sesión iniciada
        window.location.href = 'dashboard.html';
    }

    // Manejar el formulario de login
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Validar credenciales
        const user = userController.validateUser(username, password);
        
        if (user) {
            // Guardar el usuario en la sesión
            localStorage.setItem('loggedUser', JSON.stringify(user));
            
            // Redirigir al dashboard
            window.location.href = 'dashboard.html';
        } else {
            loginError.textContent = 'Usuario o contraseña incorrectos';
        }
    });
});