import React, { Component } from 'react';
import axios from 'axios';

import { Alert } from 'reactstrap';

import styles from'../assets/css/AddVtype.module.css';
import{
  Label,
  Input,
  Button
}
from 'reactstrap'

import { useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import IndexHeader from 'components/Headers/IndexHeader';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import DemoFooter from 'components/Footers/DemoFooter';


export default class vtype extends Component {
    constructor(props) {

        super(props);
    
        this.onChangeVtype = this.onChangeVtype.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          vtype: '',
        }
      }
    
      onChangeVtype(e) {
        this.setState({
          vtype: e.target.value
        })
      }
    
      onSubmit(e) {
        e.preventDefault();
    
        const type = {
          vtype: this.state.vtype
        }
        console.log(type);

        axios.post('http://localhost:8070/types/add', type)
        .then(res => console.log(res.data));
        
        toast.success('Vehicle Added!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          }); 


        this.setState({
            vtype: ''
          })
    }


    render() {
        return (

          <>
          <IndexHeader />
        <IndexNavbar />

          
          
        <div style = {{paddingTop : "50px"}} className = {styles.body}>
            
            <center><h1><b>Add New Vehicle Type</b></h1><br/><br/></center>
            <div className = {styles.FormContainer}>
          
          
          
          

           {/* <h3> <font color ="Black"><b>  CREATE NEW VEHICLE TYPE </b></font> </h3> */}
         <br></br>
          <form onSubmit={this.onSubmit}>
           <div className="form-group"> 
            <label> <font color ="Black"> <h3>Vehicle Type: </h3> </font> </label>
             <input  type="text"
                required
                className="form-control"
                value={this.state.vtype}
                onChange={this.onChangeVtype}
                />
          </div>
          <br></br>
          <br></br>
          <Button color = "primary" type = "submit" style = {{float:'right' , margin : "5px" }}
                onClick = {() =>{
                   ;
                }}
                >ADD TYPE</Button>
                
          
        </form>
        
        </div>
        </div> 
            
            
         <DemoFooter />
        </>
        )
    }
}