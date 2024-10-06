import { Router } from "express";
import { newFuenteMiddlewareDTO, newIncomeMiddlewareDTO, newOutcomeMiddlewareDTO, newUserMiddlewareDTO } from "../middlewares/middlewaresDTO.js";
import { postNewUserController, postNewIncomeController, postNewOutcomeController, postNewFuenteController } from "../controllers/postControllers.js";
import { authorizationMiddleware } from "../middlewares/authorizationMiddleware.js";

const postInitRoute = () => {
    const router = Router()
    router.post("/user", newUserMiddlewareDTO, postNewUserController)
    router.post("/income", authorizationMiddleware, newIncomeMiddlewareDTO, postNewIncomeController)
    router.post("/outcome", authorizationMiddleware, newOutcomeMiddlewareDTO, postNewOutcomeController)
    router.post("/fuente", authorizationMiddleware, newFuenteMiddlewareDTO, postNewFuenteController)
    return router
}
export default postInitRoute