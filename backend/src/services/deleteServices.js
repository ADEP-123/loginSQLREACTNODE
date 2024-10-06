import Fuentes from "../collections/fuentes.js"

export const deleteFuenteService = (id,user)=>{
    const fuenteObject = new Fuentes()
    const result = fuenteObject.deleteFuente(id,user)
    return result
}