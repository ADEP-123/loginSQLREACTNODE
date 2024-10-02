import { Router } from "express";
import { getIncomeController, getOutcomesController } from "../controllers/getController.js";

const getInitRoute = ()=>{
    const router = Router()
    router.get("/ingresos",getIncomeController)
    router.get("/egresos",getOutcomesController)
    return router
}
export default getInitRoute