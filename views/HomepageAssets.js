
import styles from "../assets/css/Home.module.css"
import { useHistory } from "react-router";
import IndexHeader from 'components/Headers/IndexHeader';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import DemoFooter from 'components/Footers/DemoFooter';

import { useEffect } from "react";
import ReactSession from "react-client-session/dist/ReactSession";

function HomepageAssets(){

  let history = useHistory();

  useEffect(() =>{
    ReactSession.setStoreType("localStorage");
    if(ReactSession.get("employee") === null){
     
      history.push("/login")
    }
  })
  

    function handleClickGuide() {
        history.push("/guide-management");
    }


    function handleClickVehicle() {
      history.push("/vehicle-management");
    }

    function handleClickDriver() {
      history.push("/driver-management");
    }


   function handleClickHotel() {
     history.push("/hotel-management");
    }

    function handleClickEmployee(){
      history.push("/employee-management");
    }


    return(

      <>
      <IndexNavbar />
      <IndexHeader />
     
        
            <div style = {{paddingTop : "50px"}} className = {styles.body}>
            <h3 className = {styles.header}><center>Company Management</center></h3><br/><br/>

            <div>
              <table className = {styles.tb}>

                <tr>
   
                  <td>
                      <button className = {styles.btn_guidemng} onClick = {handleClickGuide} >Guide Management</button>
                  </td>
                  
                  <td>
                      <button className = {styles.btn_guidemng} onClick = {handleClickVehicle} >Vehicle Management</button>
                  </td>
                    
                  <td>
                      <button className = {styles.btn_guidemng} onClick = {handleClickDriver} >Driver Management</button>
                  </td>

                  <td>
                      <button className = {styles.btn_guidemng} onClick = {handleClickHotel}>Hotel and Restaraunt Management</button>
                  </td>
                </tr>  
              </table>

              
            </div>
        </div>
      <DemoFooter />
        </>
    );
}

export default HomepageAssets;
