import './App.css';
// import Footer from "./Footer"
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from "axios"

function App() {
  const [name,setName]=useState('')
  const [country,setCountry]=useState("")
  const [centuries,setCenturies]=useState(null)
  const [displayData,setDisplayData]=useState([])
  const [updatedName,setUpdatedName]=useState('')
  // const [ch,setCh]=useState(0)

  useEffect(()=>{
    axios.get("http://localhost:9001/display").then((response)=>{
      console.log(response.data)
      setDisplayData(response.data)
    })
  },[])

  const handleSubmit=(e)=>{
    console.log("Name:"+name+" "+"Country"+country+" "+"Centuries"+centuries)
   
    axios.post("http://localhost:9001/insert",{name:name,country:country,centuries:centuries})

  }

  const handleUpdate=(id)=>{
    axios.put("http://localhost:9001/update",{id:id,updatedName:updatedName})
  }

  const handleDelete=(id)=>{
    console.log(id)
    axios.delete(`http://localhost:9001/delete/${id}`)
  }
  return (
    <div className="App">
      {/* //<h1 style={{color:"yellow",backgroundColor:"blue"}}></h1></div> */}
    <Typography style={{color:"yellow",backgroundColor:"blue",fontSize:'50px',marginTop:"10px"}}> This is a Cricketers database application.</Typography>
    <br/>
     {/* <Footer/> */}
     <form >  
     <Typography style={{color:"white",backgroundColor:"green",fontSize:'20px',marginTop:"10px"}}>Name :</Typography>
      <TextField required id="outlined-basic" placeholder="Enter name" variant="outlined" onChange={(e)=>{setName(e.target.value)}} />
      <br></br>
     <Typography style={{color:"white",backgroundColor:"green",fontSize:'20px',marginTop:"10px"}}>Country :</Typography>
      <TextField required id="outlined-basic" placeholder="Enter Country" variant="outlined" onChange={(e)=>{setCountry(e.target.value)}}/>
      <br></br>
      <Typography style={{color:"white",backgroundColor:"green",fontSize:'20px',marginTop:"10px"}}>Number of centuries :</Typography>
      <TextField type="number" required  id="outlined-basic" placeholder="Enter # centuries" variant="outlined" onChange={(e)=>{setCenturies(e.target.value)}} />
      <br></br>
      <Button variant='contained' style={{marginTop:"10px"}} onClick={handleSubmit}>ADD TO LIST</Button>
      </form>
      <div>
        <hr></hr>
        {displayData.map((c,key)=><div style={{border:"2px solid black",justifyContent:"center",alignItems:"center"}}><Typography>{c.name}{'  -   '}{c.country}</Typography><br></br>
        <input type="text" onChange={(e)=>{setUpdatedName(e.target.value)}}/><button onClick={()=>{handleUpdate(c._id)}}>Update</button><br/><br/>
        <button onClick={()=>{handleDelete(c._id)}}>Delete</button></div>)}
      </div>
    </div>
  );
}

export default App;
