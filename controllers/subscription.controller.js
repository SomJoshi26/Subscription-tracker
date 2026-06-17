import Subscription from "../models/subscription.model.js";
import mongoose from "mongoose";
import { Client } from "@upstash/workflow";

const WorkflowClient = new Client({
  token: process.env.QSTASH_TOKEN,
});

export const createSubscription = async (req, res, next) => {
    try{
        const subscription = await Subscription.create( {
            ...req.body,
            user : req.user._id
        }

            
        );

      const { workflowRunId } =  await WorkflowClient.trigger({
  url: `${process.env.SERVER_URL}/api/v1/workflow/subscription/reminder`,
  body: {
    subscriptionId: subscription._id,
  },
});
        res.status(201).json({success : true ,data : subscription , workflowRunId });
    }catch(error){
        next(error);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try{
       if(req.user._id.toString() !== req.params.id){
        const error = new Error("You are not the owner of this subscription");
        error.statusCode = 401;
        throw error;
       }

       const subscriptions = await Subscription.find({user: new mongoose.Types.ObjectId(req.params.id)});

         res.status(200).json({success : true , data : subscriptions});
    } catch (error) {
        next(error);
    }
}