import styles from '../assets/css/AddGuide.module.css'
import { useState } from 'react';
import axios from 'axios';
import IndexHeader from 'components/Headers/IndexHeader';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import DemoFooter from 'components/Footers/DemoFooter';
import { Toast } from 'reactstrap';
import "react-toastify/dist/ReactToastify.css";
import{
    Label,
    Input,
    Button
}
from 'reactstrap'
import { toast } from 'react-toastify';



toast.configure();


function AddGuide(){

const [guideID , setGuideId] = useState("");
const [fName , setFname] = useState("");
const [lName , setLname] = useState("");
const [email , setEmail] = useState("");
const [telNo , setTelno] = useState("");
const [licenseID , setLicenseId] = useState("");
const [foreignLang , setForeignLang] = useState("");


function sendData(e){
    e.preventDefault();

    const newGuide = {
        guideID,
        fName,
        lName,
        email,
        telNo,
        licenseID,
        foreignLang
    }


axios.post("http://localhost:8070/guides/add" , newGuide ).then(()=>{
    
    toast.success('Guide Added!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        e.target.reset();
}).catch((err)=>{
    alert(err);
    })
}


    return(
        <>
        <IndexHeader />
        <IndexNavbar />
        <div style = {{paddingTop : "50px"}} className = {styles.body}>
            <br/><br/><h3 className = {styles.header} style = {{textAlign : 'center'}}>Insert Tour Guide Details</h3><br/><br/>
            <div className = {styles.FormContainer}>
            <form onSubmit = {sendData}>

                <Label for = "GuideID">Guide ID</Label><br/>
                <Input type = 'text' name = "GuideID" placeholder = "Enter Guide ID" pattern = "G-[0-9]{3}" title = "Enter in the format G-234" required
                onChange = {(e) => {
                        setGuideId(e.target.value);
                }}></Input><br/>

                <Label for = "FirstName">First Name</Label><br/>
                <Input type = 'text' name = "FirstName" placeholder = "Enter First Name" required
                onChange = {(e) =>{
                        setFname(e.target.value);
                }}></Input><br/>

                <Label for = "LastName">Last Name</Label><br/>
                <Input type = 'text' name = "LastName" placeholder = "Enter Last Name" required
                onChange = {(e)=>{
                        setLname(e.target.value);
                }}></Input><br/>

                <Label for = "Email">Email</Label><br/>
                <Input type = "email" name = "Email" placeholder = "Enter Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title = "Enter a valid email" required
                onChange = {(e)=>{
                        setEmail(e.target.value);
                }}></Input><br/>

                <Label for = "TelNo">Telephone number</Label><br/>
                <Input type = "text" name = "TelNo" placeholder = "Enter Telephone Number" pattern = "[0-9]{10}" title = "Enter a 10 digit phone number starting with 0"  required
                onChange = {(e)=>{
                        setTelno(e.target.value);
                }}></Input><br/>

                <Label for = "GuideLicense">Guide License ID</Label><br/>
                <Input type = "text" name = "GuideLicense" placeholder = "Enter Guide License ID" pattern="[A-Za-z]{3}-[0-9]{3}" title = "Enter a valid Guide License ID, EX : GTR-123" required
                onChange= {(e)=>{
                        setLicenseId(e.target.value);
                }}/><br/>

                <Label for = "ForeignLanguage">Main Foreign ForeignLanguage</Label><br/>
                <Input type = "text" name = "ForeignLanguage" placeholder = "Enter Main Foreign Language" required
                onChange = {(e)=>{
                        setForeignLang(e.target.value);
                }}/> <br/>
                
                <Button color = "primary" type = "submit" style = {{float:'right' , margin : "5px" }}
                >Add Guide</Button>

            </form>    
            </div>
        </div>   
        <DemoFooter />
       </>     
    );
}

export default AddGuide;