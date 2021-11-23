// reactstrap components
import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

// core components
import {
  Input
} from "reactstrap";

function CF () {
    const [complaints, setComplaints] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [searchVal , setSearchVal] = useState("");

    useEffect(() => {
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

    useEffect(() => {
        function getFeedbacks() {
          axios.get("http://localhost:8070/feedback/").then((res) => {
            setFeedbacks(res.data);  
            console.log(res);
          }).catch((err) => {
            alert(err.message);
          })
        }
        getFeedbacks();
    },[]);


        const {id} = useParams();
        var number1 = 1;
        var number2 = 1;

        return (
            <>
            <IndexNavbar />
            <IndexHeader/>
            <div style = {{paddingTop : "50px"}} className = "container">

              <h3 style = {{marginLeft:"430px"}}><b>Complaint List</b></h3>
              <Input placeholder="Search " type="text"  value={searchVal}
                onChange = {(e) =>{
                  setSearchVal(e.target.value);
              }}/>
                {complaints
                  .filter((complaint) => {
                    let Name = complaint.name;
                    if (searchVal === "") {
                      return complaint;
                    } else {
                      if (Name) {
                        if (
                          Name.toLowerCase().includes(searchVal.toLowerCase())
                        ) {
                          return complaint;
                        }
                      }
                    }
                  })
                  .map((complaint)=>(
                  <div style = {{marginLeft:"20px"}}  className = "tableContainer">
                  <table className = "table table-striped">
                    <thead>

                    <th scope = "col"> No </th>
                    <th scope = "col"> Name </th>
                    <th scope = "col"> Email </th>
                    <th scope = "col"> Contact </th>
                    <th scope = "col"> Reason </th>
                    <th scope = "col"> Complaint </th>
                    <th scope = "col"> Date </th>

                    </thead>
                    <tbody>
                        <tr>                          
                        <th scope = "row">{number1++}</th>
                        
                        <td>{complaint.name}</td>
                        
                        <td>{complaint.email}</td>
                        
                        <td>{complaint.contact}</td>
                        
                        <td>{complaint.select}</td>
                        
                        <td>{complaint.complaint}</td>

                        <td>{complaint.date}</td>
                        </tr>
                    </tbody>
                  </table>
                  </div>
                  ))}
                <h6 style = {{textAlign:"left"}}>To Generate Complaint Report go to complaints report</h6>

               <h3 style = {{textAlign:"center"}}><b>Feedback List</b></h3>

                {feedbacks
                .filter((feedback) => {
                    let Name = feedback.name;
                    if (searchVal === "") {
                    return feedback;
                    } else {
                    if (Name) {
                        if (
                        Name.toLowerCase().includes(searchVal.toLowerCase())
                        ) {
                        return feedback;
                        }
                    }
                    }
                })
                .map((feedback)=>(
                <div style = {{marginLeft:"20px"}}  className = "tableContainer">
                <table className = "table table-striped">
                    <thead>
                    <th scope = "col"> No </th>
                    <th scope = "col"> Name </th>
                    <th scope = "col"> Satisfactory </th>
                    <th scope = "col"> Feedback </th>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope = "row">{number2++}</th>
                        
                        <td>{feedback.name}</td>
                        
                        <td>{feedback.stat}</td>
                        
                        <td>{feedback.feedback}</td>
                    </tr>
                    </tbody>
                </table>
                </div>
                
                ))} 
              
            </div> 
            <DemoFooter />
            </>
        ) 
}

export default CF;