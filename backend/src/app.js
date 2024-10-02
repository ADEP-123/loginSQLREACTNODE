import express from "express"
import initAPIRoutes from "./routes/routes.js";

const appExpress = express();
appExpress.use(express.json())
appExpress.use("/contAPP",initAPIRoutes())

export default appExpress