import { Router } from 'express'
import { middlewareRateLimit } from '../middlewares/middlewareRateLimit.js';
import appToken from '../services/tokenGenerator.js';
import postInitRoute from './postRoutes.js';
import { authorizationMiddleware } from '../middlewares/authorizationMiddleware.js';
import getInitRoute from './getRoutes.js';
import valToken from '../services/valtoken.js';
import putInitRoute from './putRoutes.js';
import deleteInitRoute from './deleteRoutes.js';


const initAPIRoutes = () => {
    const router = Router();
    router.use("/login", middlewareRateLimit, appToken)
    router.use("/get", middlewareRateLimit, authorizationMiddleware, getInitRoute())
    router.use("/post", middlewareRateLimit, postInitRoute())
    router.use("/put",middlewareRateLimit,authorizationMiddleware,putInitRoute())
    router.use("/delete",middlewareRateLimit,authorizationMiddleware,deleteInitRoute())
    router.use("/valtoken",authorizationMiddleware,valToken)
    return router
}

export default initAPIRoutes