import {Router} from "express";
const subscriptionRouter = Router();
subscriptionRouter.get('/' , (req,res) =>{res.send({title : "GET all subscriptions"})})

subscriptionRouter.get('/:id' , (req,res) =>{res.send({title : "GET subscription by id"})})

subscriptionRouter.post('/' , (req,res) =>{res.send({title : "CREATE subscription"})})

subscriptionRouter.put('/:id' , (req,res) =>{res.send({title : "UPDATE subscription"})})

subscriptionRouter.delete('/:id' , (req,res) =>{res.send({title : "DELETE subscription"})})

subscriptionRouter.put('/:id/cancel' , (req,res) =>{res.send({title : "CANCEL subscription"})})

subscriptionRouter.get('/:id/renew' , (req,res) =>{res.send({title : "GET the subscription renewals"})})
export default subscriptionRouter;