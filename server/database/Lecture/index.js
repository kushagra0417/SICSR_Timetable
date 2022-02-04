import mongoose from "mongoose";

const LectureSchema=new mongoose.Schema({
    subjectName:{type:String,required:true},
    coursename:{type:String,required:true},
    confirmationStatus:{type:Boolean,required:true},
    duration:{type:Number,required:true},
    startTime:{type:Number,required:true},
    endTime:{type:Number,required:true},
    thoughtBy:{type:mongoose.Types.ObjectId,ref:"Users"}
},{
    timestamps:true,
})

export const LectureModel=mongoose.model("Lectures",LectureSchema);