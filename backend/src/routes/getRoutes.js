import { Router } from "express";
import { getBalanceController, getIncomeController, getOutcomesController, getUsernameController } from "../controllers/getController.js";

const getInitRoute = ()=>{
    const router = Router()
    router.get("/ingresos",getIncomeController)
    router.get("/egresos",getOutcomesController)
    router.get("/balance",getBalanceController)
    router.get("/username",getUsernameController)
    return router
}
export default getInitRoute