import { Router } from "express";
import { authorizationMiddleware } from "../middlewares/authorizationMiddleware.js";
import { putIncomeController, putNewFuenteController } from "../controllers/putController.js";

const putInitRoute = () => {
    const router = Router()
    router.put("/fuente",authorizationMiddleware,putNewFuenteController)
    router.put("/income",authorizationMiddleware,putIncomeController)
    return router
}
export default putInitRoute