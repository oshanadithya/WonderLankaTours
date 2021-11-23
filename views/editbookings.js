
import React,{Component} from "react";
import editbook from '../assets/css/EditBooking.module.css'
import axios from 'axios';
// reactstrap components


import{
  Label,
  Input,
  Button
}
from 'reactstrap'


// core components

class Editbookings extends Component {

 constructor(props){
    super(props);
    this.state = {
        tourId:"",
        arrivalDate:"",
        bookingDate:"",
        email:"",
        mobileno:"",
        noOfAdults:"",
        noOfKids18:"",
        noOfKids8:"",
        insurance:"",
        itinerary:"",
        fullName:"",
        iclass:"",
        mobileNo:"",
        payment:"",
        country:"",
        username:""
    }
 }

 handleInputchange = (e) =>{
     const {name,value} = e.target;
     this.setState({
         ...this.state,
         [name]:value
     })
 }

 onsubmit = (e) =>{
     
     e.preventDefault();
     const id = this.props.match.params.id;
     const{tourId,arrivalDate,bookingDate,email,
     noOfAdults,noOfKids18,noOfKids8,insurance,itinerary,fullName,iclass,
     payment,mobileNo,country,username} = this.state;

     const data ={
        tourId:tourId,
        arrivalDate:arrivalDate,
        bookingDate:bookingDate,
        email:email,
        mobileNo:mobileNo,
        noOfAdults:noOfAdults,
        noOfKids18:noOfKids18,
        noOfKids8:noOfKids8,
        insurance:insurance,
        itinerary:itinerary,
        fullName:fullName,
        iclass:iclass,
        payment:payment,
        country:country,
        username:username
     }

     console.log(data);

     axios.put(`/post/update/${id}`,data).then((res)=>{
         if(res.data.success){
            alert("updated successfuly")
            this.setState(
                 {
                    tourId:"",
                    arrivalDate:"",
                    bookingDate:"",
                    email:"",
                    mobileNo:"",
                    noOfAdults:"",
                    noOfKids18:"",
                    noOfKids8:"",
                    insurance:"",
                    itinerary:"",
                    fullName:"",
                    iclass:"",
                    payment:"",
                    country:"",
                    username:""
                 }
             )
          }})
          window.location = '/booktable';
 }
 

 componentDidMount(){
    const id = this.props.match.params.id;
    axios.get(`/book/${id}`).then((res) =>{
        if(res.data.success){
            this.setState({
                tourId:res.data.post.tourId,
                arrivalDate:res.data.post.arrivalDate,
                bookingDate:res.data.post.bookingDate,
                email:res.data.post.email,
                mobileNo:res.data.post.mobileNo,
                noOfAdults:res.data.post.noOfAdults,
                noOfKids18:res.data.post.noOfKids18,
                noOfKids8:res.data.post.noOfKids8,
                insurance:res.data.post.insurance,
                itinerary:res.data.post.itinerary,
                fullName:res.data.post.fullName,
                iclass:res.data.post.iclass,
                payment:res.data.post.payment,
                country:res.data.post.country,
                username:res.data.post.username
            });
            console.log(this.state.post);
        }
    });
}

  render(){
    return(

      <div>
          <br/><br/><h3 style = {{textAlign : 'center'}}>Edit Tour Booking Details</h3><br/><br/>
          <div className = {editbook.FormContainer}>
          <form >

              <Label for = "exampleEmail">Tour ID</Label><br/>
              <Input type="text" value = {this.state.tourId} onChange={this.handleInputchange} name="tourId" id="exampleEmail"/>
              <br/>
              
        <Label for="exampleEmail">Arrival Date</Label>
        <Input type="text" value = {this.state.arrivalDate} onChange={this.handleInputchange}  name="arrivalDate" id="exampleEmail"  />
        <br/>
      
        <Label for="exampleEmail">Booking Date</Label>
        <Input type="text" name="bookingDate" value = {this.state.bookingDate} onChange={this.handleInputchange} id="exampleEmail"  />
        <br/>
      
        <Label for="exampleEmail">Email</Label>
        <Input type="text" name="email" value = {this.state.email} onChange={this.handleInputchange} id="exampleEmail"  />
        <br/>

      
        <Label for="exampleEmail">Full Name</Label>
        <Input type="text" value = {this.state.fullName} onChange={this.handleInputchange} name="fullName" id="exampleEmail"  />
        <br/>
      
        <Label for="exampleEmail">iClass</Label>
        <Input type="text" name="iclass" value = {this.state.iclass} onChange={this.handleInputchange} id="exampleEmail"  />
        <br/>
      
        <Label for="exampleEmail">Insurance</Label>
        <Input type="text" name="insurance" value = {this.state.insurance} onChange={this.handleInputchange} id="exampleEmail"  />
        <br/>
      
        <Label for="exampleEmail">Itinerary</Label>
        <Input type="text" name="itinerary" value = {this.state.itinerary} onChange={this.handleInputchange} id="exampleEmail"  />
        <br/>
      
        <Label for="exampleEmail">No of adults</Label>
        <Input type="text" name="noOfAdults" value = {this.state.noOfAdults} onChange={this.handleInputchange} id="exampleEmail"  />
        <br/>
      
        <Label for="exampleEmail">Country</Label>
        <Input type="text" name="country" value = {this.state.country} onChange={this.handleInputchange} id="exampleEmail"  />
        <br/>

      
        <Label for="exampleEmail">No of kids18</Label>
        <Input type="text" name="noOfKids18" value = {this.state.noOfKids18} onChange={this.handleInputchange} id="exampleEmail"  />
        <br/>
      
        <Label for="exampleEmail">No of kids8</Label>
        <Input type="text" name="noOfKids8" value = {this.state.noOfKids8} onChange={this.handleInputchange}  id="exampleEmail"  />
        <br/>
      
        <Label for="exampleEmail">Payment</Label>
        <Input type="text" name="payment" value = {this.state.payment} onChange={this.handleInputchange} id="exampleEmail"  />
        <br/>
      
        <Label for="exampleEmail">Mobile No</Label>
        <Input type="text" name="mobileNo" value = {this.state.mobileNo} onChange={this.handleInputchange} id="exampleEmail"  />
        <br/>
        <Label for="exampleEmail">User name</Label>
        <Input type="text" name="username" value = {this.state.username} onChange={this.handleInputchange} id="exampleEmail"  />
        <br/>
              <Button  onClick={this.onsubmit} type = "submit" color = "warning" style = {{float:'right' , margin : "5px" }} >Edit Booking</Button>

          </form>    
          </div>
      </div>   

  );
  }
}
export default  Editbookings;
