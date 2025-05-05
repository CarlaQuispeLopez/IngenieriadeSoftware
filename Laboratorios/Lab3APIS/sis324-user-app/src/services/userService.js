const User = require('../models/User');

class UserService {
  constructor() {
    this.users = this.generateDemoUsers(3);
  }

  generateDemoUsers(quantity) {
   const demoUsers = [
      new User(
        1,
        "Quispe López Carla Andrea",  // username
        "123456",           // password
        "quispelopezcarla@gmail.com",  // email
        true               // isAdmin
      ),
      // Usuarios adicionales de ejemplo
      new User(
        2,
        "user2",
        "123",
        "user1@gmail.com",
        false
      ),
      new User(
        3,
        "user2",
        "1234",
        "user2@gmail.com",
        false
      )
    ];
    return demoUsers;
  }

  getAll() { return this.users; }
  getById(id) { return this.users.find(user => user.id === id); }

  create(userData) {
    const newUser = new User(
      this.users.length + 1,
      userData.username,
      userData.password,
      userData.email,
      userData.isAdmin || false
    );
    this.users.push(newUser);
    return newUser;
  }

  update(id, userData) {
    const user = this.getById(id);
    if (!user) return null;
    Object.assign(user, userData);
    return user;
  }

  delete(id) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
}

module.exports = UserService;