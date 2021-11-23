import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import IndexHeader from "components/Headers/IndexHeader";
import IndexNavbar from "components/Navbars/IndexNavbar";
import DemoFooter from "components/Footers/DemoFooter";
import axios from "axios";
import { toast } from "react-toastify";
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
function DeleteInsurence() {
  let history = useHistory();
  

  const [insurences, setinsurencePlans] = useState([]);
  const [message, setMessage] = useState("");
  const [searchVal , setSearchVal] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8070/insurences/")
      .then((res) => {
        setinsurencePlans(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function onDelete(insurence) {
    if (
      window.confirm(
        "Insurence Package " +
        insurence.InsurenceID +
          " will be removed from the database"
      )
    )
      axios
        .delete(`http://localhost:8070/insurences/delete-package/${insurence._id}`)
        .then((res) => {
          console.log(res);

          setMessage("Plan Deleted!");
          toast.error("Plan Deleted!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((err) => {
          console.log(err);
          alert("Error!");
        });
  }

  var number = 1;

  return (
    <div>
      <IndexNavbar />
      <IndexHeader />

      
      <h3 style={{ marginLeft: "40px" }}>Insurance Plan Details</h3>
      <h5 style ={{marginLeft:"40px"}}>Search or Select the Plans Below to Delete</h5>
      <br/>
      <br />
      <br />
      <Row>
        <Col>
          <FormGroup>
            <InputGroup
              style={{ marginLeft: "40px" }}
              className="form-group-no-border"
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="nc-icon nc-zoom-split" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Search "
                type="text"
                onChange={(e) => {
                  setSearchVal(e.target.value);
                }}
              />
            </InputGroup>
          </FormGroup>
        </Col>
        <Col>
          <div>
          </div>
        </Col>
        <Col></Col>
      </Row>
      <div style={{ marginLeft: "20px" }} className="tableContainer">
        <table className="table table-striped">
          <thead>
            <th scope="col">#</th>
            <th scope="col">Insurance Plan ID</th>
            <th scope="col">Insurance Plan Name</th>
            <th scope="col">Insurance PLan Price</th>
            <th scope="col">Insurance Plan Coverage</th>
            <th scope="col">Insurance Plan Accident types</th>
            <th scope="col">Insurance PLan Description</th>
            <th scope="col">Action</th>
          </thead>

          <tbody>
            

          {insurences.filter((val) =>{
                          
                          if(searchVal === ''){
                            return val;
                          }
                          else if (val.InsurenceID.toLowerCase().includes(searchVal.toLowerCase())){
                            return val;
                          }
                          else if (val.InsurenceName.toLowerCase().includes(searchVal.toLowerCase())){
                            return val;
                          }
                        
                        }).map((insurence) => (
              <tr>
                <th scope="row">{number++}</th>
                <td>{insurence.InsurenceID}</td>
                <td>{insurence.InsurenceName}</td>
                <td>{insurence.InsurencePrice}</td>
                <td>{insurence.InsurenceCoverage}</td>
                <td>{insurence.InsurenceAccidentType}</td>
                <td>{insurence.InsurenceDetails}</td>

                <td>
                  <Button
                    color="danger"
                    style={{ padding: "5px 5px 5px 5px", width: "80px" }}
                    onClick={() => {
                      onDelete(insurence);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <span style={{ textAlign: "left", color: "red" }}>{message}</span> <br />
      <br />
      <DemoFooter />
    </div>
  );
}

export default DeleteInsurence;
