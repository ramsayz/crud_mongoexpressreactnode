const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const app=express()
const Cricketers=require("./model/cricketers")

app.use(express.json())
app.use(cors())


mongoose.connect("Paste the url from mongo db atlas / database",{useNewUrlParser:true})
const conn=mongoose.connection
conn.on("on",()=>{
    console.log("Connected../../../../../")
})

app.post("/insert",async(req,res)=>{
    console.log(req.body.name)
    const cric1=new Cricketers({
        name:req.body.name,
        country:req.body.country,
        centuries:parseInt(req.body.centuries)
    })
    try{
       const c1= await cric1.save()
       res.json(c1)

    }catch(err){
        res.send("Error "+err)
    }
})

app.get("/display",(req,res)=>{
    Cricketers.find({},(err,result)=>{
        if(err){
            res.send("<h6>Error not found</h6>")
        }else{
            res.json(result)
        }
    })
})

app.put("/update",async(req,res)=>{
    const c2=await Cricketers.findById(req.body.id)
    try{
    c2.name=req.body.updatedName
    const c3=c2.save()
    res.json(c3)
}
    catch(err){
        res.send("Error "+err)
    }
})

// app.delete("/delete/:id",async(req,res)=>{
// const c4=await Cricketers.findById(req.params.id)
// try{
// const c5=c4.remove()
// res.json(c5)}
// catch(err){
//     res.send("Error "+err)
// }
// })

app.delete("/delete/:id",async(req,res)=>{
    await Cricketers.findByIdAndRemove(req.params.id).exec()
    res.send("Deleted.")
})
app.listen(9001,()=>{
    console.log("Server started at port number 9001....")
})
