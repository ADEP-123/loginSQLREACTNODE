import dotenv from "dotenv";

dotenv.config();

const config = {
    "server": JSON.parse(process.env.MY_CONFIG),
    "database": JSON.parse(process.env.MY_DATABASECONNECT)
}

export default config;