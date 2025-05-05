/**
 * Clase controladora para la gestión de usuarios
 */
class UserControl {
    constructor() {
        this.users = [];
        this.nextId = 1;
        this.loadUsers();
    }

    /**
     * Carga los usuarios desde localStorage
     */
    loadUsers() {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            const parsedUsers = JSON.parse(storedUsers);
            this.users = parsedUsers.map(user => User.fromJSON(user));
            
            // Encontrar el ID más alto para el siguiente usuario
            if (this.users.length > 0) {
                const maxId = Math.max(...this.users.map(user => user.id));
                this.nextId = maxId + 1;
            }
        } else {
            // Crear un usuario administrador por defecto si no hay usuarios
            this.createDefaultAdmin();
        }
    }

    /**
     * Crea un usuario administrador por defecto
     */
    createDefaultAdmin() {
        const adminUser = new User(
            this.nextId++,
            'Administrador',
            'admin',
            'admin@example.com',
            'admin123'
        );
        this.users.push(adminUser);
        this.saveUsers();
    }

    /**
     * Guarda los usuarios en localStorage
     */
    saveUsers() {
        const usersToSave = this.users.map(user => user.toJSON());
        localStorage.setItem('users', JSON.stringify(usersToSave));
    }

    /**
     * Obtiene todos los usuarios
     * @returns {Array} - Lista de usuarios
     */
    getAllUsers() {
        return this.users;
    }

    /**
     * Obtiene un usuario por su ID
     * @param {number} id - ID del usuario a buscar
     * @returns {User|null} - Usuario encontrado o null si no existe
     */
    getUserById(id) {
        return this.users.find(user => user.id === parseInt(id)) || null;
    }

    /**
     * Busca un usuario por su nombre de usuario
     * @param {string} username - Nombre de usuario a buscar
     * @returns {User|null} - Usuario encontrado o null si no existe
     */
    getUserByUsername(username) {
        return this.users.find(user => user.username === username) || null;
    }

    /**
     * Verifica las credenciales de un usuario
     * @param {string} username - Nombre de usuario
     * @param {string} password - Contraseña
     * @returns {User|null} - Usuario si las credenciales son correctas, null en caso contrario
     */
    validateUser(username, password) {
        return this.users.find(
            user => user.username === username && user.password === password
        ) || null;
    }

    /**
     * Agrega un nuevo usuario
     * @param {string} name - Nombre completo
     * @param {string} username - Nombre de usuario
     * @param {string} email - Correo electrónico
     * @param {string} password - Contraseña
     * @returns {User} - Usuario creado
     */
    addUser(name, username, email, password) {
        // Verificar si el usuario ya existe
        if (this.getUserByUsername(username)) {
            throw new Error('El nombre de usuario ya está en uso');
        }

        const newUser = new User(this.nextId++, name, username, email, password);
        this.users.push(newUser);
        this.saveUsers();
        return newUser;
    }

    /**
     * Actualiza un usuario existente
     * @param {number} id - ID del usuario a actualizar
     * @param {string} name - Nombre completo
     * @param {string} username - Nombre de usuario
     * @param {string} email - Correo electrónico
     * @param {string} password - Contraseña (opcional)
     * @returns {User|null} - Usuario actualizado o null si no existe
     */
    updateUser(id, name, username, email, password) {
        const userToUpdate = this.getUserById(id);
        if (!userToUpdate) {
            return null;
        }

        // Verificar si el nombre de usuario está disponible (excepto para el mismo usuario)
        const existingUser = this.getUserByUsername(username);
        if (existingUser && existingUser.id !== parseInt(id)) {
            throw new Error('El nombre de usuario ya está en uso');
        }

        userToUpdate.update(name, username, email, password);
        this.saveUsers();
        return userToUpdate;
    }

    /**
     * Elimina un usuario
     * @param {number} id - ID del usuario a eliminar
     * @returns {boolean} - true si se eliminó correctamente, false si no se encontró
     */
    deleteUser(id) {
        const initialLength = this.users.length;
        this.users = this.users.filter(user => user.id !== parseInt(id));
        
        // Si se eliminó algún usuario, guardar los cambios
        if (this.users.length < initialLength) {
            this.saveUsers();
            return true;
        }
        return false;
    }

    /**
     * Busca usuarios por nombre o email
     * @param {string} searchTerm - Término de búsqueda
     * @returns {Array} - Lista de usuarios que coinciden con la búsqueda
     */
    searchUsers(searchTerm) {
        if (!searchTerm) {
            return this.getAllUsers();
        }
        
        searchTerm = searchTerm.toLowerCase();
        return this.users.filter(user => 
            user.name.toLowerCase().includes(searchTerm) || 
            user.email.toLowerCase().includes(searchTerm) ||
            user.username.toLowerCase().includes(searchTerm)
        );
    }

    /**
     * Agrega el usuario actual (del estudiante) al sistema
     * @param {string} studentName - Nombre del estudiante
     */
    addStudentUser(studentName) {
        // Verifica si ya existe un usuario con este nombre de usuario
        const username = studentName.toLowerCase().replace(/\s+/g, '');
        
        if (!this.getUserByUsername(username)) {
            this.addUser(
                studentName,
                username,
                `${username}@example.com`,
                'password123'
            );
        }
    }

    /**
     * Restablece la base de datos de usuarios
     */
    resetUsers() {
        this.users = [];
        this.nextId = 1;
        this.createDefaultAdmin();
    }
}