import {Router} from 'express'
import { middlewareRateLimit } from '../middlewares/middlewareRateLimit.js';
import appToken from '../services/tokenGenerator.js';
import postInitRoute from './postRoutes.js';


const initAPIRoutes = ()=>{
    const router = Router();
    router.use("/login",middlewareRateLimit,appToken)
    router.use("/post",postInitRoute())
    return router    
}

export default initAPIRoutes