import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
export const signUp = async (req, res, next) => {

// Implement the sign-up logic here

const session = await mongoose.startSession();
session.startTransaction();

try{
    // create a new user 

    const {name , email , password} = req.body;

    // check if a user already  exists 
    const existingUser = await User.findOne({email}).session(session);

    if(existingUser){
      const error = new Error("User already exists with this email");
      error.status = 409;
      throw error;
    }

    // Hash the password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password , salt);

     const newUser = await User.create([{name , email , password : hashedPassword}] , {session});


     const token = jwt.sign({userId: newUser[0]._id}, process.env.JWT_SECRET, {expiresIn: "1h"});




    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
        success : true,
        message : "User created successfully",
       data : {
        user : newUser[0],
        token
       }
    })

}catch(error){
await session.abortTransaction();
session.endSession();
next(error);

}

}

export const signIn = async (req, res, next) => {
try{
const {email , password} = req.body;
// check if user exists
const user = await User.findOne({email});

if(!user){
    const error = new Error("User not found with this email");
    error.status = 404;
    throw error;

}

const isPasswordValid = await bcrypt.compare(password , user.password);
if(!isPasswordValid){
const error = new Error("Invalid password");
error.status = 401;
throw error;
}

const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

res.status(200).json({
    success : true,
    message : "User signed in successfully",
    data : {
        user,
        token
    }
});

}catch(error){
    next(error);
 
}
}


export const signOut = (req, res, next) => {}