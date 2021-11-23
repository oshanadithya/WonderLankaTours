
import styles from "../assets/css/CF.module.css"
import IndexHeader from 'components/Headers/IndexHeader';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import DemoFooter from 'components/Footers/DemoFooter';
import { useHistory } from "react-router";
import React, { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";

function CFManagement(){

    let history = useHistory();

    useEffect(() => {
        ReactSession.setStoreType("localStorage");
          if(ReactSession.get("employee") == null){
            history.push("/login")
          }
      })

    function handleClickAssignCF() {
        history.push("/view-cf");
    }

    function handleClickCFReport() {
        history.push("/cf-report");
    }

    function handleClickViewMessages() {
        history.push("/view-messages");
    }


    return(
            <>
            <IndexHeader />
            <IndexNavbar />
        
            <div style = {{paddingTop : "50px"}} className = {styles.body}>
            <h3 className = {styles.header}><center>Complaint and Feedback Management</center></h3><br/><br/>

            <div style = {{paddingTop : "50px"}} className = {styles.btn_group}>
             
    
                <button className = {styles.btn_guidemng} onClick = {handleClickAssignCF}>View Complaints and Feedbacks</button>
        
            
                <button className = {styles.btn_guidemng} onClick = {handleClickCFReport}>Complaints Report</button>

                <button className = {styles.btn_guidemng} onClick = {handleClickViewMessages}>View Messages</button>
            
            </div>
            </div>
            <DemoFooter/>
        </>
    );
}

export default CFManagement;