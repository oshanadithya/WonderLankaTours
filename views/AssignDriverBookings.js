import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import driverStyles from "../assets/css/DriverAssign.module.css";
import IndexHeader from "components/Headers/IndexHeader";
import IndexNavbar from "components/Navbars/IndexNavbar";
import DemoFooter from "components/Footers/DemoFooter";
import {
  Label,
  Input,
  Button,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormGroup,
  Alert,
  Container,
} from "reactstrap";
import { useHistory } from "react-router";



function AssignDriver(){



    const [bookings , setBookings] = useState([]);
    const [drivers , setDrivers] = useState("");

    useEffect(()=>{
        axios.get("http://localhost:8070/bookings/").then((res) =>{
            setBookings(res.data);
        })
    },[])
    let history = useHistory();
    var number = 1;



    useEffect(() => {
  
      bookings.forEach(({ tourId }) => {
        axios.get(`http://localhost:8070/assignedDrivers/check/${tourId}`).then((res) =>{
          if(res.data === true){
            axios.get(`http://localhost:8070/assignedDrivers/get/${tourId}`)
            .then(res => {
              setDrivers(drivers => ({
                ...drivers,
                [tourId]: res.data.driverId,
              }));
            })
          }

        })
      
      });
    
    }, [bookings]);

  
    return(
        
        <div>
          
            <IndexNavbar />
            <IndexHeader />
            <Container>
            
            <center><h1 style ={{marginLeft:"40px"}}>Assigned Drivers</h1></center>
            <br/><br/>

            <Row>
          <Col>
            <FormGroup>
              <InputGroup style = {{marginLeft : "40px"}} className="form-group-no-border">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search " type="text" 
/>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col>
            <div>
              <Label style = {{marginLeft : "40px"}} check>
                <Input type="checkbox"/>{" "} 
                <label style ={{marginRight : "40px"}}>Tour ID</label>
              </Label>
            </div>
          </Col>
          <Col></Col>
        </Row>

            <div style = {{marginLeft:"30px"}}  className = "tableContainer">
                <table className="table" >
                    <thead>
                       
                        <th className={driverStyles.tbldata} scope = "col">Tour ID</th>
                        <th className={driverStyles.tbldata} scope = "col">Booking Date</th>
                        <th className={driverStyles.tbldata} scope = "col">Arrival Date</th>
                        <th className={driverStyles.tbldata} scope = "col">Country </th>
                        <th className={driverStyles.tbldata} scope = "col">Driver Assigned </th>
                        <th className={driverStyles.tbldata} scope = "col">Operation</th>

                    </thead>

                    <tbody>
                        
                        {bookings.map((booking) =>(
                            
                            <tr>
                               
                                <td  className={driverStyles.tbldata}>{booking.tourId}</td>
                                <td  className={driverStyles.tbldata}>{booking.bookingDate}</td>
                                <td  className={driverStyles.tbldata}>{booking.arrivalDate}</td>
                                <td  className={driverStyles.tbldata}>{booking.country}</td>
                               <td  className={driverStyles.tbldata}> {drivers[booking.tourId]}</td>
                                <td  className={driverStyles.tbldata}><button  className={driverStyles.btnAssign} style = {{padding: "5px 5px 5px 5px" , width : "90px" , marginBottom : "8px"}}
                                onClick = {()=>{
                                    history.push(`/assign-driver/${booking.username}`);
                                }}
                                >Assign</button>
                               </td>
                            </tr>
    
                        ))}
                    </tbody>    


                </table>
            </div>  
            </Container> 
            
            <DemoFooter />
         
        </div>    
    );

}

export default AssignDriver;