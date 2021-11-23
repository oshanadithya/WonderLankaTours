import{Button} from 'reactstrap'
import{ useHistory } from "react-router-dom"
import { useState } from 'react';
import { useEffect } from 'react';
import IndexHeader from 'components/Headers/IndexHeader';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import DemoFooter from 'components/Footers/DemoFooter';
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {
    Label,
    Input,
    Row,
    Col,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormGroup,
    Alert,
    Container,
  } from "reactstrap";

toast.configure();
function InsuranceReport(){
    
    let history = useHistory();

    const [planes , setinsurencePlans] = useState([]);
    const [searchVal , setSearchVal] = useState("");



    useEffect(() => {
        axios.get('http://localhost:8070/insurences/report').then((res) =>{
          setinsurencePlans(res.data);
            console.log(res.data);
        }).catch((err) =>{
            console.log(err);
        })
    
      }, []);
 

    var number = 1;
    
    return(
        
        <div>
            <IndexNavbar />
            <IndexHeader />
            <h3 style ={{marginLeft:"40px"}}>Insurance Plan Report</h3>
            <h5 style ={{marginLeft:"40px"}}>Search by the Customer or Insurance Packages</h5><br/><br/>

            <Row>
          <Col>
            <FormGroup>
              <InputGroup style = {{marginLeft : "70px"}} className="form-group-no-border">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search " type="text" 
                    onChange = {(e) =>{
                                setSearchVal(e.target.value);
                    }}/>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col>
            <div>

            </div>
          </Col>
          <Col></Col>
        </Row>
            <div style = {{marginLeft:"20px"}}  className = "tableContainer">
                <table className = "table table-striped">
                    <thead>
                        <th scope = "col">#</th>
                        <th scope = "col">Customer Name</th>
                        <th scope = "col">Insurance Plan Name</th>
                        <th scope = "col">No Of Adultes</th>
                        <th scope = "col">No of Kids(Under 18) </th>
                        <th scope = "col">No of Kids(Under 8)</th>

                    </thead>

                    <tbody>

                    {planes.filter((val) =>{
                          
                          if(searchVal === ''){
                            return val;
                          }
                          else if (val.fullName.toLowerCase().includes(searchVal.toLowerCase())){
                            return val;
                          }
                          else if (val.insurance.toLowerCase().includes(searchVal.toLowerCase())){
                            return val;
                          }
                        
                        }).map((Booking) =>(
                            
                            <tr>
                                <th scope = "row">{number++}</th>
                                <td>{Booking.fullName}</td>
                                <td>{Booking.insurance}</td>
                                <td>{Booking.noOfAdults}</td>
                                <td>{Booking.noOfKids18}</td>
                                <td>{Booking.noOfKids8}</td>
                            </tr>
    
                        ))}
                    </tbody>    


                </table>
            </div>   
            <DemoFooter />
        </div>    
    );


}

export  default InsuranceReport;

