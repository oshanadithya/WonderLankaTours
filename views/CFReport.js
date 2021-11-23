import { Row, Col, Card , Container } from "reactstrap";
import { jsPDF } from "jspdf";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { useHistory } from "react-router";
import axios from "axios";
import styles from "../assets/css/Viewbooking.module.css";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

import {
  Input,
  
} from "reactstrap";

  function CFReport () {
    const [complaints, setComplaints] = useState([]);
    const [selectedDate , filteredDate] = useState("01"); 
    const [selectedYear , filteredYear] = useState("2021");
    const [date1, setdate] = useState();

    let history = useHistory();
    var number = 1;
    let doc;

    useEffect(() => {
      let today = new Date().toISOString().slice(0, 10);
    setdate(today);
      function getComplaints() {
        axios.get("http://localhost:8070/complaint/").then((res) => {
          setComplaints(res.data);
          console.log(res);
        }).catch((err) => {
          alert("Something went wrong :(");
          alert(err.message);
        });
      };
      getComplaints();
    },[]);

  const downloadPDF = () => {
 
    doc = new jsPDF({
      orientation : "landscape",
      unit :"pt",
      format : [1700,1000]
    })
    doc.html(document.getElementById("report-cont"), {
      callback: function (pdf) {
        pdf.save("MonthlyComplaintReport.pdf");
      },
    });
  };

  return (
    <>
    <IndexNavbar />
    <IndexHeader/>
      <Container>
      <h2 align="center">Complaint Report</h2>
      <br/><br/>
      <div style = {{marginLeft : "40px" , marginRight : "40px" }}>
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
                <Card className="" id="report" style = {{padding : "20px"}}>
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
                          <i>Date : {date1}</i>
                        </label> <br/>

                        <hr></hr>
                      </Col>
                    </Row>
                   
                    <br/><br/>

                    <div style = {{marginLeft:"20px"}}  className = "tableContainer">
                <table width="920px" border="5px" className={styles.tbldata}>
                    <thead>
                        <th scope = "col">No</th>
                        <th scope = "col">Name</th>
                        <th scope = "col">Email</th>
                        <th scope = "col">Contact</th>
                        <th scope = "col">Reason </th>
                        <th scope = "col">Complaint </th>
                        <th scope = "col">Date </th>
                    </thead>

                    <tbody>
                        
                        {complaints.filter((val) =>{
                            if(selectedYear === '' && selectedDate === ''){
                              return val;
                            }
                            else if(val.date.substring(5, 7).includes(selectedDate) && val.date.substring(0,4).includes(selectedYear)){
                              return val;
                            }
                            else if(val.date.substring(5,7).includes(selectedDate) && selectedYear === ''){
                              return val;
                            }
                            else if (val.date.substring(0,4).includes(selectedYear) && selectedDate === ''){
                              return val;
                            }
            

                        }).map((complaint)=>(
                                <tr>
                                <th scope = "row">{number++}</th>
                                
                                <td>{complaint.name}</td>
                                
                                <td>{complaint.email}</td>
                                
                                <td>{complaint.contact}</td>
                                
                                <td>{complaint.select}</td>
                                
                                <td>{complaint.complaint}</td>
            
                                <td>{complaint.date}</td>
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

      <DemoFooter />
    </>

  );

}

export default CFReport;