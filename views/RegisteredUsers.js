
import vehicleStyles from "../assets/css/ViewVehicleList.module.css";


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
function RegisteredUsers(){
    
    let history = useHistory();

    const [users , setUsers] = useState([]);
    const [message , setMessage] = useState("");
    const [searchVal , setSearchVal] = useState("");

  




    

    useEffect(() => {
        axios.get("http://localhost:8070/users/").then((res) =>{
            setUsers(res.data);
            console.log(res.data);
        }).catch((err) =>{
            console.log(err);
        })
    
      }, []);

    

    
 

    var number = 1;
    
    return(
        
        <div>
            <IndexNavbar />
            <IndexHeader />
            
            <center><h1><b>Registered Users Details</b></h1><br/><br/></center>

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
          <Col>
            <div>
              <Label style = {{marginLeft : "70px"}} check>
                <Input type="checkbox"/>{" "} 
                <label style ={{marginRight : "40px"}}>UserName</label>
              </Label>

            </div>

          </Col>
          <Col></Col>
        </Row>

           <center>
                <table width ="90%" border ="2px"className = {vehicleStyles.tbldata}>
                    <tr>
                       
                        <th className={vehicleStyles.tbldata}>Full Name</th>
                     <th className={vehicleStyles.tbldata}>Email</th>
              <th className={vehicleStyles.tbldata}>Country</th>
              <th className={vehicleStyles.tbldata}>Mobile Number</th>
              <th className={vehicleStyles.tbldata}>NIC</th>
              <th className={vehicleStyles.tbldata}>Date Of Birth</th>
              <th className={vehicleStyles.tbldata}>UserName</th>
              <th className={vehicleStyles.tbldata}>Password</th>
              
                       
                    </tr>

                    <tbody>
                        
                        {users.filter((val) =>{
                          
                          if(searchVal === ''){
                            return val;
                          }
                        //  else if (val.vid.toLowerCase().includes(searchVal.toLowerCase())){
                           // return val;
                         // }
                          else if (val.vtype.toLowerCase().includes(searchVal.toLowerCase())){
                            return val;
                          }
                          else if (val.vname.toLowerCase().includes(searchVal.toLowerCase())){
                            return val;
                          }
                          

                          
                        
                        }).map((user) =>(
                         
                            
                            <tr className={vehicleStyles.tbldata}>
                                
                                <td className={vehicleStyles.tbldata}>{user.fullName}</td>
                                <td className={vehicleStyles.tbldata}>{user.email}</td>
                                <td className={vehicleStyles.tbldata}>{user.country}</td>
                                <td className={vehicleStyles.tbldata}>{user.mobileNo}</td>
                                <td className={vehicleStyles.tbldata}>{user.nic}</td>
                                <td className={vehicleStyles.tbldata}>{user.dateOfBirth}</td>
                                <td className={vehicleStyles.tbldata}>{user.username}</td>
                                <td className={vehicleStyles.tbldata}>{user.password}</td>

                               
                               
                                
                               
                            </tr>
                            
                        ))}
                    </tbody>    


                </table>
                </center>
            
            <span style = {{textAlign:"left" , color : "red"}}>{message}</span> <br/><br/>
            <DemoFooter />
           
        </div>   
    );


}

export  default RegisteredUsers;

