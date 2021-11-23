import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

import {
    Input
  } from "reactstrap";
import { ReactSession } from "react-client-session";
import { useHistory } from "react-router";

  function ViewMessages() {
    const [messages, setMessages] = useState([]);
    const [searchVal , setSearchVal] = useState("");

    let history = useHistory();

    useEffect(() => {
        function getMessages() {
          axios.get("http://localhost:8070/contactus/").then((res) => {
            setMessages(res.data);
            console.log(res);
          }).catch((err) => {
            alert("Something went wrong :(");
            alert(err.message);
          });
        };
        getMessages();
    },[]);

    var number1 = 1;

    return (
        <>
        <IndexNavbar />
        <IndexHeader/>
        <div style = {{paddingTop : "50px"}} className = "container">

          <h3 style = {{marginLeft:"430px"}}>Contact Us Messages</h3>
          <Input placeholder="Search " type="text"  value={searchVal}
                onChange = {(e) =>{
                  setSearchVal(e.target.value);
              }}/>
          
          {messages
          .filter((contactus) => {
            let Name = contactus.fname;
            if (searchVal === "") {
              return contactus;
            } else {
              if (Name) {
                if (
                  Name.toLowerCase().includes(searchVal.toLowerCase())
                ) {
                  return contactus;
                }
              }
            }
          })
          
          .map((contactus)=>(
            <div style = {{marginLeft:"20px"}}  className = "tableContainer">
            <table className = "table table-striped">
              <thead>

              <th scope = "col"> No </th>
              <th scope = "col"> First Name </th>
              <th scope = "col"> Last Name  </th>
              <th scope = "col"> Email Addrers </th>
              <th scope = "col"> Contact No </th>
              <th scope = "col"> Message </th>

              </thead>
              <tbody>
                  <tr>                          
                  <th scope = "row">{number1++}</th>
                  
                  <td>{contactus.fname}</td>
                  
                  <td>{contactus.lname}</td>
                  
                  <td>{contactus.email}</td>
                  
                  <td>{contactus.contact}</td>
                  
                  <td>{contactus.message}</td>

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

  export default ViewMessages;