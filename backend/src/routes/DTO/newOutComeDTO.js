import {check} from "express-validator";

export const newOutComeDTO = [
    check("username")
    .notEmpty().withMessage("El username no puede estar vacio"),
    check("descripcion")
    .notEmpty().withMessage("El monto no puede estar vacio"),
    check("monto")
    .notEmpty().withMessage("El monto no puede estar vacio")
    .isFloat({ gt: 0 }).withMessage("El monto debe ser un número mayor que 0"),
    check("fuente")
    .notEmpty().withMessage("La fuente no puede estar vacia"),
    check("metodo")
    .notEmpty().withMessage("El metodo no puede estar vacio")
    .isIn(['Transferencia', 'Efectivo']).withMessage("El método debe ser Transferencia, Efectivo o Cheque")
]