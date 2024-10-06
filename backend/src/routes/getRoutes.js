import { Router } from "express";
import { getBalanceController, getFuenteController, getIncomeController, getOutcomesController, getUsernameController } from "../controllers/getController.js";

const getInitRoute = ()=>{
    const router = Router()
    router.get("/ingresos",getIncomeController)
    router.get("/egresos",getOutcomesController)
    router.get("/balance",getBalanceController)
    router.get("/username",getUsernameController)
    router.get("/fuentes",getFuenteController)
    return router
}
export default getInitRoute