import { Router } from "express";
import { middlewareRateLimit } from "../middlewares/middlewareRateLimit.js";
import { newUserMiddlewareDTO } from "../middlewares/middlewaresDTO.js";
import { postNewUserController } from "../controllers/postControllers.js";

const postInitRoute = ()=>{
    const router = Router()
    router.post("/user",middlewareRateLimit,newUserMiddlewareDTO,postNewUserController)
    return router
}
export default postInitRoute