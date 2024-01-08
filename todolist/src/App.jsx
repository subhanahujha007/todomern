import { TextField,Button, ButtonBase } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios"
import "./aap.css"
import {BsCheckCircleFill,BsCircleFill} from "react-icons/bs"
import {AiFillDelete} from "react-icons/ai"

function App() {
 const [todos,setodos]=useState([]);
 const [task,settask]=useState();

 const handledelete=(id)=>{
  axios.delete('http://localhost:3001/delete/'+id,{task:task}).then(result=>{location.reload()}).catch(err=>console.log(err))
 }
 const handleAdd=()=>{
axios.post('http://localhost:3001/add',{task:task}).then(result=>{location.reload()}).catch(err=>console.log(err))
 }
 useEffect(() => {
   axios.get('http://localhost:3001/get').then(result=>setodos(result.data)).catch(err=>console.log(err))
 }, [])
 
const handlecheckbox=(id)=>{
  axios.put('http://localhost:3001/update/'+id,{task:task}).then(result=>{location.reload()}).catch(err=>console.log(err))
 
}
  return(
    <>
    <center>
      <h1>TODO LIST</h1>
  
      <TextField  id="textfeild" label="ENTER THE TASK" variant="outlined" onChange={(e)=>{settask(e.target.value)}}/>
      
     <Button style={{backgroundColor:"black",height:"56px"}}  variant="contained" 
     onClick={handleAdd}>Add</Button>
<div>
  {
todos.length ===0?
<h1>NO RECORD</h1>:
todos.map(todo=>
  <div style={{width:"700px",backgroundColor:"black",display:"flex",justifyContent:"space-between",color:"white",padding:"1rem",borderRadius:"30px",margin:"20px"}}>
    <div style={{display:"flex",justifyContent:"flex-start",flexDirection:"row",width:"300px"}}> <div onClick={()=>handlecheckbox(todo._id)}>{todo.done?<BsCheckCircleFill className="icon"/>:<BsCircleFill className="icon"/>}</div><p className={todo.done?"line_through":""}>{todo.task}</p></div>
  <AiFillDelete size={30} onClick={()=>handledelete(todo._id)}/></div>)

  }
</div>
    </center>
    </>
  )
  
}

export default App
