import React from 'react';
import Pdf from "react-to-pdf";
import { Row, Col, Card, Container } from "reactstrap";
import styles from '../assets/css/Bookingmanagementreport.css'
const ref = React.createRef();

const PDF = (props) =>{
    return(
        <>
       
        <div className="main">
        <div className="my-tour-content">
       
          <h2 align="center">Report</h2>
          <hr></hr>
          <br></br>
        
          <Row>
            <Col>
           
              <Card className="report-card" >
              <div className="Post" ref={ref}> 
              <div id="report-cont">
              
                  <Row>
                    <Col>
                      {" "}
                      <img  className="report-logo"
                        src={
                          require("assets/img/wonder-lanka-logo.png").default
                        }
                        ></img>
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
                      <label style={{ float: "right", fontSize: "x-small" }}>
                        <i>Date : </i>
                      </label>

                      <hr></hr>
                    </Col>
                  </Row>

                  <br></br>
                  
                  <Row>
                    <Col>Tour Id : {props.tourId}</Col>
                  </Row>
                  <br></br>
                  <br></br>
                  <Row>
                    <Col>Cancellation Date : {props.cancellationdate}</Col>
                  </Row>
                  <br></br>
                  <br></br>
                  <Row>
                    <Col>Reason : {props.reason}</Col>
                  </Row>
                  <br></br>
                  <br></br>
                  <Row>
                    <Col>Amount : {props.amount}</Col>
                  </Row>
                  
		  <br></br>
                  <br></br>
                 
                  <br></br>
              </div>
              </div>
              </Card>
             
            </Col>
          </Row>
          <br></br>
         
          <div className="report-download">
            <Row>
              <Col>
              <Container>
                <Pdf targetRef={ref} filename="post.pdf">
                {({ toPdf }) => 
                 
                <button  className="btn btn-info btn-edit-booking" onClick={toPdf}
            > Capture as Pdf</button>}
                
                </Pdf>
                </Container>
              </Col>
            </Row>
            </div>
          </div>
        </div>
       
     
    

        </>

    );
}

export default PDF; 