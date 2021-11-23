import styles from '../assets/css/AddEmployee.module.css'
import { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import IndexHeader from 'components/Headers/IndexHeader';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import DemoFooter from 'components/Footers/DemoFooter';
import{
    Label,
    Input,
    Button 
}
from 'reactstrap'

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { thisExpression } from '@babel/types';

toast.configure();

function EmployeeUpdate(){

    const [empname , setEmpname] = useState("");
    const [emppwd , setEmppwd] = useState("");
    const [emprole , setEmprole] = useState("");
    const [message , setMessage] = useState("");
   

    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8070/employees/${id}`).then((res) =>{

        console.log(res.data);
        setEmpname(res.data.empname);
        setEmppwd(res.data.emppwd);
        setEmprole(res.data.emprole);
     

        }).catch((err)=>{
        console.log(err);
        })
    } , []);

    function onSubmit (e){
        e.preventDefault();

        const updateEmployee = {
            empname,
            emppwd,
            emprole
        }
        axios.put(`http://localhost:8070/employees/update/${id}` , updateEmployee ).then(() =>{
            
            toast.success('Employee Updated!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                e.target.reset();
                

        }).catch((err) =>{
            console.log(err);
            toast.error('Something went  wrong!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        })
    }
    return(

        <div>
            <IndexHeader />
            <IndexNavbar />
            <br/><br/><h3 style = {{textAlign : 'center'}}>Update Employee Details</h3><br/><br/>
            <div className = {styles.FormContainer}>
            <form onSubmit = {onSubmit}>

                <Label for = "empname">User Name</Label><br/>
                <Input type = 'text'  
                name = "empname" value = {empname}
                onChange = {(e) =>{
                    setEmpname(e.target.value);
                }}></Input><br/>

                <Label for = "emppwd">Employee Password</Label><br/>
                <Input type = 'text' name = "emppwd" value = {emppwd}
                onChange = {(e)=>{
                    setEmppwd(e.target.value);
                }}></Input><br/>

                <Label for = "emprole">Employee Role</Label><br/>
                <Input type = 'select' name = "emprole" value = {emprole} 
                onChange = {(e)=>{
                    setEmprole(e.target.value);
                }}>
                <option>General Manager</option> 
                <option>Assets Manager</option>

                </Input><br/>

              

                
                <Button type = "submit" color = "warning" style = {{float:'right' , margin : "5px" }} 

                >Edit Employee</Button>

            </form>    
            </div>
            <DemoFooter />
        </div>   

    );
}

export default EmployeeUpdate;