import styles from '../assets/css/AssignVv.module.css'

import DemoFooter from "components/Footers/DemoFooter";

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

function AssignVc(){
    

    const {username} = useParams();
    const [vehicle , setVehicle] = useState([]);
    const [tid , setID] = useState();
    const [vid , setvID] = useState();
    const [selectedVehicle , setSelection] = useState("");
    

    function onSubmitForm(e){
        e.preventDefault();

        const newAssignment = {
            tid,
            vid
        }
        
        axios.post("http://localhost:8070/assignedVehicle/add" , newAssignment).then(()=>{
            window.location.reload();
        }).catch((err) =>{
            console.log(err);
        })
    }
    
    function getName(){
        axios.get(`http://localhost:8070/vehicles/getbyName/${selectedVehicle}`).then((req) =>{
            console.log(selectedVehicle);
            console.log(req.data.vid);
            setvID(req.data.vid);
        })
    }

    useEffect(()=>{
        console.log(username);
        axios.get("http://localhost:8070/vehicles/").then((req)=>{
            setVehicle(req.data)
            console.log(req.data)
        }).catch((err)=>{
            console.log(err);
        })
      
        axios.get(`http://localhost:8070/bookings/get/${username}`).then((req) =>{
            
            setID(req.data[0].tourId);
            console.log(tid);

        }).catch((e) =>{
            console.log("Error in fetching data!");
            console.log(e);
        })

        
    } , []);


        
    return (
        <div style = {{paddingTop : "75px"}} className = {styles.body}>
        <br/><h3 className = {styles.header} style = {{textAlign : 'center'}}><b>Assign Vehicles</b></h3><br/><br/>
        <div className = {styles.FormContainer}>
        <form onSubmit = {onSubmitForm}>



            <Label for = "TourID">Tour ID</Label><br/>
            <Input type = 'tid' name = "tid"  value = {tid} disabled
            ></Input><br/>

            <Label for = "vehicle Name">Vehicle Name</Label><br/>
           
            <select className="form-control" onChange = {(e) =>{
                    setSelection(e.target.value);
                    getName();
            }}>
                {vehicle.map((names)=>{
                    return <option>
                        {names.vname}
                   </option>;
                })} 
             
            </select> <br/> <br/>

        

            <Label for = "VehicleID">Vehicle ID</Label><br/>
            <Input type = 'gid' name = "gid"  value = {vid} disabled
            ></Input><br/>




    
            <Button color = "primary" type = "submit" style = {{float:'right' , margin : "5px" }}

            >Assign Vehicle</Button>

        </form>    
        </div>
        <DemoFooter />
    </div>   
    );


}

export default AssignVc;