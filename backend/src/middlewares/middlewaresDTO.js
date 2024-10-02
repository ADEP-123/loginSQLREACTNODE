import { validationResult } from "express-validator";
import { Router } from "express";
import { newUserDTO } from "../routes/DTO/newUserDTO.js";
import { newIncomeDTO } from "../routes/DTO/newIncomeDTO.js";

function validador(req, res, next) {
    const errors = validationResult(req);
    let errores = [];
    errors.errors.forEach(element => {
        errores.push(element.msg)
    });
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores })
    } else next()
}

export const newUserMiddlewareDTO = Router();
newUserMiddlewareDTO.use(newUserDTO,(req,res,next)=>{
    validador(req,res,next)
})

export const newIncomeMiddlewareDTO = Router();
newIncomeMiddlewareDTO.use(newIncomeDTO,(req,res,next)=>{
    validador(req,res,next)
})