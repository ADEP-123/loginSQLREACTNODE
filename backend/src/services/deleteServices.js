import Fuentes from "../collections/fuentes.js"
import Income from "../collections/income.js"

export const deleteFuenteService = (id,user)=>{
    const fuenteObject = new Fuentes()
    const result = fuenteObject.deleteFuente(id,user)
    return result
}

export const deleteIncomeService = (id,user)=>{
    const incomeObject = new Income()
    const result = incomeObject.deleteIncome(id,user)
    return result
}