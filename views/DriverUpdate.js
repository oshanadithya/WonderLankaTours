import styles from '../assets/css/AddDriver.module.css'
import { useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
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

function DriverUpdate(){

 



    const [driverid , setDriverid] = useState("");
    const [firstname , setFirstname] = useState("");
    const [lastname , setLastname] = useState("");
    const [email , setEmail] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [licenseid , setLicenseid] = useState("");
    const [languages , setLanguages] = useState("");
    const [message , setMessage] = useState("");
   

    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8070/drivers/${id}`).then((res) =>{

        console.log(res.data);
        setDriverid(res.data.driverid);
        setFirstname(res.data.firstname);
        setLastname(res.data.lastname);
        setEmail(res.data.email);
        setPhonenumber(res.data.phonenumber);
        setLicenseid(res.data.licenseid);
        setLanguages(res.data.languages);

        }).catch((err)=>{
        console.log(err);
        })
    } , []);

    function onSubmit (e){
        e.preventDefault();

        const updateDriver = {
            driverid,
            firstname,
            lastname,
            email,
            phonenumber,
            licenseid,
            languages
        }
        axios.put(`http://localhost:8070/drivers/update/${id}` , updateDriver ).then(() =>{
            
            toast.success('Driver Updated!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                e.target.reset();
                

        }).catch((err) =>{
            console.log(err);
            toast.error('Something went  wrong!', {
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
            <br/><br/><h3 style = {{textAlign : 'center'}}>Update Driver Details</h3><br/><br/>
            <div className = {styles.FormContainer}>
            <form onSubmit = {onSubmit}>

                <Label for = "driverid">Driver ID</Label><br/>
                <Input type = 'text'  pattern="[D]{1}-[0-9]{3}" title = "Enter a valid Driver  ID, EX : D-001"
                name = "driverid" value = {driverid}
                onChange = {(e) =>{
                    setDriverid(e.target.value);
                }}></Input><br/>

                <Label for = "firstname">First Name</Label><br/>
                <Input type = 'text' name = "firstname" value = {firstname}
                onChange = {(e)=>{
                    setFirstname(e.target.value);
                }}></Input><br/>

                <Label for = "lastName">Last Name</Label><br/>
                <Input type = 'text' name = "lastName" value = {lastname} 
                onChange = {(e)=>{
                    setLastname(e.target.value);
                }}></Input><br/>

                <Label for = "email">Email</Label><br/>
                <Input type = "email" name = "Email" value = {email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title = "Enter a valid email"
                onChange = {(e) =>{
                    setEmail(e.target.value);
                }}></Input><br/>

                <Label for = "phonenumber">Phone number</Label><br/>
                <Input type = "number" name = "phonenumber" value = {phonenumber} pattern = "[0-9]{10}" title = "Enter a 10 digit phone number starting with 0"
                onChange = {(e)=>{
                    setPhonenumber(e.target.value);
                }}></Input><br/>

                <Label for = "licenseid">License ID</Label><br/>
                <Input type = "text" name = "licenseid" value = {licenseid} pattern="[L]{1}-[0-9]{3}" title = "Enter a valid Driver License ID, EX : L-123" 
                onChange = {(e) =>{
                    setLicenseid(e.target.value);
                }}/><br/>

                <Label for = "languages">Languages</Label><br/>
                <Input type = "text" name = "languages" value = {languages}
                onChange = {(e)=>{
                    setLanguages(e.target.value);
                }}/> <br/>

                
                <Button type = "submit" color = "warning" style = {{float:'right' , margin : "5px" }} 

                >Edit Driver</Button>

            </form>    
            </div>
            <DemoFooter />
        </div>   

    );
}

export default DriverUpdate;