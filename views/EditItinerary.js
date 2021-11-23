import styles from '../assets/css/EditItinerary.module.css'
import IndexHeader from 'components/Headers/IndexHeader';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import DemoFooter from 'components/Footers/DemoFooter';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import{
    Label,
    Input,
    Button
}
from 'reactstrap'

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();



function EditItinerary(){

    

    const [itineraryId ,setitineraryId] = useState("");
    const [itineraryDays , setitineraryDays] = useState("");
    const [itineraryName , setitineraryName] = useState("");
    const [itineraryDesc , setitineraryDesc] = useState("");
    const [Filename1 , setitineraryImage] = useState("");
    const [Filename2 , setitineraryCoverImage] = useState("");
    const [itineraryClass , setitineraryClass] = useState("");
    const [itineraryPriceAdult , setitineraryPriceAdult] = useState("");
    const [itineraryPriceChild , setitineraryPriceChild] = useState("");

    const {id} = useParams();

    const onChangeFile = e =>{
        setitineraryImage(e.target.files[0]);
    }
    const onChangeFile2 = e =>{
        setitineraryCoverImage(e.target.files[0]);
    }

    useEffect(()=>{
        axios.get(`http://localhost:8070/itineraries/get/${id}`).then((res) =>[

        console.log(res.data),
        setitineraryId(res.data.itineraryId),
        setitineraryName(res.data.itineraryName),
        setitineraryDays(res.data.itineraryDays),
        setitineraryDesc(res.data.itineraryDesc),
        setitineraryClass(res.data.itineraryClass),
        setitineraryPriceAdult(res.data.itineraryPriceAdult),
        setitineraryPriceChild(res.data.itineraryPriceChild),
        setitineraryCoverImage(res.data.itineraryCoverImage),
        setitineraryImage(res.data.itineraryImage)


    ]).catch((err)=>{
        console.log(err);
        })
    } , []);



    function updateData(e){
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

        axios.put(`http://localhost:8070/itineraries/update/${id}` , formData , {headers: {'Content-Type': 'multipart/form-data'}}).then(() =>{
            toast.success('Itinerary Edited!', {
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
        <IndexHeader />
        <IndexNavbar />
        <div style = {{paddingTop : "50px"}} className = {styles.body}>
            <br/><br/><h3 className = {styles.header} style = {{textAlign : 'center'}}>Edit Tour Itinerary Details</h3><br/><br/>
            <div className = {styles.FormContainer}>
            <form onSubmit = {updateData} encType = "multipart/form-data">

                <Label for = "ItineraryID">Itinerary ID</Label><br/>
                <Input type = 'text' name = "ItineraryID" placeholder = "Enter Itinerary ID" value = {itineraryId} pattern ="[T]-[0-9]{4}" title = "Enter in the format T-2345" required
                onChange = {(e) =>{
                    setitineraryId(e.target.value);
                }}
                ></Input><br/>

                <Label for = "ItineraryName">Itinerary Name</Label><br/>
                <Input type = 'text' name = "ItineraryName" placeholder = "Enter Itinerary Name" value = {itineraryName}
                onChange = {(e)=>{
                    setitineraryName(e.target.value);
                }}
                ></Input><br/>

                <Label for = "ItineraryDays">Itinerary Duration</Label><br/>
                <Input type = 'number' name = "ItineraryDuration" placeholder = "Enter Duration of the Itinerary" value = {itineraryDays}
                onChange = {(e) =>{
                    setitineraryDays(e.target.value);
                }}
                ></Input><br/>

                <Label for = "ItineraryDescription">Itinerary Description</Label><br/>
                <Input type = "text" name = "ItineraryDescription" placeholder = "Enter Itinerary Description" value = {itineraryDesc}
                onChange = {(e)=>{
                    setitineraryDesc(e.target.value);
                }}
                ></Input><br/>

                <Label for = "ItineraryImage">Itinerary Image</Label><br/>
                <Input type = "file" filename = "itineraryImage" accept = "image/*" className = "form-control-file"
                onChange = {onChangeFile}
                ></Input><br/>

                <Label for = "CardImage">Image for Card</Label><br/>
                <Input type = "file" filename = "itineraryCoverImage" accept = "image/*" className = "form-control-file"
                onChange = {onChangeFile2}
                /><br/>

                <Label for = "ItineraryClass">Select Itinerary Class</Label><br/>
                <Input type = "select" name = "ItineraryClass" value = {itineraryClass}
                onChange = {(e) =>{
                    setitineraryClass(e.target.value);
                }}
                >
                    <option>Deluxe</option>
                    <option>Standard</option>
                </Input>

                <Label for = "ItineraryPriceA">Itinerary Price for Adults</Label><br/>
                <Input type = "String" name = "ItineraryPriceA" placeholder = "Enter Itinerary Price for Adults" value = {itineraryPriceAdult} 
                onChange = {(e) =>{
                    setitineraryPriceAdult(e.target.value);
                }}
                />

                <Label for = "ItineraryPriceC">Itinerary Price for Children</Label><br/>
                <Input type = "String" name = "ItineraryPriceC" placeholder = "Enter Itinerary Price for Children" value = {itineraryPriceChild}
                onChange = {(e)=>{
                    setitineraryPriceChild(e.target.value);
                }}
                />

                <Button type = "submit" color = "warning" style = {{float:'right' , margin : "5px" }} >Edit Itinerary</Button>

            </form>    
            </div>
        </div>   
        <DemoFooter />
    </>
    );
}

export default EditItinerary;