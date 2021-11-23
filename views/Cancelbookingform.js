import styles from '../assets/css/AddBookingCancellation.module.css'
import React,{Component} from "react";
import './section.css';
import axios from 'axios';
import IndexHeader from 'components/Headers/IndexHeader';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import DemoFooter from 'components/Footers/DemoFooter';
import validator from 'validator'

// reactstrap components


import{
  Label,
  Input,
  Button
}
from 'reactstrap'
import PDF from './BookingReport';



// core components

class Cancelbookingform extends Component {

  constructor(props){
    super(props);
    this.state={
      tourId:"",
      cancellationdate:"",
      reason:"Company Reason",
      amount:"",
      dateerror:"",
      tourIderror:"",
      amounterror:"",
      postSubmitted:false
    }
  }
  


  handleInputChange =(e) =>{
     const {name,value} = e.target;//get user inputed values and destructure
     this.setState({
         ...this.state,
        [name]:value
     })
  }
 
  validate =() =>{
    let dateerror = "";
    let amounterror = "";
    let tourIderror = "";
    

    if(!validator.isDate(this.state.cancellationdate)){
      dateerror = "Please enter valid date format "
    }

    if(!this.state.tourId){
      tourIderror = "TourId cannt be blank";
    }
    if(!this.state.cancellationdate){
      dateerror = "date cannot be blank";
    }
    if(!this.state.cancellationdate){
      dateerror = "date cannot be blank";
    }
    if(!this.state.amount){
      amounterror = "amount cannot be blank";
    }
    if(this.state.amount<0){
      amounterror = "amount cannot be negative";   
    }

    if(tourIderror||dateerror||amounterror){
      this.setState({dateerror,amounterror,tourIderror});
      return false;
    }
    return true;
  }
  onsubmit = (e) =>{
   
    e.preventDefault();
    const isValid = this.validate();
    if(isValid){
      console.log(this.state);
      this.setState()
      const {tourId,cancellationdate,reason,amount} = this.state;
    const data ={
       tourId:tourId,
       cancellationdate:cancellationdate,
       reason:reason,
       amount:amount
    }

    console.log(data);
    axios.post("/cancel/save",data).then((res)=>{
      if(res.data.success){
         this.setState(
              {
               postSubmitted:true
              }
          )
       }
       
      })
   
    } 
    
    
      
}


componentDidMount(){
  const id = this.props.match.params.id;
  axios.get(`/book/${id}`).then((res) =>{
      if(res.data.success){
          this.setState({
              tourId:res.data.post.tourId
          });
          console.log(this.state.post);
      }
  });
}


   
  render(){
    return(
      <>

      
      <IndexHeader />
      <IndexNavbar />
      { !this.state.postSubmitted ?(
      <div style = {{paddingTop : "50px"}} className = {styles.body}>
          <br/><br/><h3 className = {styles.header} style = {{textAlign : 'center'}}>Insert Booking Cancellation Details</h3><br/><br/>
          <div className = {styles.FormContainer}>
          <form >
          
        <Label for="exampleEmail">Tour ID</Label>
        <Input type="text" value={this.state.tourId} onChange={this.handleInputChange} name="tourId" id="exampleEmail"  />
        <div style={{color:'red'}}>{this.state.tourIderror}</div>
        <br/>
        
        <Label for="examplePassword">Cancellation Date</Label>
        <Input type="text" value={this.state.cancellationdate} onChange={this.handleInputChange} name="cancellationdate" id="examplePassword" placeholder="Enter date" />
        <div style={{color:'red'}}>{this.state.dateerror}</div>
        <br/>
      
        <Label for="exampleSelect">Reason</Label>
        <Input type="select" value={this.state.reason} onChange={this.handleInputChange} name="reason" id="exampleSelect">
          <option>Company Reason</option>
          <option>User Request</option>
        </Input>
        <br/>
      
      
        <Label for="examplePassword">Amount</Label>
        <Input type="number"  value={this.state.amount}  onChange={this.handleInputChange} name="amount" id="examplePassword" placeholder="Enter amount" />
        <div style={{color:'red'}}>{this.state.amounterror}</div>
        <br/>
                
        <Button color = "primary" type = "submit" style = {{float:'right' , margin : "5px" }}
        onClick={this.onsubmit} 
        >Submit</Button>
          </form>    
          </div>
      </div>): (
          <PDF  tourId={this.state.tourId} cancellationdate={this.state.cancellationdate} reason={this.state.reason} amount={this.state.amount} />
      )
  }
      <DemoFooter />
     </>     
  );
  }
  
}
export default  Cancelbookingform;
