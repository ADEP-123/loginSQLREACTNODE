import {check} from "express-validator";

export const newOutComeDTO = [
    check("username")
    .notEmpty().withMessage("El username no puede estar vacio"),
    check("descripcion")
    .notEmpty().withMessage("El monto no puede estar vacio"),
    check("monto")
    .notEmpty().withMessage("El monto no puede estar vacio"),
    check("fuente")
    .notEmpty().withMessage("La fuente no puede estar vacia"),
    check("metodo")
    .notEmpty().withMessage("El metodo no puede estar vacio")
    .isIn(['Transferencia', 'Efectivo']).withMessage("El método debe ser Transferencia, Efectivo o Cheque")
]