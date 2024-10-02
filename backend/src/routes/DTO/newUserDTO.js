import {check} from "express-validator";

export const newUserDTO = [
    check("username")
    .notEmpty().withMessage("El username no puede estar vacio")
    .isLength({ min: 8 }).withMessage("El username debe tener al menos 8 caracteres"),
    check("name")
    .notEmpty().withMessage("El nombre real del usuario no puede estar vacio"),
    check("password")
    .notEmpty().withMessage("La contraseña no puede estar vacia")
    .isLength({ min: 10 }).withMessage("La contraseña debe tener al menos 10 caracteres")
    .matches(/(?=(.*[a-z]){4,})/).withMessage("La contraseña debe tener al menos 4 letras minúsculas")
    .matches(/(?=(.*[A-Z]){4,})/).withMessage("La contraseña debe tener al menos 4 letras mayúsculas")
    .matches(/(?=(.*\d){2,})/).withMessage("La contraseña debe tener al menos 2 números")
]