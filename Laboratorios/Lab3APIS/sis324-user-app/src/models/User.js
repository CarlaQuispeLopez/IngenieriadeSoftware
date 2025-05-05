class User {
  constructor(id, username, password, email = null, isAdmin = false) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.isAdmin = isAdmin;
    this.createdAt = new Date();
  }
}

module.exports = User;