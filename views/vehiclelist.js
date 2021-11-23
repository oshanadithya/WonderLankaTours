
import vehicleStyles from "../assets/css/ViewVehicleList.module.css";


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
function Vehiclelist(){
    
    let history = useHistory();

    const [vehicles , setVehicles] = useState([]);
    const [message , setMessage] = useState("");
    const [searchVal , setSearchVal] = useState("");

  




    

    useEffect(() => {
        axios.get("http://localhost:8070/vehicles/").then((res) =>{
            setVehicles(res.data);
            console.log(res.data);
        }).catch((err) =>{
            console.log(err);
        })
    
      }, []);

    

    function onDelete(vehicle)  {
        if (
            window.confirm(
              "Vehicle " + vehicle.vid + " will be removed from the database"
            )
        )
        axios.delete(`http://localhost:8070/vehicles/${vehicle._id}`).then((res) =>{
            console.log(res);
            
           // setMessage("Vehicle Deleted!");
            toast.error('Vehicle Deleted!', {
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
            
            <center><h1>Company Vehicle Details</h1><br/><br/></center>

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
              <Label style = {{marginLeft : "70px"}} check>
                <Input type="checkbox"/>{" "} 
                <label style ={{marginRight : "40px"}}>Vehicle ID</label>
              </Label>

              <Label check>
                <Input type="checkbox"/>{" "}
                <label style ={{marginRight : "40px"}}>Vehicle Type</label>
              </Label>

              <Label check>
                <Input type="checkbox" />{" "}
                <label style ={{marginRight : "40px"}}>Vehicle Name</label>
              </Label>
            </div>
          </Col>
          <Col></Col>
        </Row>

           <center>
                <table width ="90%" border ="2px"className = {vehicleStyles.tbldata}>
                    <tr>
                       
                        <th className={vehicleStyles.tbldata}>Vehicle Type</th>
                     <th className={vehicleStyles.tbldata}>Vehicle Name</th>
              <th className={vehicleStyles.tbldata}>Vehicle ID</th>
              <th className={vehicleStyles.tbldata}>Date</th>
              <th className={vehicleStyles.tbldata}>Vehicle Number</th>
              <th className={vehicleStyles.tbldata}>Actions</th>
                       
                    </tr>

                    <tbody>
                        
                        {vehicles.filter((val) =>{
                          
                          if(searchVal === ''){
                            return val;
                          }
                        //  else if (val.vid.toLowerCase().includes(searchVal.toLowerCase())){
                           // return val;
                         // }
                          else if (val.vtype.toLowerCase().includes(searchVal.toLowerCase())){
                            return val;
                          }
                          else if (val.vname.toLowerCase().includes(searchVal.toLowerCase())){
                            return val;
                          }
                          

                          
                        
                        }).map((vehicle) =>(
                         
                            
                            <tr className={vehicleStyles.tbldata}>
                                
                                <td className={vehicleStyles.tbldata}>{vehicle.vtype}</td>
                                <td className={vehicleStyles.tbldata}>{vehicle.vname}</td>
                                <td className={vehicleStyles.tbldata}>{vehicle.vid}</td>
                                <td className={vehicleStyles.tbldata}>{vehicle.date.substring(0,10)}</td>
                                <td className={vehicleStyles.tbldata}>{vehicle.vnumber}</td>
                               
                               
                                
                                <td className={vehicleStyles.tbldata}>
                                

								 <button 
                                   className={vehicleStyles.btnEdit}
                                onClick = {()=>{
                                    history.push(`/edit-vehicle/${vehicle._id}`);
                                }}
                                >Edit</button>

                                <button  className={vehicleStyles.btnDelete}
                                onClick = {() =>{
                                    
                                    onDelete(vehicle);
                                }}
                                    
                               
                                >Delete</button>
                               </td>
                            </tr>
                            
                        ))}
                    </tbody>    


                </table>
                </center>
            
            <span style = {{textAlign:"left" , color : "red"}}>{message}</span> <br/><br/>
            <DemoFooter />
           
        </div>   
    );


}

export  default Vehiclelist;

