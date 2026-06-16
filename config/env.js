import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
console.log(process.env.PORT);

export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV;
export const DB_URI = process.env.DB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;