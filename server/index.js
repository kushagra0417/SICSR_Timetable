require("dotenv").config();

//Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import session from "express-session";

//config
import routeConfig from "./config/route.config";


//microservices routes
import Auth from "./API/Auth"
import User from "./API/User"



//Database connection
import ConnectDB from "./database/connection"



const sicsr =express();
//applicaction middlewares
sicsr.use(express.json())
sicsr.use(express.urlencoded({extended:false})) 
sicsr.use(helmet())
sicsr.use(cors())
sicsr.use(passport.initialize());
sicsr.use(session({secret: "secret",

    resave: true,
    saveUninitialized: true
}));
sicsr.use(passport.session());

//passport configuration
routeConfig(passport)

//Application Routes  
sicsr.use("/auth",Auth);
sicsr.use("/user",User);

sicsr.get("/",(req,res)=> res.json({message:"Setup success"}));

sicsr.listen(5000,()=> ConnectDB().then(()=> console.log("Server is running")).catch(()=>console.log("Server is running but database connection is failde")));