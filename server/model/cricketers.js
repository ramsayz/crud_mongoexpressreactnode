const express=require("express")
const mongoose=require("mongoose")

const cricketerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    centuries:{
        type:Number,
        required:true
    }

})

module.exports=mongoose.model("Cricketers",cricketerSchema)