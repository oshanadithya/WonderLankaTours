import styles from '../assets/css/AddGuide.module.css'
import emailjs from 'emailjs-com';
import { useParams } from 'react-router';
import axios from 'axios';
import { useState } from 'react';
import{
    Label,
    Input,
    Button
}
from 'reactstrap'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';


toast.configure();

function CustomIt(){

    function sendEmail(e){
        e.preventDefault();

        emailjs.sendForm('service_ybzjfen','template_4d97w88',e.target,'user_syKuxOzzyHhIQ1AhOxJ1V').then((result) =>{
            console.log(result.text);

        }).catch((err) =>{
            console.log(err.text);
        })

        e.target.reset();
        toast.success('Email Sent!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

    const {username} = useParams();
    const [name , setName] = useState("");
    const[email , setEmail] = useState("");

    
    useEffect(()=>{
        
        axios.get(`http://localhost:8070/bookings/get/${username}`).then((req) =>{
            console.log(req.data);
            setName(req.data[0].fullName);
            setEmail(req.data[0].email);

        }).catch(() =>{
            console.log("Error in fetching data!");
        })
        
    }, []);

    return (

        <div style = {{paddingTop : "50px"}} className = {styles.body}>
            <br/><br/><h3 className = {styles.header} style = {{textAlign : 'center'}}>Insert Custom Itinerary</h3><br/><br/>
            <div className = {styles.FormContainer}>
            <form onSubmit = {sendEmail}>

                <Label for = "CustomerName">Customer Name</Label><br/>
                <Input type = "text" name = "name" placeholder = "Enter Customer Name" value = {name} disabled
                /> <br/>

                <Label for = "cusEmail">Customer Email</Label><br/>
                <Input type = 'email' name = "email" placeholder = "Enter Customer Email" value = {email} disabled
                ></Input><br/>



                <Label for = "ItineraryImage">Itinerary Image URL</Label><br/>
                <Input type = "text" name = "itImage" placeholder = "Enter Itinerary Image URL"
                ></Input><br/>

        
                <Button color = "primary" type = "submit" style = {{float:'right' , margin : "5px" }}
            
                >Send Itinerary</Button>

            </form>    
            </div>
        </div>   
    );

}

export default CustomIt;