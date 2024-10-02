import Usuarios from "../collections/users.js";

export const getIncomesService=(id)=>{
    const userObject = new Usuarios()
    const result = userObject.getUserIncome(id)
    return result
}

export const getOutcomesService=(id)=>{
    const userObject = new Usuarios()
    const result = userObject.getUserOutcome(id)
    return result
}