import { Router } from "express";

const authrouter = Router();
authrouter.post('/sign-up' , (req,res) =>{res.send({title : "signup"})})
authrouter.post('/sign-in' , (req,res) =>{res.send({title : "signin"})})
authrouter.post('/sign-up' , (req,res) =>{res.send({title : "signout"})})
export default authrouter;
