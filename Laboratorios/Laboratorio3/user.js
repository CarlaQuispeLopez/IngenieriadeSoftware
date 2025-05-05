/**
 * Clase que representa a un usuario en el sistema
 */
class User {
  /**
   * Constructor de la clase User
   * @param {number} id - Identificador único del usuario
   * @param {string} name - Nombre completo del usuario
   * @param {string} username - Nombre de usuario para el login
   * @param {string} email - Correo electrónico del usuario
   * @param {string} password - Contraseña del usuario
   */
  constructor(id, name, username, email, password) {
      this.id = id;
      this.name = name;
      this.username = username;
      this.email = email;
      this.password = password;
  }

  /**
   * Actualiza los datos del usuario
   * @param {string} name - Nombre completo del usuario
   * @param {string} username - Nombre de usuario para el login
   * @param {string} email - Correo electrónico del usuario
   * @param {string} password - Contraseña del usuario
   */
  update(name, username, email, password) {
      this.name = name;
      this.username = username;
      this.email = email;
      if (password) {
          this.password = password;
      }
  }

  /**
   * Convierte el objeto a un formato JSON simple
   * @returns {Object} - Objeto con los datos del usuario
   */
  toJSON() {
      return {
          id: this.id,
          name: this.name,
          username: this.username,
          email: this.email,
          password: this.password
      };
  }

  /**
   * Crea una instancia de User a partir de un objeto JSON
   * @param {Object} json - Objeto con los datos del usuario
   * @returns {User} - Nueva instancia de User
   */
  static fromJSON(json) {
      return new User(
          json.id,
          json.name,
          json.username,
          json.email,
          json.password
      );
  }
}