import styles from '../assets/css/AddEmployee.module.css'
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

export default function AddEmployee() {
    const [empname, setEmpname]=useState("");
    const [emppwd, setPwd]=useState("");
    const [emprole, setRole]=useState("");

    function sendData(e){
        e.preventDefault();
        
        const newEmployee={
         empname,
         emppwd,
         emprole
        }

        axios.post("http://localhost:8070/employees/add", newEmployee).then(()=>{
            alert("Employee Added");
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
              <br/><br/><h3 className = {styles.header} style = {{textAlign : 'center'}}>Insert Employee Details</h3><br/><br/>
              <div className = {styles.FormContainer}>
              
                
                 
                    
                     
                        
                        
                        <form onSubmit={sendData} >
                        <label for = "empname"><h5>User Name</h5></label>
                          
                            
                          <Input placeholder="Enter User Name" type="text"
                          
                          onChange={(e)=>{
                          setEmpname(e.target.value);
                           }} />
                          <label for = "emppwd"><h5>Password</h5></label>
                            <Input placeholder="Enter a Password" type="text"
                             onChange={(e)=>{
                            setPwd(e.target.value);
                             }} />
                         
        
                            
                            <Label for = "EmployeeRole">Select Employee Role</Label><br/>
                            <Input type = "select" name = "EmployeeRole" required
                            onChange = {(e) =>{
                              setRole(e.target.value);
                            }}
                            >
                                <option>General Manager</option>
                                <option>Assets Manager</option>
                            </Input>
                         
        
                         
                             <br/>
                         
                          <center>
                          <button type="submit" className="btn btn-primary">Add Employee</button>
                          </center>
                        </form>
                        
                    
                     
                
                 
               
              </div>
              </div>
              <DemoFooter/>
            </>
          );
        }
        
        
        