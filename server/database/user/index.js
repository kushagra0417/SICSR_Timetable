import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    fullname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String},
    userType:{type:Boolean,required:true},
    phoneNumber:{type:Number,required:true},
    designation:{type:String,required:true}
},{
    timestamps:true,
})

UserSchema.statics.findByEmailAndPhone= async({email,phoneNumber})=>{
    // check whether email exist 
    const checkUserByEmail=await UserModel.findOne({email});
    const checkUserByPhone=await UserModel.findOne({phoneNumber})
    if (checkUserByEmail || checkUserByPhone){
        throw new Error("User already exist!");
    }

    return false;
}
UserSchema.statics.findByEmailAndPassword=async ({email,password})=>{
    //check wheather email exist
const user =await UserModel.findOne({email});
if (!user) throw new Error("User does not exist!!!");

//compare password 
const doesPasswordMatch=await bcrypt.compare(password,user.password);

if (!doesPasswordMatch) throw new Error("Invalid password !!!");


return user;
};




UserSchema.pre("save",function(next){
    const user=this;

    // password is modified 
    if (!user.isModified("password")) return next();

     // hash the password 
     bcrypt.genSalt(8,(error,salt)=>{
        
        if (error) return next(error);


        bcrypt.hash(user.password,salt,(error,hash)=>{
            if(error) return next(error);
            
            //assigning the hashed password 
            user.password=hash;
            return next();
        }); 
    
    });
     
});

UserSchema.methods.generateJwtToken=function(){

   //generate JWT token
  return jwt.sign({user: this._id.toString()},"SICSR");
}
export const UserModel=mongoose.model("Users",UserSchema);