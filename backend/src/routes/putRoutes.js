import { Router } from "express";
import { authorizationMiddleware } from "../middlewares/authorizationMiddleware.js";
import { putNewFuenteController } from "../controllers/putController.js";

const putInitRoute = () => {
    const router = Router()
    router.put("/fuente",authorizationMiddleware,putNewFuenteController)
    return router
}
export default putInitRoute