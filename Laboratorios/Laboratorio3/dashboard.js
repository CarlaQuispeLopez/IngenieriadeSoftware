// Inicializar el controlador de usuarios
const userController = new UserControl();

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si hay una sesión iniciada
    const loggedUserJSON = localStorage.getItem('loggedUser');
    if (!loggedUserJSON) {
        // Redirigir al login si no hay sesión iniciada
        window.location.href = 'index.html';
        return;
    }

    const loggedUser = JSON.parse(loggedUserJSON);
    
    // Mostrar información del usuario logueado
    document.getElementById('currentUser').textContent = `Usuario: ${loggedUser.name}`;
    
    // Manejar el cierre de sesión
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('loggedUser');
        window.location.href = 'index.html';
    });

    // Elementos del DOM
    const usersList = document.getElementById('usersList');
    const userForm = document.getElementById('userForm');
    const formTitle = document.getElementById('formTitle');
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    
    // Cargar la lista de usuarios
    loadUsersList();
    
    // Manejar el formulario de usuarios
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userId = document.getElementById('userId').value;
        const name = document.getElementById('name').value;
        const username = document.getElementById('userUsername').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('userPassword').value;
        
        try {
            if (userId) {
                // Actualizar usuario existente
                userController.updateUser(userId, name, username, email, password);
            } else {
                // Crear nuevo usuario
                userController.addUser(name, username, email, password);
            }
            
            // Limpiar el formulario
            resetForm();
            
            // Recargar la lista de usuarios
            loadUsersList();
        } catch (error) {
            alert(error.message);
        }
    });
    
    // Manejar el botón de cancelar
    cancelBtn.addEventListener('click', function() {
        resetForm();
    });
    
    // Función para cargar la lista de usuarios
    function loadUsersList() {
        const users = userController.getAllUsers();
        usersList.innerHTML = '';
        
        users.forEach(user => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>
                    <button class="action-btn edit-btn" data-id="${user.id}">Editar</button>
                    <button class="action-btn delete-btn" data-id="${user.id}">Eliminar</button>
                </td>
            `;
            
            usersList.appendChild(row);
        });
        
        // Agregar event listeners a los botones de editar y eliminar
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                editUser(this.getAttribute('data-id'));
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                deleteUser(this.getAttribute('data-id'));
            });
        });
    }
    
    // Función para editar un usuario
    function editUser(id) {
        const user = userController.getUserById(id);
        if (user) {
            formTitle.textContent = 'Editar Usuario';
            document.getElementById('userId').value = user.id;
            document.getElementById('name').value = user.name;
            document.getElementById('userUsername').value = user.username;
            document.getElementById('email').value = user.email;
            document.getElementById('userPassword').value = '';
            saveBtn.textContent = 'Actualizar Usuario';
        }
    }
    
    // Función para eliminar un usuario
    function deleteUser(id) {
        if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
            userController.deleteUser(id);
            loadUsersList();
        }
    }
    
    // Función para resetear el formulario
    function resetForm() {
        formTitle.textContent = 'Agregar Usuario';
        userForm.reset();
        document.getElementById('userId').value = '';
        saveBtn.textContent = 'Guardar Usuario';
    }
});