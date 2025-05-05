const User = require('./user');



class UserService {

    constructor() {

        this.userList = [];

        this.generateRandomUsers(3);

    }



    generateRandomUsers(count) {

        for (let i = 0; i < count; i++) {

            const id = i + 1;

            const username = `user${id}`;

            const password = Math.random().toString(36).slice(-8);

            this.addUser(new User(id, username, password));

        }

    }



    getUsers() {

        return this.userList;

    }



    addUser(user) {

        this.userList.push(user);

    }



    editUser(id, updatedUser) {

        const index = this.userList.findIndex(user => user.id === id);

        if (index !== -1) {

            this.userList[index] = { ...this.userList[index], ...updatedUser };

            return true;

        }

        return false;

    }



    deleteUser(id) {

        const initialLength = this.userList.length;

        this.userList = this.userList.filter(user => user.id !== id);

        return this.userList.length !== initialLength;

    }

}



module.exports = UserService;