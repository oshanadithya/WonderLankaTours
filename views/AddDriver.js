import styles from '../assets/css/AddDriver.module.css'
import React, {useState} from "react"
import axios from "axios";
import IndexHeader from "components/Headers/IndexHeader";
import IndexNavbar from "components/Navbars/IndexNavbar";
import DemoFooter from "components/Footers/DemoFooter";

// reactstrap components
import {
  Button,
  Label,
  
  Input,
  
} from "reactstrap";

// core components

export default function AddDriver() {
  const [driverid, setDriverid]=useState("");
  const [firstname, setfName]=useState("");
  const [lastname, setlName]=useState("");
  const [email, setEmail]=useState("");
  const [phonenumber, setPhonenumber]=useState("");
  const [licenseid, setLicenseid]=useState("");
  const [languages, setLanguages]=useState("");


  function sendData(e){
    e.preventDefault();
    
    const newDriver={
     driverid,
     firstname,
     lastname,
     email,
     phonenumber,
     licenseid,
     languages
    }
    
    axios.post("http://localhost:8070/drivers/add", newDriver).then(()=>{
      alert("Driver Added");
      window.location.reload();

    }).catch((err)=>{
      alert(err)
    })
  }
  

 
  
  return (
    <>
    <IndexHeader/>
    <IndexNavbar />
      <div style = {{paddingTop :"50px"}} className ={styles.body}>
      <br/><br/><h3 className = {styles.header} style = {{textAlign : 'center'}}>Insert Driver Details</h3><br/><br/>
      <div className = {styles.FormContainer}>    
                
                
                <form onSubmit={sendData} >
                <label for = "firstname"><h5>Driver ID</h5></label>
                  
                    
                  <Input placeholder="Enter Driver ID" type="text" pattern="[D]{1}-[0-9]{3}" title = "Enter a valid Driver  ID, EX : D-001"
                   required onChange={(e)=>{
                  setDriverid(e.target.value);
                   }} />
                  <label for = "firstname"><h5>First Name</h5></label>
                  
                    
                    <Input placeholder="Enter First Name" type="text" required onChange={(e)=>{
                    setfName(e.target.value);
                     }} />
                 

                  <label for = "lastname"><h5>Last Name</h5></label>
                  
                    
                    <Input placeholder="Enter Last Name" type="text" required onChange={(e)=>{
                    setlName(e.target.value);
                     }} />
                 

                  <label for ="email"><h5>Email</h5></label>
                 
                    
                    <Input placeholder="Enter Email" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title = "Enter a valid email" required
                    onChange={(e)=>{
                    setEmail(e.target.value);
                     }}/>
                

                  <label for = "phonenumber"><h5>Phone Number</h5></label>
                 
                    <Input placeholder="Enter Mobile Number" type="text" pattern = "[0-9]{10}" title = "Enter a 10 digit phone number starting with 0"  required onChange={(e)=>{
                    setPhonenumber(e.target.value);
                     }}/>
                 

                  <label for ="licenseid"><h5>License ID</h5></label>
                  
                    
                    <Input placeholder="Enter License ID" type="text" pattern="[L]{1}-[0-9]{3}" title = "Enter a valid Driver License ID, EX : L-001" required
                     onChange={(e)=>{
                    setLicenseid(e.target.value);
                     }}/>
                  

                  <label for ="languages"><h5>Fluent Languages</h5></label>
                
                    
                    <Input placeholder="Enter Languages" type="text" onChange={(e)=>{
                    setLanguages(e.target.value);
                     }}/>
                     <br/>
                 
                  <center>
                  <button type="submit" className="btn btn-primary">Add Driver</button>
                  </center>
                </form>
                
            
             
        
         
       
      </div>
      </div>
      <DemoFooter/>
    </>
  );
}


