import { config } from "dotenv";

config()

/* console.log(process.env.PORT);
console.log(process.env.DB_HOST);
console.log(process.env.c);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_DATABASE); */

export const PORT = process.env.PORT || 3000
export const DB_USER = process.env.PORT || "stiven"
export const DB_PASSWORD = process.env.PORT || "Stigmata14"
export const DB_HOST = process.env.PORT || 'localhost'
export const DB_DATABASE = process.env.PORT || 'sas'