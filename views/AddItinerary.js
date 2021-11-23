import styles from '../assets/css/AddItinerary.module.css';
import axios from 'axios';
import { useState , useEffect } from 'react';
import IndexHeader from 'components/Headers/IndexHeader';
import IndexNavbar from 'components/Navbars/IndexNavbar';
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

function AddItinerary(){

    const [itineraryId ,setitineraryId] = useState("");
    const [itineraryDays , setitineraryDays] = useState("");
    const [itineraryName , setitineraryName] = useState("");
    const [itineraryDesc , setitineraryDesc] = useState("");
    const [Filename1 , setitineraryImage] = useState("");
    const [Filename2 , setitineraryCoverImage] = useState("");
    const [itineraryClass , setitineraryClass] = useState("");
    const [itineraryPriceAdult , setitineraryPriceAdult] = useState("");
    const [itineraryPriceChild , setitineraryPriceChild] = useState("");

    const onChangeFile = e =>{
        setitineraryImage(e.target.files[0]);
    }
    const onChangeFile2 = e =>{
        setitineraryCoverImage(e.target.files[0]);
    }
    function sendData(e){
        e.preventDefault();

        const formData = new FormData();
        
        formData.append("itineraryId" , itineraryId);
        formData.append("itineraryDays" , itineraryDays);
        formData.append("itineraryName" , itineraryName);
        formData.append("itineraryDesc" , itineraryDesc);
        formData.append("itineraryImage" , Filename1);
        formData.append("itineraryCoverImage" , Filename2);
        formData.append("itineraryClass" , itineraryClass);
        formData.append("itineraryPriceAdult" , itineraryPriceAdult);
        formData.append("itineraryPriceChild" , itineraryPriceChild);

 



        axios.post("http://localhost:8070/itineraries/add" , formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(()=>{
            
            
            toast.success('Itinerary Added!', {
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
            console.log(formData);
            console.log(err);
        })
    }
    return(
        <>
        <IndexNavbar />
        <IndexHeader />
        <div style = {{paddingTop : "50px"}} className = {styles.body}>
            <br/><br/><h3 className = {styles.header} style = {{textAlign : 'center'}}>Insert Tour Itinerary Details</h3><br/><br/>
            <div className = {styles.FormContainer}>
            <form  onSubmit = {sendData} encType = "multipart/form-data">

                <Label for = "ItineraryID">Itinerary ID</Label><br/>
                <Input type = 'text' name = "ItineraryID" placeholder = "Enter Itinerary ID" pattern ="[T]-[0-9]{4}" title = "Enter in the format T-2345" required 
                onChange = {(e) =>{
                    setitineraryId(e.target.value);
                }}
                ></Input><br/>

                <Label for = "ItineraryName">Itinerary Name</Label><br/>
                <Input type = 'text' name = "ItineraryName" placeholder = "Enter Itinerary Name" required
                onChange = {(e) =>{
                    setitineraryName(e.target.value);
                }}
                ></Input><br/>

                <Label for = "ItineraryDays">Itinerary Days</Label><br/>
                <Input type = 'number' name = "ItineraryDays" placeholder = "Enter Duration of the Itinerary" required
                onChange = {(e)=>{
                    setitineraryDays(e.target.value);
                }}
                ></Input><br/>

                <Label for = "ItineraryDescription">Itinerary Description</Label><br/>
                <Input type = "text" name = "ItineraryDescription" placeholder = "Enter Itinerary Description" required
                onChange = {(e) =>{
                    setitineraryDesc(e.target.value);
                }}
                ></Input><br/>
                <div className = "form-group">
                <Label htmlFor = "ItineraryImage">Itinerary Image</Label><br/>
                <Input type = "file" filename = "itineraryImage" accept = "image/*" className = "form-control-file"
                 onChange = {onChangeFile}
                ></Input><br/>
                </div>

                <Label htmlFor = "ItineraryCoverImage">Image for Card</Label><br/>
                <Input type = "file" filename = "itineraryCoverImage" accept = "image/*" className = "form-control-file"
                onChange = {onChangeFile2}
                /><br/>

                <Label for = "ItineraryClass">Select Itinerary Class</Label><br/>
                <Input type = "select" name = "ItineraryClass"
                onChange = {(e) =>{
                    setitineraryClass(e.target.value);
                }}
                >
                    <option>Deluxe</option>
                    <option>Standard</option>
                </Input>

                <Label for = "ItineraryPriceA">Itinerary Price for Adults</Label><br/>
                <Input type = "number" name = "ItineraryPriceA" placeholder = "Enter Itinerary Price for Adults"  required
                onChange = {(e) =>{
                    setitineraryPriceAdult(e.target.value);
                }}
                />

                <Label for = "ItineraryPriceC">Itinerary Price for Children</Label><br/>
                <Input type = "number" name = "ItineraryPriceC" placeholder = "Enter Itinerary Price for Children" required
                onChange = {(e) =>{
                    setitineraryPriceChild(e.target.value);
                }}
                />

                <Button color = "primary" type = "submit" style = {{float:'right' , margin : "5px" }}>Add Itinerary</Button>
            </form>    
            </div>
        </div>   
      </>          
    );
}

export default AddItinerary;