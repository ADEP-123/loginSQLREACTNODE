import express from "express"

const appExpress = express();
appExpress.use(express.json())

export default appExpress