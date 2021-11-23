import{Button} from 'reactstrap'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Row, Col, Card , Container } from "reactstrap";
import { jsPDF } from "jspdf";
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Input,
    
  } from "reactstrap";

function ItineraryReport(){

    let doc;
    let history = useHistory();


    const [bookings , setBookings] = useState ([]);
    const [date, setdate] = useState();
    const [selectedDate , filteredDate] = useState("01"); 
    const [selectedYear , filteredYear] = useState("2021");

    useEffect(()=>{
            axios.get("http://localhost:8070/bookings/").then((res) =>{
            setBookings(res.data);
            let today = new Date().toISOString().slice(0, 10);
            setdate(today);
    })
})
    var number = 1;

    const downloadPDF = () => {
 
        doc = new jsPDF({
          orientation : "landscape",
          unit :"pt",
          format : [1700,1000]
        })
        doc.html(document.getElementById("report-cont"), {
          callback: function (pdf) {
            pdf.save("CustomItineraryReport.pdf");
          },
        });
      };

    return(
        <>
          <Container>
            <div>
                <h3>Customized Itinerary Report</h3><br/><br/>
                <div style = {{display : "flex" , flexDirection : "row" }}>
                <div style = {{width : "30%" }}>
                    <h5>Select Month</h5>  
                        <Input type = "select" name = "FilteringDate"
                            onChange = {(e) =>{
                                filteredDate(e.target.value);
                            }}
                            >
                                <option>01</option>
                                <option>02</option>
                                <option>03</option>
                                <option>04</option>
                                <option>05</option>
                                <option>06</option>
                                <option>07</option>
                                <option>08</option>
                                <option>09</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                            </Input>
                        </div>

                        <div style = {{width : "30%" , marginLeft : "20px" }}>
                          <h5>Select Year</h5>  
                          <Input type = "select" name = "FilteringYear"
                            onChange = {(e)=>{
                              filteredYear(e.target.value);
                            }}>
                              <option>2021</option>
                              <option>2022</option>
                              <option>2023</option>
                              <option>2024</option>
                              <option>2025</option>
                              <option>2026</option>
                              <option>2027</option>

                          </Input>
                        </div>
                    </div>  
                    <hr></hr>        
                <div id ="report-cont" >
                <Card className="report-card" id="report" style = {{padding : "20px"}}>
                    <Row>
                      <Col>
                        {" "}
                        <img
                          style = {{width : "30%" , marginLeft : "35%" }}
                          src={
                            require("assets/img/wonder-lanka-logo.png").default
                          }
                          className="report-logo"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <br></br>
                        <p className="report-contact">
                          100/77 City Gate, Temple Junction, Katana North,{" "}
                          <br></br>Katana, Negombo 11500<br></br>
                          Tel No. : +94 77 614 0895
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <label style={{ float: "right", fontSize : "14px" }}>
                          <i>Date : {date}</i>
                        </label> <br/>

                        <hr></hr>
                      </Col>
                    </Row>
                   
                    <br/><br/>
                    
                    <div className = "tableContainer">
                        <table className = "table table-striped">
                            <thead>
                                <th scope = "row">#</th>
                                <th scope = "col">Booking ID</th>
                                <th scope = "col">Booking Date </th>
                                <th scope = "col">Description</th>
                                <th scope = "col">Country</th>

                            </thead>

                            <tbody>
                                {bookings.filter((val) =>{
                                    if(selectedYear === '' && selectedDate === ''){
                                    return val;
                                    }
                                    else if(val.bookingDate.substring(5, 7).includes(selectedDate) && val.bookingDate.substring(0,4).includes(selectedYear)){
                                    return val;
                                    }
                                    else if(val.bookingDate.substring(5,7).includes(selectedDate) && selectedYear === ''){
                                      return val;
                                    }
                                    else if (val.bookingDate.substring(0,4).includes(selectedYear) && selectedDate === ''){
                                      return val;
                                    }
            

                                    }).map((booking) => (
                                                <tr>
                                                    <th scope = "row">{number++}</th>
                                                    <td>{booking.tourId}</td>
                                                    <td>{booking.bookingDate}</td>
                                                    <td>{booking.customziedItinerary}</td>
                                                    <td>{booking.country}</td>                                                    

                                                </tr>
                                            ))}
                             </tbody>    


                        </table>
                    </div> 
                </Card>       
                </div>  
                <div className="report-download">
                <Row>
                    <Col>
                    <button
                        className="btn btn-info"
                        onClick={downloadPDF}
                    >
                        Download PDF
                    </button>
                    </Col>
                </Row>
              </div>
            </div>  
          </Container>  
        </>
    );

}

export default ItineraryReport;
