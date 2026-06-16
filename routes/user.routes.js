import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";

import authorize from "../middlewares/auth.middleware.js";
const userRouter = Router()


userRouter.get('/' , authorize, getUsers)
userRouter.get('/:id' ,  getUser)
userRouter.post('/users' , (req,res) =>{res.send({title : "create user"})})
userRouter.put('/users/:id' , (req,res) =>{res.send({title : "update user"})})
userRouter.delete('/users/:id' , (req,res) =>{res.send({title : "delete user"})})
export default userRouter;