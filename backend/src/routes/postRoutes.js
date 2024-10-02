import { Router } from "express";
import { newIncomeMiddlewareDTO, newUserMiddlewareDTO } from "../middlewares/middlewaresDTO.js";
import { postNewUserController, postNewIncomeController } from "../controllers/postControllers.js";
import { authorizationMiddleware } from "../middlewares/authorizationMiddleware.js";

const postInitRoute = () => {
    const router = Router()
    router.post("/user", newUserMiddlewareDTO, postNewUserController)
    router.post("/income", authorizationMiddleware, newIncomeMiddlewareDTO, postNewIncomeController)
    return router
}
export default postInitRoute