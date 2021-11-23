import { Row, Col, Card , Container } from "reactstrap";
import { jsPDF } from "jspdf";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { useHistory } from "react-router";
import axios from "axios";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  
} from "reactstrap";

function GuideReport(){

  const [bookings , setBookings] = useState([]);
  const [guides, setGuides] = useState({});
  const [selectedDate , filteredDate] = useState("01"); 
  const [date, setdate] = useState();
  const [selectedYear , filteredYear] = useState("2021");

  let history = useHistory();
  var number = 1;
  let doc;

  useEffect(()=>{
    let today = new Date().toISOString().slice(0, 10);
    setdate(today);
   axios.get("http://localhost:8070/bookings/").then((res) =>{
       setBookings(res.data);
   })
}, []) 



useEffect(() => {
  
  bookings.forEach(({ tourId }) => {
    axios.get(`http://localhost:8070/assignedGuides/check/${tourId}`).then((res) =>{
      if(res.data === true){
        axios.get(`http://localhost:8070/assignedGuides/get/${tourId}`)
        .then(res => {
          setGuides(guides => ({
            ...guides,
            [tourId]: res.data.guideId,
          }));
        })
      }

    })
  
  });

}, [bookings]);

const downloadPDF = () => {
 
  doc = new jsPDF({
    orientation : "landscape",
    unit :"pt",
    format : [1700,1000]
  })
  doc.html(document.getElementById("report-cont"), {
    callback: function (pdf) {
      pdf.save("AssignedGuideReport.pdf");
    },
  });
};

  


    return (
        <>  
          <Container>
                <h2 align="center">Assigned Guide Report</h2>
                {/* <UncontrolledDropdown className="btn-group">
                <DropdownToggle
                      aria-expanded={false}
                      aria-haspopup={true}
                      caret
                      color="primary"
                      data-toggle="dropdown"
                      type="button"
     
                    >
                     {selectedDate}
                </DropdownToggle>
        <DropdownMenu >
              <DropdownItem >
                01
              </DropdownItem>

              <DropdownItem>
                02
              </DropdownItem>

              <DropdownItem>
                03
              </DropdownItem>

              <DropdownItem >  
                04
              </DropdownItem>

              <DropdownItem>
                05
              </DropdownItem>

              <DropdownItem>
                06
              </DropdownItem>

              <DropdownItem>
                07
              </DropdownItem>

              <DropdownItem>
                08
              </DropdownItem>

              <DropdownItem>
                09
              </DropdownItem>

              <DropdownItem>
                10
              </DropdownItem>

              <DropdownItem>
                11
              </DropdownItem>

              <DropdownItem>
                12
              </DropdownItem>
          

        </DropdownMenu>  
        </UncontrolledDropdown> */}
            <br/><br/>
            <div style = {{marginLeft : "40px" , marginRight : "40px" }}>
              <div style = {{display : "flex" , flexDirection : "row" }}>                   { /*For Date Selection  */}
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
                        <p className="report-contact"><h6>
                          100/77 City Gate, Temple Junction, Katana North,{" "}
                          <br></br>Katana, Negombo 11500<br></br>
                          Tel No. : +94 77 614 0895
                          </h6>
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

                    <div style = {{marginLeft:"20px"}}  className = "tableContainer">
                <table className = "table table-striped">
                    <thead>
                        <th scope = "col">#</th>
                        <th scope = "col">Tour ID</th>
                        <th scope = "col">Booking Date</th>
                        <th scope = "col">Arrival Date</th>
                        <th scope = "col">Country </th>
                        <th scope = "col">Guide Assigned </th>
                       

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
            

                        }).map((booking) =>(
                            
                            <tr>
                              {console.log(booking.bookingDate.substring(5, 7))}
                                <th scope = "row">{number++}</th>
                                <td>{booking.tourId}</td>
                                <td>{booking.bookingDate}</td>
                                <td>{booking.arrivalDate}</td>
                                <td>{booking.country}</td>
                                <td>{guides[booking.tourId]}</td>
                              
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

export default GuideReport;