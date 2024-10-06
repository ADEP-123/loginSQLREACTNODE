import Fuentes from "../collections/fuentes.js"
import Income from "../collections/income.js"

export const putnewFuenteService = (id, user, nombre, descripcion) => {
    const fuenteObject = new Fuentes()
    const result = fuenteObject.updateFuente(id, user, nombre, descripcion)
    return result
}

export const putIncomeService = (id, user, monto, fuente, metodo) => {
    const incomeObject = new Income()
    const result = incomeObject.updateIncome(id, user, monto, fuente, metodo)
    return result
}
