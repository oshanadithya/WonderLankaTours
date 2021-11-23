import styles from '../assets/css/EditInsurence.module.css'
import { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import IndexHeader from 'components/Headers/IndexHeader';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import DemoFooter from 'components/Footers/DemoFooter';
import{
    Label,
    Input,
    Button
}
from 'reactstrap'

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { thisExpression } from '@babel/types';

toast.configure();




function EditInsurenceForm(){

    const [InsurenceID , setInsurenceId] = useState("");
    const [InsurenceName , setInsurenceName] = useState("");
    const [InsurencePrice , setInsurencePrice] = useState("");
    const [InsurenceCoverage , setInsurenceCoverage] = useState("");
    const [InsurenceAccidentType , setInsurenceAccidentType] = useState("");
    const [InsurenceDetails , setInsurenceDetails] = useState("");
    const [message , setMessage] = useState("");

    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8070/insurences/get_onepackage/${id}}`).then((res) =>{

        console.log(res.data);
        setInsurenceId(res.data.InsurenceID);
        setInsurenceName(res.data.InsurenceName);
        setInsurencePrice(res.data.InsurencePrice); 
        setInsurenceCoverage(res.data.InsurenceCoverage);
        setInsurenceAccidentType(res.set.InsurenceAccidentType);    
        setInsurenceDetails(res.data.InsurenceDetails);
       


        }).catch((err)=>{
        console.log(err);
        })
    } , []);

    function onSubmit (e){
        e.preventDefault();

        const updateInsurans = {
            InsurenceID,
            InsurenceName,
            InsurencePrice,
            InsurenceCoverage,
            InsurenceAccidentType,
            InsurenceDetails,
            
        }
        axios.put(`http://localhost:8070/insurences/update/${id}` , updateInsurans ).then(() =>{
            
            toast.success('Plan Edited!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                

        }).catch((err) =>{
            console.log(err);
            toast.error('Something has gone wrong!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        })
    }
    return(

        <div>
            <IndexHeader />
            <IndexNavbar />
            <div style = {{paddingTop : "50px"}} className = {styles.body}>
            <br/><br/><h3 style = {{textAlign : 'center'}}>Edit Insurance Plan Details</h3><br/><br/>
            <div className = {styles.FormContainer}>
            <form onSubmit = {onSubmit}>

                <Label for = "InsurenceID">Insurance Plan ID</Label><br/>
                <Input type = 'text' name = "InsurenceID" placeholder = "Enter The New ID" value = {InsurenceID}
                onChange = {(e) =>{
                    setInsurenceId(e.target.value);
                }}></Input><br/>

                <Label for = "InsurenceName">Insurance Plan Name</Label><br/>
                <Input type = 'text' name = "InsurenceName" placeholder = "Enter The New Package Name" value = {InsurenceName}
                onChange = {(e)=>{
                    setInsurenceName(e.target.value);
                }}></Input><br/>

                <Label for = "InsurencePrice">Insurance Plan Price</Label><br/>
                <Input type = 'text' name = "InsurencePrice" placeholder = "Enter The New Price" value = {InsurencePrice} 
                onChange = {(e)=>{
                    setInsurencePrice(e.target.value);
                }}></Input><br/>

                <Label for = "InsurenceCoverage">Coverage</Label><br/>
                <Input type = 'text' name = "InsurenceCoverage" placeholder = "Enter The New Coverage" value = {InsurenceCoverage}
                onChange = {(e)=>{
                    setInsurenceCoverage(e.target.value);
                }}></Input><br/>

                <Label for = "InsurenceAccidentType">Accident types</Label><br/>
                <Input type = 'text' name = "InsurenceAccidentType" placeholder = "Enter The New Accident Types" value = {InsurenceAccidentType}
                onChange = {(e)=>{
                    setInsurenceAccidentType(e.target.value);
                }}></Input><br/>

                <Label for = "InsurenceDetails">Insurance Description</Label><br/>
                <Input type = "text" name = "InsurenceDetails" placeholder = "Enter The New Description" value = {InsurenceDetails}
                onChange = {(e) =>{
                    setInsurenceDetails(e.target.value);
                }}></Input><br/>

                <span style = {{textAlign:"left" , color : "red"}}>{message}</span>
                <Button type = "submit" color = "warning" style = {{float:'right' , margin : "5px" }} 
                onClick = {() =>{
                    setMessage("Plan Updated!");
                }}
                >Edit Plan</Button>

            </form>    
            </div>
            </div>
            <DemoFooter />
        </div>   

    );
}

export default EditInsurenceForm;