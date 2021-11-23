import styles from '../assets/css/AddDriver.module.css'

import { useState } from "react";
import { useEffect } from "react";
import { useParams } from 'react-router';
import axios from "axios";
import {
    Label,
    Input,
    Button,
    Row,
    Col,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormGroup,
    Alert,
    Container,
  } from "reactstrap";
import { ListFormat } from 'typescript';

function AssignDr(){
    

    const {username} = useParams();
    const [drivers , setDrivers] = useState([]);
    const [tid , setID] = useState();
    const [did , setdID] = useState();
    const [selectedDriver , setSelection] = useState("");
    

    function onSubmitForm(e){
        e.preventDefault();

        const newAssignment = {
            tid,
            did
        }
        
        axios.post("http://localhost:8070/assignedDrivers/add" , newAssignment).then(()=>{
            window.location.reload();
        }).catch((err) =>{
            console.log(err);
        })
    }
    
    function getName(){
        axios.get(`http://localhost:8070/drivers/getbyName/${selectedDriver}`).then((req) =>{
            
            console.log(req.data.driverid);
            setdID(req.data.driverid);
        })
    }

    useEffect(()=>{
        axios.get("http://localhost:8070/drivers/details").then((req)=>{
            setDrivers(req.data)
            console.log(req.data)
        }).catch((err)=>{
            console.log(err);
        })
      
        axios.get(`http://localhost:8070/bookings/get/${username}`).then((req) =>{
            
            setID(req.data[0].tourId);

        }).catch(() =>{
            console.log("Error in fetching data!");
        })

        
    } , []);


        
    return (
        <div style = {{paddingTop : "50px"}} className = {styles.body}>
        <br/><br/><h3 className = {styles.header} style = {{textAlign : 'center'}}>Assign Driver</h3><br/><br/>
        <div className = {styles.FormContainer}>
        <form onSubmit = {onSubmitForm}>



            <Label for = "TourID">Tour ID</Label><br/>
            <Input type = 'tid' name = "tid"  value = {tid} disabled
            ></Input><br/>

            <Label for = "Driver Name">Driver Name</Label><br/>
           
            <select className="form-control" onChange = {(e) =>{
                    setSelection(e.target.value);
                    getName();
            }}>
                {drivers.map((names)=>{
                    return <option>
                        {names.firstname}
                   </option>;
                })} 
             
            </select> <br/> <br/>

        

            <Label for = "GuideID">Driver ID</Label><br/>
            <Input type = 'did' name = "did"  value = {did} disabled
            ></Input><br/>




    
            <Button color = "primary" type = "submit" style = {{float:'right' , margin : "5px" }}

            >Assign Driver</Button>

        </form>    
        </div>
    </div>   
    );


}

export default AssignDr;