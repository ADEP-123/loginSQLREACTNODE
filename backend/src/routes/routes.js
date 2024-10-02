import {Router} from 'express'
import { middlewareRateLimit } from '../middlewares/middlewareRateLimit.js';
import appToken from '../services/tokenGenerator.js';


const initAPIRoutes = ()=>{
    const router = Router();
    router.use("/login",middlewareRateLimit,appToken)
    // router.use("/login",(req,res)=>{
    //     res.send("hola")
    // })
    return router    
}

export default initAPIRoutes