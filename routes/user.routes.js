import { Router } from "express";
const userRouter = Router()
userRouter.get('/users' , (req,res) =>{res.send({title : "get all users"})})
userRouter.get('/:id' , (req,res) =>{res.send({title : "get user by id"})})
userRouter.post('/users' , (req,res) =>{res.send({title : "create user"})})
userRouter.put('/users/:id' , (req,res) =>{res.send({title : "update user"})})
userRouter.delete('/users/:id' , (req,res) =>{res.send({title : "delete user"})})
export default userRouter;