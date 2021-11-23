
import styles from "../assets/css/GuideHome.module.css"
import IndexHeader from 'components/Headers/IndexHeader';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import { useHistory } from "react-router";
function GuideManagement(){

    let history = useHistory();

    function handleClickAdd(){
        history.push("/add-guide");
    }

    function handleClickView() {
        history.push("/view-guides");
    }

    function handleClickAssign() {
        history.push("/assign-guide-booking");
    }

    function handleClickReport() {
        history.push("/guide-report");
    }


    return(
            <>
            <IndexHeader />
            <IndexNavbar />
        
            <div style = {{paddingTop : "50px"}} className = {styles.body}>
            <h3 className = {styles.header}><center>Guide Management</center></h3><br/><br/>

            <div style = {{paddingTop : "50px"}} className = {styles.btn_group}>
            
                <button className = {styles.btn_guidemng} onClick = {handleClickAdd} >Add Tour Guide</button>
            
        
                <button className = {styles.btn_guidemng} onClick = {handleClickView} >View Tour Guides</button>
             
    
                <button className = {styles.btn_guidemng} onClick = {handleClickAssign}>Assign Tour Guides</button>
        
            
                <button className = {styles.btn_guidemng} onClick = {handleClickReport}>Tour Guide Report</button>
            
            </div>
        </div>
        </>
    );
}

export default GuideManagement;