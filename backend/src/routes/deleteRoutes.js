import { Router } from "express";
import { authorizationMiddleware } from "../middlewares/authorizationMiddleware.js";
import { deleteFuenteController, deleteIncomeController } from "../controllers/deleteController.js";

const deleteInitRoute = ()=>{
    const router = Router()
    router.delete("/fuente",authorizationMiddleware,deleteFuenteController)
    router.delete("/income",authorizationMiddleware,deleteIncomeController)
    return router
}
export default deleteInitRoute