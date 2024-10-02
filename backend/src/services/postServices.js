import Usuarios from "../collections/users.js";

export const postNewUserService = (username, name, password) => {
    const userObject = new Usuarios();
    const result = userObject.createUser(username, name, password);
    return result
}

export const postNewIncomeService = (user, monto, fuente, metodo) => {
    const userObject = new Usuarios();
    const result = userObject.postNewIncome(user, monto, fuente, metodo);
    return result
}