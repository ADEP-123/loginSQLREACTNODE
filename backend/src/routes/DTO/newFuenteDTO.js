import {check} from "express-validator";

export const newFuenteDTO = [
    check("username")
    .notEmpty().withMessage("El username no puede estar vacio"),
    check("fuente")
    .notEmpty().withMessage("El nombre de la fuente no puede estar vacio"),
    check("descripcion")
    .notEmpty().withMessage("La descripcion no puede estar vacia")
]