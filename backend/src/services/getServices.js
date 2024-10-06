import Fuentes from "../collections/fuentes.js";
import Income from "../collections/income.js";
import Outcome from "../collections/outcome.js";
import Usuarios from "../collections/users.js";

export const getIncomesService=(id)=>{
    const incomeObject = new Income()
    const result = incomeObject.getUserIncome(id)
    return result
}

export const getOutcomesService=(id)=>{
    const outcomeObject = new Outcome()
    const result = outcomeObject.getUserOutcome(id)
    return result
}

export const getBalanceService=(id)=>{
    const userObject = new Usuarios()
    const result = userObject.getUserBalance(id)
    return result
}

export const getUsernameService=(id,pass)=>{
    const userObject = new Usuarios()
    const result = userObject.getUsername(id,pass)
    return result
}

export const getFuentesService=(id_usuario)=>{
    const fuenteObject = new Fuentes()
    const result = fuenteObject.getUserFuentes(id_usuario)
    return result
}