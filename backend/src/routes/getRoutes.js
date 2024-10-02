import { Router } from "express";
import { getIncomeController } from "../controllers/getController.js";

const getInitRoute = ()=>{
    const router = Router()
    router.get("/ingresos",getIncomeController)
    return router
}
export default getInitRoute