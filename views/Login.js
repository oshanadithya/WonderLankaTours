import styles from '../assets/css/AddItinerary.module.css';
import { useState } from 'react';
import axios from 'axios';
import { ReactSession } from "react-client-session";
import { useHistory } from 'react-router';
import{
    Label,
    Input,
    Button
}
from 'reactstrap'




function Login(){

    const [username , setUsername] = useState();
    const [password , setPassword] = useState();

    let history = useHistory();

    function submit(e){

            e.preventDefault();
            axios.get(`http://localhost:8070/employees/find/${username}`).then((res)=>{
                if(res.data === true){
                    axios.get(`http://localhost:8070/employees/get/${username}`).then((res) =>{
                        if(password != res.data.emppwd){
                            alert("Check password");
                        }
                        else{
                            ReactSession.set("employee" , res.data);
                            if(res.data.emprole == "General Manager"){
                                //Home of General Manager
                                history.push(`/Homepage`);
                            }
                            else{
                                //Home of Assets Manager
                                history.push("/HomepageAssets");
                            }
                        }
                    })
                }
                else{
                    alert("Check username");
                }
            })
        }

    return(
        <>
             <div style = {{paddingTop : "50px"}} className = {styles.body}>
            <br/><br/><h3 className = {styles.header} style = {{textAlign : 'center'}}>Employee Login</h3><br/><br/>
            <div className = {styles.FormContainer}>
            <form  onSubmit = {submit} encType = "multipart/form-data">

                <Label for = "Username">Username</Label><br/>
                <Input type = 'text' name = "username" placeholder = "Enter Username" required 
                onChange = {(e) =>{
                    setUsername(e.target.value);
                }}
                ></Input><br/>

                <Label for = "Password">Password</Label><br/>
                <Input type = 'text' name = "password" placeholder = "Enter Password" required
                onChange = {(e) =>{
                    setPassword(e.target.value);
                }}
                ></Input><br/>

                <Button color = "primary" type = "submit" style = {{float:'right' , margin : "5px" }}>Login</Button>
            </form>    
            </div>
        </div>   

        </>
    );

}

export default Login;