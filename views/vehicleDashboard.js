
import styles from "../assets/css/VehicleHome.module.css"

import IndexHeader from "components/Headers/IndexHeader";
import IndexNavbar from "components/Navbars/IndexNavbar";
import DemoFooter from "components/Footers/DemoFooter";

import { useHistory } from "react-router";
function VehicleDashboard(){

    let history = useHistory();

    function handleClickAdd(){
        history.push("/add-vehicle");
    }

    function handleClickView() {
        history.push("/view-vehicles");
    }
    function handleClickType() {
        history.push("/type-vehicles");
    }

    function handleClickAssign() {
        history.push("/assign-vehiclesBooking");
    }

    function handleClickReport() {
        history.push("/report-vehicles");
    }


    return(
        
        <>
            <IndexHeader />
            <IndexNavbar />

            <div  
            style = {{paddingTop : "50px"}} className = {styles.body}><br></br> <br></br><br></br> <br></br><br></br> <br></br>
            <h3 className = {styles.header}><center><b>Vehicle Management</b></center></h3><br/><br/>

           <br></br> <br></br>

            <div style = {{paddingTop : "50px"}} className = {styles.btn_group}>
            
                <button className = {styles.btn_vehiclesty} onClick = {handleClickAdd} >Add Vehicle</button>
            
        
                <button className = {styles.btn_vehiclesty} onClick = {handleClickView} >View Vehicles</button>
             
    
                <button className = {styles.btn_vehiclesty} onClick = {handleClickType}>Add Vehicle Type</button>
        
            
                <button className = {styles.btn_vehiclesty} onClick = {handleClickAssign}>Assign Vehicles</button>

               
                <button className = {styles.btn_vehiclesty} onClick = {handleClickReport}>Vehicle Report</button>
            
            </div>
        </div>
        
        <DemoFooter />
        </>
    );
}

export default VehicleDashboard;