import styles from '../assets/css/AddInsurence.module.css'
import { useState, useEffect  } from 'react';
import axios from 'axios';
import IndexHeader from 'components/Headers/IndexHeader';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import DemoFooter from 'components/Footers/DemoFooter';
import{
    Label,
    Input,
    Button
}
from 'reactstrap'






function AddInsurence(){

const [InsurenceID , setInsurenceId] = useState("");
const [InsurenceName , setInsurenceName] = useState("");
const [InsurencePrice , setInsurencePrice] = useState("");
const [InsurenceCoverage , setInsurenceCoverage] = useState("");
const [InsurenceAccidentType , setInsurenceAccidentType] = useState("");
const [InsurenceDetails , setInsurenceDetails] = useState("");
const [message , setMessage] = useState("");


function sendData(e){
    e.preventDefault();

    const newInsurence = {
        InsurenceID,
        InsurenceName,
        InsurencePrice,
        InsurenceCoverage,
        InsurenceAccidentType,
        InsurenceDetails,
        
    }


axios.post("http://localhost:8070/insurences/add-package" , newInsurence ).then(()=>{
    window.location.reload();
}).catch((err)=>{
    alert(err);
    })
}


    return(
        <>
        <IndexHeader />
        <IndexNavbar />
        <div style = {{paddingTop : "50px"}} className = {styles.body}>
            <br/><br/><h3 className = {styles.header} style = {{textAlign : 'center'}}>Insert Insurance Plan Details</h3><br/><br/>
            <div className = {styles.FormContainer}>
            <form onSubmit = {sendData}>

                <Label for = "InsurenceID">Insurance Plan ID</Label><br/>
                <Input type = 'text' name = "InsurenceID" placeholder = "Enter Plan ID" 
                onChange = {(e) => {
                    setInsurenceId(e.target.value);
                }}></Input><br/>

                <Label for = "InsurenceName">Insurance Plan Name</Label><br/>
                <Input type = 'text' name = "InsurenceName" placeholder = "Enter Plan Name"
                onChange = {(e) =>{
                    setInsurenceName(e.target.value);
                }}></Input><br/>

                <Label for = "InsurencePrice">Insurance Plan Price</Label><br/>
                <Input type = 'text' name = "InsurencePrice" placeholder = "Enter The Price"
                onChange = {(e)=>{
                    setInsurencePrice(e.target.value);
                }}></Input><br/>

                <Label for = "InsurenceCoverage">Coverage</Label><br/>
                <Input type = 'text' name = "InsurenceCoverage" placeholder = "Enter The Coverage"
                onChange = {(e)=>{
                    setInsurenceCoverage(e.target.value);
                }}></Input><br/>

                <Label for = "InsurenceAccidentType">Accident types</Label><br/>
                <Input type = 'text' name = "InsurenceAccidentType" placeholder = "Enter The Accident Types"
                onChange = {(e)=>{
                    setInsurenceAccidentType(e.target.value);
                }}></Input><br/>


                <Label for = "InsurenceDetails">Insurance Plan Description</Label><br/>
                <Input type = "text" name = "InsurenceDetails" 
                onChange = {(e)=>{
                    setInsurenceDetails(e.target.value);
                }}></Input><br/>

                <span style = {{textAlign:"left" , color : "red"}}>{message}</span>
                <Button color = "primary" type = "submit" style = {{float:'right' , margin : "5px" }}
                onClick = {() =>{
                    setMessage("Plan Added!");
                }}
                >Add Plan</Button>

            </form>    
            </div>
        </div>   
        <DemoFooter />
       </>     
    );
}

export default AddInsurence;