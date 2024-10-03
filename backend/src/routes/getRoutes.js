import { Router } from "express";
import { getBalanceController, getIncomeController, getOutcomesController } from "../controllers/getController.js";

const getInitRoute = ()=>{
    const router = Router()
    router.get("/ingresos",getIncomeController)
    router.get("/egresos",getOutcomesController)
    router.get("/balance",getBalanceController)
    return router
}
export default getInitRoute