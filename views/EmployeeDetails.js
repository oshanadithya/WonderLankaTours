import driverStyles from "../assets/css/EmployeeDetails.module.css";
import{Button} from 'reactstrap'
import{ useHistory } from "react-router-dom"
import { useState } from 'react';
import { useEffect } from 'react';
import IndexHeader from 'components/Headers/IndexHeader';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import DemoFooter from 'components/Footers/DemoFooter';
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {
    Label,
    Input,
    Row,
    Col,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormGroup,
    Alert,
    Container,
  } from "reactstrap";

toast.configure();
function EmployeeDetails(){
    
    let history = useHistory();

    const [employees , setEmployees] = useState([]);
    const [message , setMessage] = useState("");
    const [searchVal , setSearchVal] = useState("");

  




    

    useEffect(() => {
        axios.get("http://localhost:8070/employees/details").then((res) =>{
            setEmployees(res.data);
            console.log(res.data);
        }).catch((err) =>{
            console.log(err);
        })
    
      }, []);

    

    function onDelete(employee)  {
        if (
            window.confirm(
              "Employee " + employee.employeeid + " will be removed from the database"
            )
        )
        axios.delete(`http://localhost:8070/employees/delete${employee._id}`).then((res) =>{
            console.log(res);
            
            
            toast.success('Employee Deleted!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
               
                });
            
        }).catch((err) =>{
            console.log(err);
            alert("Error!");
        })
    }
 

    var number = 1;
    
    return(
        
        <div>
            <IndexNavbar />
            <IndexHeader />
            <Container>
            <center><h1>Employee Details</h1><br/><br/></center>

            <Row>
          <Col>
            <FormGroup>
              <InputGroup style = {{marginLeft : "70px"}} className="form-group-no-border">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search " type="text" 
                    onChange = {(e) =>{
                                setSearchVal(e.target.value);
                    }}/>
              </InputGroup>
            </FormGroup>
          </Col>
          
        </Row>

           <center>
                <table width ="90%" border ="2px"className = {driverStyles.tbldata}>
                    <tr>
                       
                        <th className={driverStyles.tbldata}>Employee User Name</th>
                        <th className={driverStyles.tbldata}>Employee Password</th>
                        <th className={driverStyles.tbldata}>Employee Role</th>
                        <th className={driverStyles.tbldata}>Actions</th>
                       
                    </tr>

                    <tbody>
                        
                        {employees.filter((val) =>{
                          
                          if(searchVal === ''){
                            return val;
                          }
                          else if (val.empname.toLowerCase().includes(searchVal.toLowerCase())){
                            return val;
                          }
                          
                          

                          
                        
                        }).map((employee) =>(
                            
                            <tr className={driverStyles.tbldata}>
                                
                                <td className={driverStyles.tbldata}>{employee.empname}</td>
                                <td className={driverStyles.tbldata}>{employee.emppwd}</td>
                                <td className={driverStyles.tbldata}>{employee.emprole}</td>
                               
                                
                                <td className={driverStyles.tbldata}>
                                  <button 
                                   className={driverStyles.btnEdit}
                                onClick = {()=>{
                                    history.push(`/edit-employee/${employee._id}`);
                                }}
                                >Edit</button>

                                <button  className={driverStyles.btnDelete}
                                onClick = {() =>{
                                    
                                    onDelete(employee);
                                }}
                                    
                               
                                >Delete</button>
                               </td>
                            </tr>
    
                        ))}
                    </tbody>    


                </table>
                </center>
            
            <span style = {{textAlign:"left" , color : "red"}}>{message}</span> <br/><br/>
 
           </Container>
        </div>   
    );


}

export  default EmployeeDetails;

