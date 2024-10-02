import dotenv from "dotenv";

dotenv.config();

const config = {
    "server": JSON.parse(process.env.MY_CONFIG),
    "database": JSON.parse(process.env.MY_DATABASECONNECT),
    "jwktKey": process.env.API_JWT_PRIVATE_KEY
}

export default config;