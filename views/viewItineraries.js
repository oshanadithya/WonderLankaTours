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
function ViewItineraries(){
    
    let history = useHistory();

    const [itineraries , setItineraries] = useState([]);
    const [message , setMessage] = useState("");
    const [searchVal , setSearchVal] = useState("");

  




    

    useEffect(() => {
        axios.get("http://localhost:8070/itineraries/").then((res) =>{
            setItineraries(res.data);
            console.log(res.data);
        }).catch((err) =>{
            console.log(err);
        })
    
      }, []);

    

    function onDelete(itinerary)  {
        if (
            window.confirm(
              "Itinerary " + itinerary.itineraryId + " will be removed from the database"
            )
        )
        axios.delete(`http://localhost:8070/itineraries/delete/${itinerary._id}`).then((res) =>{
            console.log(res);
            
            setMessage("Itinerary Deleted!");
            toast.error('Itinerary Deleted!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            
        }).catch((err) =>{
            console.log(err);
            alert("Error!");
        })
    }
 

    var number = 1;
    
    return(
        
        <div>
            <IndexNavbar />
            <IndexHeader />
            <h3 style ={{marginLeft:"40px"}}>Tour Itinerary Details</h3><br/><br/>

            <Row>
          <Col>
            <FormGroup>
              <InputGroup style = {{marginLeft : "40px"}} className="form-group-no-border">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search by Itineray Name" type="text" 
                    onChange = {(e) =>{
                                setSearchVal(e.target.value);
                    }}/>
              </InputGroup>
            </FormGroup>
          </Col>
          {/* <Col>
            <div>
              <Label style = {{marginLeft : "40px"}} check>
                <Input type="checkbox"/>{" "} 
                <label style ={{marginRight : "40px"}}>ID</label>
              </Label>

              <Label check>
                <Input type="checkbox"/>{" "}
                <label style ={{marginRight : "40px"}}>Name</label>
              </Label>

              <Label check>
                <Input type="checkbox" />{" "}
                <label style ={{marginRight : "40px"}}>Class</label>
              </Label>
            </div>
          </Col> */}
          <Col></Col>
        </Row>

            <div style = {{marginLeft:"20px"}}  className = "tableContainer">
                <table className = "table table-striped">
                    <thead>
                        <th scope = "col">#</th>
                        <th scope = "col">Itinerary ID</th>
                        <th scope = "col">Itinerary Name</th>
                        <th scope = "col">Itinerary Days</th>
                        <th scope = "col">Itinerary Description</th>
                        <th scope = "col">Itinerary Image</th>
                        <th scope = "col">Itinerary CoverImage</th>
                        <th scope = "col">Itinerary Class</th>
                        <th scope = "col">Itinerary Price Per Adult</th>
                        <th scope = "col">Itinerary Price for Children</th>
                        <th scope = "col">Operations</th>

                    </thead>

                    <tbody>
                        
                        {itineraries.filter((val) =>{
                          
                          if(searchVal === ''){
                            return val;
                          }
                          else if (val.itineraryName.toLowerCase().includes(searchVal.toLowerCase())){
                            return val;
                          }
                        
                        }).map((itinerary) =>(
                            
                            <tr>
                                <th scope = "row">{number++}</th>
                                <td>{itinerary.itineraryId}</td>
                                <td>{itinerary.itineraryName}</td>
                                <td>{itinerary.itineraryDays}</td>
                                <td>{itinerary.itineraryDesc}</td>
                                <td>{itinerary.itineraryImage}</td>
                                <td>{itinerary.itineraryCoverImage}</td>
                                <td>{itinerary.itineraryClass}</td>
                                <td>{itinerary.itineraryPriceAdult}</td>
                                <td>{itinerary.itineraryPriceChild}</td>

                                <td><Button color="warning"  style = {{padding: "5px 5px 5px 5px" , width : "80px" , marginBottom : "8px"}}
                                onClick = {()=>{
                                    history.push(`/edit-itinerary/${itinerary._id}`);
                                }}
                                >Edit</Button>

                                <Button color="danger" style = {{padding: "5px 5px 5px 5px", width : "80px"}}
                                onClick = {() =>{
                                    
                                    onDelete(itinerary);
                                }}
                                    
                               
                                >Remove</Button>
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

export  default ViewItineraries;

