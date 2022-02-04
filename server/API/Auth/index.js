// Library
import express from "express"

const Router = express.Router();

// validation
import { ValidateSignup ,ValidateSignin } from "../../validation/auth";


// Models
import {UserModel} from "../../database/allModels";


/*
Route:     /signup
description :  Signup with email and password
params : none
Access: Public
Method :post
*/

Router.post("/signup",async(req,res)=>{
try {
    await ValidateSignup(req.body.credentials);
    
   await UserModel.findByEmailAndPhone(req.body.credentials)
       // save to DB
       const newUser=await UserModel.create(req.body.credentials);

       //generate JWT token
       const token=newUser.generateJwtToken();
    // return 
return res.status(200).json({token,staus:"success"});
} catch (error) {
    return res.status(500).json({error:error.message});
}
})

/*
Route   /signin
Des     Signin with email and password
Params  none
Access  public 
Method post
*/

Router.post("/signin",async(req,res)=>{
    try {
       await ValidateSignin(req.body.credentials);
       const user= await UserModel.findByEmailAndPassword(req.body.credentials);
    
       

        //generate JWT token
        const token=user.generateJwtToken();

        // return
       return res.status(200).json({token,status:"Success"})
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});

export default Router;