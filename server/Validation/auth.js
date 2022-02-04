import joi from "joi";


export const ValidateSignup=(userData)=>{
    const Schema=joi.object({
        fullname:joi.string().required().min(5),
        email:joi.string().email().required(),
        password:joi.string().min(5),
        userType:joi.boolean().required(),
        phoneNumber:joi.number().required(),
        designation:joi.string().required(),

    });
    
    return Schema.validateAsync(userData);

};

export const ValidateSignin=(userData)=>{
    const Schema=joi.object({
        
        email:joi.string().email().required(),
        password:joi.string().min(5).required(),
       

    });
    
    return Schema.validateAsync(userData);

};