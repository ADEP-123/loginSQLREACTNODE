import { Router } from "express";
import { authorizationMiddleware } from "../middlewares/authorizationMiddleware.js";
import { deleteFuenteController } from "../controllers/deleteController.js";

const deleteInitRoute = ()=>{
    const router = Router()
    router.delete("/fuente",authorizationMiddleware,deleteFuenteController)
    return router
}
export default deleteInitRoute