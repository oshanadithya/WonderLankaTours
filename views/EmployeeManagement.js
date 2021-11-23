import React from "react";
import { useHistory } from "react-router-dom";
import styles from "../assets/css/EmployeeHome.module.css";
import IndexHeader from 'components/Headers/IndexHeader';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import { useEffect } from "react";
import ReactSession from "react-client-session/dist/ReactSession";


function EmployeeManagement() {
    let history=useHistory();


    useEffect(() =>{
      ReactSession.setStoreType("localStorage");
      if(ReactSession.get("employee") === null){
       
        history.push("/login")
      }
    })
    function handleClick(){
        history.push("/Add-Employee")
    }
    function handleClick2(){
        history.push("/View-Employee")
    }
  return (
        <>
      <IndexHeader />
      <IndexNavbar />
      <div style = {{paddingTop : "50px"}} className = {styles.body}>
      
      
       
        <center><h1 className={styles.header}>Employee Management </h1></center>
       
        <div style = {{paddingTop : "50px"}} className = {styles.btn_group}>
                    <button
                    onClick={handleClick}
                    className={styles.btn_empmng}
                   
                    type="button"
                    >
                    Add Employee
                    </button>

                    <button
                    onClick={handleClick2}
                    className={styles.btn_empmng}
                  
                    type="button"
                    >
                View Employees
                    </button>
                    

                  

                 
                    </div>
                    
                
     
      </div>
      
  </>
  );
}

export default EmployeeManagement;
