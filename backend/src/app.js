import express from "express"
import cors from 'cors'
import initAPIRoutes from "./routes/routes.js";

const appExpress = express();
appExpress.use(express.json())
appExpress.use(cors())
appExpress.use("/contAPP",initAPIRoutes())

export default appExpress