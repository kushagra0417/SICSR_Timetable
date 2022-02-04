// Libraries
import  express  from "express";
import passport from "passport";


// Database model

import {UserModel} from  "../../database/allModels"

// Validation 
import { ValidateId } from "../../validation/id";

const Router=express.Router();

/*
Route    /
Des      Get mySlef  data
Params   none
BODY     none
Access   private 
Method   GET
*/
Router.get("/",passport.authenticate("jwt"),async(req,res)=>{
    try {
        // const{_id}=req.session.passport.user._doc;
        await ValidateId({_id:req.session.passport.user._doc._id.toString()});
        
        const {email,fullname,phoneNumber,designation}=req.session.passport.user._doc;
        // const getUser=await UserModel.findById(_id);

        return res.json({user: {email,fullname,phoneNumber,designation}});

    } catch (error) {
         return res.status(500).json({error:error.message})
    }

})

/*
Route    /:_id
Des      Get user data
Params   _id
BODY     none
Access   public 
Method   GET
*/

Router.get("/:_id",async(req,res)=>{
    try {
       
        await ValidateId(req.params);
          const{_id}=req.params;
    
         const getUser=await UserModel.findById(_id);
         const{fullname}=getUser
        return res.json({user:{fullname}});

    } catch (error) {
         return res.status(500).json({error:error.message})
    }

})

/*
Route    /update
Des      Update user id
Params   userId
BODY     user data
Access   public 
Method   PUT
*/

Router.put("/update/:_id",async(req,res)=>{
try {
    await ValidateId(req.params);
    const{_id}=req.params;
    const {userData}=req.body;
    const updateUserData=await UserModel.findByIdAndUpdate(_id,{
        $set:userData,
    },{
        new:true
    });
    return res.json({ user: updateUserData });
   

} catch (error) {
    return res.status(500).json({error:error.message})
}
})

Router.delete("/delete/:_id",async(req,res)=>{
    await ValidateId(req.params);
    const{_id}=req.params;
    await UserModel.findByIdAndDelete(_id);
    return res.json({ message:"user deleted" });
})


export default Router