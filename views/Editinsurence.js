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
function Editinsurence(){
    
    let history = useHistory();

    const [planes , setinsurencePlans] = useState([]);
    const [message , setMessage] = useState("");
    const [searchVal , setSearchVal] = useState("");



    useEffect(() => {
        axios.get('http://localhost:8070/insurences/').then((res) =>{
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
            <h3 style ={{marginLeft:"40px"}}>Insurance Plan Details</h3>
            <h5 style ={{marginLeft:"40px"}}>Search or Select the Plans Below to Edit</h5><br/><br/>

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
                        <th scope = "col">Insurance Plan ID</th>
                        <th scope = "col">Insurance Plan Name</th>
                        <th scope = "col">Insurance PLan Price</th>
                        <th scope = "col">Insurance Plan Coverage</th>
                        <th scope = "col">Insurance Plan Accident types</th>
                        <th scope = "col">Insurance PLan Description</th>
                        <th scope = "col">Action</th>

                    </thead>

                    <tbody>

                    {planes.filter((val) =>{
                          
                          if(searchVal === ''){
                            return val;
                          }
                          else if (val.InsurenceID.toLowerCase().includes(searchVal.toLowerCase())){
                            return val;
                          }
                          else if (val.InsurenceName.toLowerCase().includes(searchVal.toLowerCase())){
                            return val;
                          }
                        
                        }).map((Insurence) =>(
                            
                            <tr>
                                <th scope = "row">{number++}</th>
                                <td>{Insurence.InsurenceID}</td>
                                <td>{Insurence.InsurenceName}</td>
                                <td>{Insurence.InsurencePrice}</td>
                                <td>{Insurence.InsurenceCoverage}</td>
                                <td>{Insurence.InsurenceAccidentType}</td>
                                <td>{Insurence.InsurenceDetails}</td>
                               

                                <td><Button color="warning"  style = {{padding: "5px 5px 5px 5px" , width : "80px" , marginBottom : "8px"}}
                                onClick = {()=>{
                                    history.push(`/edit-form-insurence/${Insurence._id}`);
                                }}
                                >Edit</Button>

                               </td>
                            </tr>
    
                        ))}
                    </tbody>    


                </table>
            </div>   
            <span style = {{textAlign:"left" , color : "red"}}>{message}</span> <br/><br/>
            <DemoFooter />
        </div>    
    );


}

export  default Editinsurence;

