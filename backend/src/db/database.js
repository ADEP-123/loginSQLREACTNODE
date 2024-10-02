import mysql from "mysql2"
import config from "../config.js"

const con = mysql.createPool(config.database);

const getConnection = () =>{
    return con
}

export default getConnection