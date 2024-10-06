import Income from "../collections/income.js";
import Outcome from "../collections/outcome.js";
import Usuarios from "../collections/users.js";

export const postNewUserService = (username, name, password) => {
    const userObject = new Usuarios();
    const result = userObject.createUser(username, name, password);
    return result
}

export const postNewIncomeService = (user, monto, fuente, metodo) => {
    const incomeObject = new Income();
    const result = incomeObject.postNewIncome(user, monto, fuente, metodo);
    return result
}

export const postNewOutcomeService = (user,descripcion, monto, fuente, metodo) => {
    const outcomeObject = new Outcome();
    const result = outcomeObject.postNewOutcome(user,descripcion, monto, fuente, metodo);
    return result
}