import React from "react";
import driverStyles from "../assets/css/DriverDetails.module.css";
import IndexHeader from "components/Headers/IndexHeader";
import IndexNavbar from "components/Navbars/IndexNavbar";
import DemoFooter from "components/Footers/DemoFooter";
import ReactSession from "react-client-session/dist/ReactSession";
import {
  Label,
  Input,
  Button,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormGroup,
  Alert,
  Container,
} from "reactstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function DriverDetails() {
  const [drivers, setdrivers] = useState([]);
  const [checkFirstname, setcheckFirstname] = useState(true);
  const [checkLicenseid, setcheckLicenseid] = useState(false);
  const [checkDriverid, setcheckDriverid] = useState(false);
  const [searchText, setsearchText] = useState("");

  const deleteDriver = (driver) => {
    if (
      window.confirm(
        "Driver " +
          driver.driverid +
          " (" +
          driver.firstname +
          " " +
          driver.lastname +
          ") " +
          "will be removed from the database"
      )
    ) {
      axios
        .delete(`http://localhost:8070/drivers/delete/${driver.driverid}`)
        .then((res) => {
          console.log(res);
          toast.success("Driver deleted!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 5000,
            hideProgressBar: false,
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong :(", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 10000,
            hideProgressBar: false,
          });
        });
      let filteredDrivers = drivers.filter((did) => did !== driver);
      setdrivers(filteredDrivers);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8070/drivers/details")
      .then((res) => {
        setdrivers(res.data);
      })
      .catch((err) => {
        alert("Something went wrong :(");
        console.log(err);
      });

    return () => {
      // cleanup
    };
  }, []);

  let history = useHistory();

  
  return (
    <>
      <IndexHeader />
      <IndexNavbar />
      <Container>
      <div className={driverStyles.viewdriverDiv}>
        <center><h3 className={driverStyles.header}>Driver Details</h3></center>
        <br />
        <br />
        <Row>
          <Col>
            <FormGroup>
              <InputGroup className="form-group-no-border">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Search "
                  type="text"
                  value={searchText}
                  onChange={(e) => {
                    setsearchText(e.target.value);
                  }}
                />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col>
            <div>
              <Label check>
                <Input
                  type="checkbox"
                  checked={checkFirstname}
                  onChange={() => {
                    setcheckFirstname(!checkFirstname);
                  }}
                />{" "}
                <label className={driverStyles.checkBoxLabel}>First Name</label>
              </Label>

              <Label check>
                <Input
                  type="checkbox"
                  checked={checkLicenseid}
                  onChange={() => {
                    setcheckLicenseid(!checkLicenseid);
                  }}
                />{" "}
                <label className={driverStyles.checkBoxLabel}>License ID</label>
              </Label>

              <Label check>
                <Input
                  type="checkbox"
                  checked={checkDriverid}
                  onChange={() => {
                    setcheckDriverid(!checkDriverid);
                  }}
                />{" "}
                <label className={driverStyles.checkBoxLabel}>Driver ID</label>
              </Label>
            </div>
          </Col>
          <Col></Col>
        </Row>
        <table width="100%" border="2px" className={driverStyles.tbldata}>
          <tr>
            <th className={driverStyles.tbldata}>Driver ID</th>
            <th className={driverStyles.tbldata}>First Name</th>
            <th className={driverStyles.tbldata}>Last Name</th>
            <th className={driverStyles.tbldata}>Tel No.</th>
            <th className={driverStyles.tbldata}>E-Mail</th>
            <th className={driverStyles.tbldata}>License ID</th>
            <th className={driverStyles.tbldata}>Foreign Languages</th>
            <th className={driverStyles.tbldata2}>Actions</th>
          </tr>
          {drivers
            .filter((driver) => {
              let fullName = driver.firstname + " " + driver.lastname;
              if (searchText === "") {
                return driver;
              } else {
                if (checkFirstname) {
                  if (
                    fullName.toLowerCase().includes(searchText.toLowerCase())
                  ) {
                    return driver;
                  }
                }
                if (checkLicenseid) {
                  if (
                    driver.licenseid
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  ) {
                    return driver;
                  }
                }
                if (checkDriverid) {
                  if (
                    driver.driverid
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  ) {
                    return driver;
                  }
                }
              }
            })
            .map((driver) => (
              <tr className={driverStyles.tbldata}>
                <td className={driverStyles.tbldata}>{driver.driverid}</td>
                <td className={driverStyles.tbldata}>{driver.firstname}</td>
                <td className={driverStyles.tbldata}>{driver.lastname}</td>
                <td className={driverStyles.tbldata}>{driver.phonenumber}</td>
                <td className={driverStyles.tbldata}>{driver.email}</td>
                <td className={driverStyles.tbldata}>{driver.licenseid}</td>
                <td className={driverStyles.tbldata}>{driver.languages}</td>
                <td className={driverStyles.tbldata}>
                  <button
                    className={driverStyles.btnEdit}
                    onClick={() => {
                      //     handleEdit(driver);
                      history.push(`/edit-driver/${driver._id}`);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className={driverStyles.btnDelete}
                    onClick={() => {
                      deleteDriver(driver);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </table>
      </div>
      </Container>
      <DemoFooter />
    </>
  );
}

export default DriverDetails;
