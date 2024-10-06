import Fuentes from "../collections/fuentes.js"

export const putnewFuenteService=(id,user,nombre,descripcion)=>{    
    const fuenteObject = new Fuentes()
    const result = fuenteObject.updateFuente(id,user,nombre,descripcion)
    return result
}
