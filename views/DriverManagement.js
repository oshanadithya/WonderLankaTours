import React from "react";
import { useHistory } from "react-router-dom";
import styles from "../assets/css/DriverHome.module.css";
import IndexHeader from 'components/Headers/IndexHeader';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import { useEffect } from "react";
import ReactSession from "react-client-session/dist/ReactSession";



function DriverManagement() {
    let history=useHistory();


    useEffect(() =>{
      ReactSession.setStoreType("localStorage");
      if(ReactSession.get("employee") === null){
       
        history.push("/login")
      }
    })
  
    
    function handleClick(){
        history.push("/Add-Driver")
    }
    function handleClick2(){
        history.push("/View-Driver")
    }
    function handleClick3(){
      history.push("/Assign-Driver")
  }
  function handleClick4(){
    history.push("/Report-Driver")
}
  return (
        <>
      <IndexHeader />
      <IndexNavbar />
      <div style = {{paddingTop : "50px"}} className = {styles.body2}>
      
      
       
        <center><h1 className={styles.header}>Driver Management </h1></center>
       <br/>  <br/>  <br/>  <br/>   <br/>
        <div style = {{paddingTop : "50px"}} className = {styles.btn_group2}>
                    <button
                    onClick={handleClick}
                    className={styles.btn_drivermng}
                   
                    type="button"
                    >
                    Add Driver
                    </button>

                    <button
                    onClick={handleClick2}
                    className={styles.btn_drivermng}
                  
                    type="button"
                    >
                    View Drivers
                    </button>

                    <button
                     onClick={handleClick3}                   
                    className={styles.btn_drivermng}
                   
                    type="button"
                    >
                    Assign Drivers
                    </button>

                    <button
                    onClick={handleClick4}
                                        
                    className={styles.btn_drivermng}
                  
                    type="button"
                    >
                    Drivers Report
                    </button>
                    </div>
                
     
      </div>
  </>
  );
}

export default DriverManagement;
