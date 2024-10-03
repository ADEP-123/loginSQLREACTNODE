import { Router } from "express";
import { newIncomeMiddlewareDTO, newOutcomeMiddlewareDTO, newUserMiddlewareDTO } from "../middlewares/middlewaresDTO.js";
import { postNewUserController, postNewIncomeController, postNewOutcomeController } from "../controllers/postControllers.js";
import { authorizationMiddleware } from "../middlewares/authorizationMiddleware.js";

const postInitRoute = () => {
    const router = Router()
    router.post("/user", newUserMiddlewareDTO, postNewUserController)
    router.post("/income", authorizationMiddleware, newIncomeMiddlewareDTO, postNewIncomeController)
    router.post("/outcome", authorizationMiddleware, newOutcomeMiddlewareDTO, postNewOutcomeController)
    return router
}
export default postInitRoute