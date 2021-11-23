import axios from 'axios';
import React, {Component} from 'react';
import styles from "../assets/css/AddHotel.module.css";
import IndexHeader from 'components/Headers/IndexHeader';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import DemoFooter from 'components/Footers/DemoFooter';
import {Label, Input, Button}from 'reactstrap';


export default class editHotels extends Component{


    constructor(props){
        super(props);
        this.state={
            hotelNum:"",
            hotelname:"",
            location:"",
            hotelTele:"",
            description:""
        }
    }
    
    handleInputChange = (e) =>{
        const {name,value} = e.target;
    
        this.setState({
           ...this.state,
            [name]:value
        })
    }
    
    onSubmit =(e) =>{
        
        e.preventDefault();
        const id = this.props.match.params.id;
        const {hotelNum,hotelname,location, hotelTele, description} = this.state;
    
        const data ={
            hotelNum:hotelNum,
            hotelname:hotelname,
            location:location,
            hotelTele:hotelTele,
            description:description
        }
    
        console.log(data)
    
        axios.put(`http://localhost:8070/post/update/${id}`,data).then((res)=>{
            if(res.data.success){
                alert("Updated Successfully")
                this.setState({
                    hotelNum:"",
                    hotelname:"",
                    location:"",
                    hotelTele:"",
                    description:""
                })
            }
        })
    }


    componentDidMount(){
        const id = this.props.match.params.id;
    
        axios.get(`http://localhost:8070/post/${id}`).then((res) =>{
            if(res.data.success){
                this.setState({
                    hotelNum:res.data.post.hotelNum,
                    hotelname:res.data.post.hotelname,
                    location:res.data.post.location,
                    hotelTele:res.data.post.hotelTele,
                    description:res.data.post.description
                });
    
            console.log(this.state.post);
            }
        });
    }

    render(){
        return(
            
            <><IndexHeader /><IndexNavbar />
            <div style={{ paddingTop: "50px" }} className={styles.body}>
                <br /><br /><h3 className={styles.header} style={{ textAlign: 'center' }}>Insert Hotel Details</h3><br /><br />
                <div className={styles.FormContainer}>
    
                <form>
    
    
    
                    <Label>Hotel Number </Label><br/>
                    <Input type="text"
                        name="hotelNum"
                        placeholder="Enteer Hotel Registraion NUmber"
                        value={this.state.hotelNum}
                        onChange={this.handleInputChange} /><br/><br/>
    
    
    
                    <Label>Hotel Name </Label><br/>
                    <Input type="text"
                        name="hotelname"
                        placeholder="Enteer Hotel Name"
                        value={this.state.hotelname}
                        onChange={this.handleInputChange} /><br/><br/>
    
    
                    <Label>Hotel Location </Label><br/>
                    <Input type="text"
                        name="location"
                        placeholder="Enteer hotel Location"
                        value={this.state.location}
                        onChange={this.handleInputChange} /><br/><br/>
    
    
                    <Label>Hotel Telephone </Label><br/>
                    <Input type="number"
                        name="hotelTele"
                        placeholder="Enteer telephone Number"
                        value={this.state.hotelTele}
                        onChange={this.handleInputChange} /><br/><br/>
    
    
    
                    <Label>Description about Hotel </Label><br/>
                    <Input type="text"
                        name="description"
                        placeholder="Enteer Description"
                        value={this.state.description}
                        onChange={this.handleInputChange} /><br/><br/>
    
                    <Button  type="submit" style={{float:'right' , margin : "5px" ,color : "primary"}} onClick={this.onSubmit}>
                        &nbsp;
                        Update Details
                    </Button>
    
                </form>
    
                </div>
            </div>
            <DemoFooter />
           </>
           
        )
      }
    }
             