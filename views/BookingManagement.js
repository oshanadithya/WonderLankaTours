
import styles from "../assets/css/BookingmanagementHome.module.css";
import IndexHeader from 'components/Headers/IndexHeader';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import DemoFooter from 'components/Footers/DemoFooter';
import { useHistory } from "react-router";
function BookingManagement(){

    let history = useHistory();


    function handleClickView() {
        history.push("/booktable");
    }

    
    function handleClickReport() {
        history.push("/report-guides");
    }


    return(
        
        <div>
            <IndexHeader/>
            <IndexNavbar/>

            <div style = {{paddingTop : "30px"}} className = {styles.body}>
            <h3 className = {styles.header}><center>Booking Management</center></h3><br/><br/>

            <div style = {{paddingTop : "50px"}} className = {styles.btn_group}>

                <button className = {styles.btn_guidemng} onClick = {handleClickView} >View Tour Bookings</button>
                <button className = {styles.btn_guidemng} onClick = {handleClickReport}>Tour Guide Report</button>
            
            </div>
        </div>
        <DemoFooter/>
        </div>
    );
}

export default BookingManagement;