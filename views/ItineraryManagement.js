import  { useHistory } from 'react-router-dom'
import styles from "../assets/css/ItineraryHome.module.css"
import IndexHeader from "components/Headers/IndexHeader";
import IndexNavbar from "components/Navbars/IndexNavbar";
import DemoFooter from "components/Footers/DemoFooter";
function ItineraryManagement(){

    let history = useHistory();
    
    function handleClickAdd(){
        history.push("/add-itinerary");
    }

    function handleClickView(){
        history.push("/view-itineraries");
    }

    function handleClickCust(){
        history.push("/CustomizedReq");
    }

    function handleClickReport(){
        history.push("/Itinerary-report");
    }

    return(
        <>
        <IndexNavbar />
        <IndexHeader />
        <div style = {{paddingTop : "50px"}} className = {styles.body}>
            <h3 className = {styles.header}><center>Itinerary Management</center></h3><br/><br/>

            <div style = {{paddingTop : "50px"}} className = {styles.btn_group}>

                <button className = {styles.btn_guidemng} onClick = {handleClickAdd}>Add Itinerary</button>
            
        
                <button className = {styles.btn_guidemng} onClick = {handleClickView}>View Tour Iteneraries</button>
             
    
                <button className = {styles.btn_guidemng} onClick = {handleClickReport} >Custom Itinerary Report</button>
        
            
                <button className = {styles.btn_guidemng} onClick = {handleClickCust}>Custom Itinerary Requests</button>
            
            </div>

            </div>
            <DemoFooter />
          </> 
    );
}

export default ItineraryManagement;