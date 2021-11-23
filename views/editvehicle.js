import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import styles from'../assets/css/AddVehicle.module.css';
import{
  Label,
  Input,
  FormGroup,
  FormText,
  Button
}
from 'reactstrap'

import IndexHeader from 'components/Headers/IndexHeader';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import DemoFooter from 'components/Footers/DemoFooter';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export default class Editvehicle extends Component {
  constructor(props) {
    super(props);

    this.onChangeVtype = this.onChangeVtype.bind(this);
    this.onChangeVname = this.onChangeVname.bind(this);
    this.onChangeVid = this.onChangeVid.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeVnumber = this.onChangeVnumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      vtype: '',
      vname: '',
      vid: '',
      date: new Date(),
      vnumber: '',
      types: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8070/vehicles/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          vtype: response.data.vtype,
          vname: response.data.vname,
          vid: response.data.vid,
          date: new Date(response.data.date),
          vnumber: response.data.vnumber,
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:8070/types/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            types: response.data.map(type => type.vtype),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeVtype(e) {
    this.setState({
      vtype: e.target.value
    })
  }

  onChangeVname(e) {
    this.setState({
      vname: e.target.value
    })
  }

  onChangeVid(e) {
    this.setState({
      vid: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onChangeVnumber(e) {
    this.setState({
      vnumber: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const vehicle = {
      vtype: this.state.vtype,
      vname: this.state.vname,
      vid: this.state.vid,
      date: this.state.date,
      vnumber: this.state.vnumber
    }

    console.log(vehicle);

    axios.post('http://localhost:8070/vehicles/update/' + this.props.match.params.id, vehicle)
      .then(res => console.log(res.data));

   // window.location = '/';
    toast.success('Vehicle Edited!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  render() {
    return (

       
      

      <div>
            <IndexHeader />
            <IndexNavbar />
            {/* <br/><br/><h2 style = {{textAlign : 'center'}}><b>Edit Vehicle Details</b></h2><br/><br/> */}
            <br/><center><h1><b>Edit Vehicle Details</b></h1><br/><br/></center>
            <div className = {styles.FormContainer}>
      <br></br>
      
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
        <label><font color ="black"><b>Vehicle Type: </b> </font> </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.vtype}
              onChange={this.onChangeVtype}>
              {
                this.state.types.map(function(type) {
                  return <option 
                    key={type}
                    value={type}>{type}
                    </option>;
                })
              }
          </select>
        </div>

        

        <div className="form-group"> 
        <label> <font color ="black"><b> Vehicle Name: </b> </font> </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.vname}
              onChange={this.onChangeVname}
              />
        </div>

        

        <div className="form-group">
        <FormGroup>
        <label> <font color ="black"><b> Vehicle ID: </b> </font> </label>
          <input 
              pattern="[V][0-9]{3}"
              type="text" 
              className="form-control"
              value={this.state.vid}
              onChange={this.onChangeVid}
              />
              {/* <FormFeedback valid>Good! that is available</FormFeedback> */}
              <FormText>enter valid vehicle ID "VXXX</FormText>
              </FormGroup>
        </div>

        

        <div className="form-group">
        <label> <font color ="black"><b> Date: </b> </font> </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        

        {/* import vehicle number */}

        <div className="form-group"> 
        <label> <font color ="black"><b> Vehicle Name: </b> </font> </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.vnumber}
              onChange={this.onChangeVnumber}
              />
        </div>

        

         <br></br>

         <Button color = "primary" type = "submit" style = {{float:'right' , margin : "5px" }}
                onClick = {() =>{
                   ;
                }}
                >EDIT Vehicle</Button>
      </form>
       
       </div>
       <DemoFooter />
       </div>
       
    )
  }
}