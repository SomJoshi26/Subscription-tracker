import { Router } from "express";
import { signUp ,signIn, signOut } from "../controllers/auth.controller.js";
const authrouter = Router();

// Path : /api/v1/auth/sign-up (POST)
authrouter.post('/sign-up' , signUp);
// Path : /api/v1/auth/sign-in (POST)
authrouter.post('/sign-in' , signIn);
// Path : /api/v1/auth/sign-out (POST)
authrouter.post('/sign-out' , signOut);
export default authrouter;
