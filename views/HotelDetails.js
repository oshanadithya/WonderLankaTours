import React, {Component} from 'react';
import axios from 'axios';
import hotelStyles from "../assets/css/ViewHotels.module.css";
import IndexHeader from "components/Headers/IndexHeader";
import IndexNavbar from "components/Navbars/IndexNavbar";
import DemoFooter from "components/Footers/DemoFooter";

import {
  Label,
  Input,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormGroup,
} from "reactstrap";




export default class hotelDetails extends Component{
  constructor(props){
    super(props);

    this.state={
      hotels:[]
    };
  }

componentDidMount(){
  this.retriveHotels();
}

  retriveHotels(){
    axios.get("http://localhost:8070/posts").then(res =>{
      if(res.data.success){
        this.setState({
          hotels:res.data.existingHotels
        });
      console.log(this.state.hotels)
      }

    });
  }


onDelete = (id) =>{
    axios.delete(`http://localhost:8070/post/delete/${id}`).then((res) =>{
        alert("Hotel Deleted Successfully");
        this.retriveHotels();
    })
}


  render(){
    return(
      <>
      <IndexHeader />
      <IndexNavbar />
      <div className={hotelStyles.viewGuideDiv}>
        <h3>View Hotels And Restaurant</h3>
        <br />
        <br />
        <Row>
          <Col>
            <FormGroup>
              <InputGroup className="form-group-no-border">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search " type="text" />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col>
          <div>
          <Label check>
                <Input type="checkbox" />{" "}
                <label className={hotelStyles.checkBoxLabel}>Hotel ID</label>
              </Label>

              <Label check>
                <Input type="checkbox" />{" "}
                <label className={hotelStyles.checkBoxLabel}>Restauran ID</label>
              </Label>

              <Label check>
                <Input type="checkbox" />{" "}
                <label className={hotelStyles.checkBoxLabel}>Distric Name</label>
              </Label>
            </div>
          </Col>
          <Col></Col>
        </Row>
      <table width="100%" border="2px" className={hotelStyles.tbldata}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Hotel Registraion No</th>
            <th scope="col">Hotel Name</th>
            <th scope="col">Hotel Location</th>
            <th scope="col">Telephone Number</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

          <tbody>
              {this.state.hotels.map((posts,index) =>(
                  <tr>
                    <th scope="row">{index+1}</th>
                    
                    <td>
                      
                        {posts.hotelNum}
                       
                    </td>

                    <td>{posts.hotelname}</td>
                    <td>{posts.location}</td>
                    <td>{posts.hotelTele}</td>
                    <td>{posts.description}</td> 
                    <td>
                      <a className={hotelStyles.btnEdit} href={`/edit/${posts._id}`}>
                        <i className="fas fa-edit"></i>&nbsp;Edit
                      </a>
                      &nbsp;&nbsp;&nbsp;
                      <a className={hotelStyles.btnDelete} href="#" onClick={() => this.onDelete(posts._id)}>
                        <i className="fas fa-trash-alt"></i>&nbsp;Delete
                      </a>
                    </td>
                </tr>
         
        ))}

          </tbody>






      </table>
       
      </div>
           
           
         
       <DemoFooter />
       </>  
    )
  }
  
}