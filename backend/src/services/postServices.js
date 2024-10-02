import Usuarios from "../collections/users.js";

export const postNewUserService = (username, name, password) => {
    const userObject = new Usuarios();
    const result = userObject.createUser(username,name,password);
    return result
}