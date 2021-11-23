import styles from '../assets/css/AddGuide.module.css'

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

function Assign(){
    

    const {tide} = useParams();
    const [guides , setGuides] = useState([]);
    const [tid , setID] = useState();
    const [gid , setgID] = useState();
    const [selectedGuide , setSelection] = useState("");
    

    function onSubmitForm(e){
        e.preventDefault();

        const newAssignment = {
            tid,
            gid
        }
        
        axios.post("http://localhost:8070/assignedGuides/add" , newAssignment).then(()=>{
            window.location.reload();
        }).catch((err) =>{
            console.log(err);
        })
    }
    
    function getName(){
        axios.get(`http://localhost:8070/guides/getbyName/${selectedGuide}`).then((req) =>{
            
            console.log(req.data.guideID);
            setgID(req.data.guideID);
        })
    }
    
    useEffect(()=>{
        axios.get("http://localhost:8070/guides/").then((req)=>{
            setGuides(req.data)
            console.log(req.data)
        }).catch((err)=>{
            console.log(err);
        })
      
        // axios.get(`http://localhost:8070/bookings/get/${username}`).then((req) =>{
            
        //     setID(req.data[0].tourId);

        // }).catch(() =>{
        //     console.log("Error in fetching data!");
        // })

        
    } , []);


        
    return (
        <div style = {{paddingTop : "50px"}} className = {styles.body}>
        <br/><br/><h3 className = {styles.header} style = {{textAlign : 'center'}}>Assign Guide</h3><br/><br/>
        <div className = {styles.FormContainer}>
        <form onSubmit = {onSubmitForm}>



            <Label for = "TourID">Tour ID</Label><br/>
            <Input type = 'tid' name = "tid"  value = {tide} disabled
            ></Input><br/>

            <Label for = "Guide Name">Guide Name</Label><br/>
           
            <select className="form-control" onChange = {(e) =>{
                    setSelection(e.target.value);
                    getName();
            }}>
                {guides.map((names)=>{
                    return <option>
                        {names.fName}
                   </option>;
                })} 
             
            </select> <br/> <br/>

        

            <Label for = "GuideID">Guide ID</Label><br/>
            <Input type = 'gid' name = "gid"  value = {gid} disabled
            ></Input><br/>




    
            <Button color = "primary" type = "submit" style = {{float:'right' , margin : "5px" }}

            >Assign Guide</Button>

        </form>    
        </div>
    </div>   
    );


}

export default Assign;