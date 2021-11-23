import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { useEffect } from "react";
import ReactSession from "react-client-session/dist/ReactSession";
import IndexHeader from "components/Headers/IndexHeader";
import IndexNavbar from "components/Navbars/IndexNavbar";

import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterPage from "views/examples/RegisterPage.js";

import AddItinerary from "views/AddItinerary";
import ViewItineraries from "views/viewItineraries";
import EditItinerary from "views/EditItinerary";
import CustomizedRequests from "views/CustomizedRequests";
import ItinerarySend from "views/ItinerarySend";
import ItineraryReport from "views/CustomItineraryReport";

import EditGuide from "views/EditGuide";
import AddGuide from "views/AddGuide";
import ViewGuides from "views/ViewGuides";
import GuideManagement from "views/GuideManagement";
import BookingManagement from "views/BookingManagement";
import Assign from "views/AssignGuide";
import AssignGuide from "views/AssignGuideBookings";
import GuideReport from "views/GuideReport";

import AddHotel from "views/AddHotel";
import HotelDetails from "views/HotelDetails";
import EditHotel from "views/EditHotel";
import HotelHome from "views/HotelHome";
import Booktable from "views/booktable";
import Bookingdetails from "views/bookingdetails";
import Editbookings from "views/editbookings";
import Cancelbookingform from "views/Cancelbookingform";

import DriverUpdate from "views/DriverUpdate";
import AddDriver from "views/AddDriver";
import DriverDetails from "views/DriverDetails";
import DriverManagement from "views/DriverManagement";
import ItineraryManagement from "views/ItineraryManagement";
import AssignD from "views/AssignDriver";
import AssignDriver from "views/AssignDriverBookings";

import Addvehicle from "views/addvehicle";
import Editvehicle from "views/editvehicle";
import Vehiclelist from "views/vehiclelist";
import Vtype from "views/vtype";
import AssignVehicleBooking from "views/assignvehicleBooking";
import ReportVehicle from "views/reportvehicle";
import VehicleDashboard from "views/vehicleDashboard";
import AssVehicle from "views/assignvehicle";

import EmployeeUpdate from "views/EmployeeUpdate";

import InsurenceManagement from "views/InsurenceManagement";
import AddInsurence from "views/AddInsurence";
import EditInsurenceForm from "views/EditInsurenceForm";
import Editinsurence from "views/Editinsurence";
import DeleteInsurence from "views/DeleteInsurence";
import InsuranceReport from "views/InsuranceReport";
import EmployeeDetails from "views/EmployeeDetails";
import AddEmployee from "views/AddEmployee";
import EmployeeManagement from "views/EmployeeManagement";
import Homepage from "views/Homepage";

import HomepageAssets from "views/HomepageAssets";
import Login from "views/Login";
import AssignVc from "views/assignvehicle";
import DriverReport from "views/DriverReport";

import CFRetrieve from "views/CFRetrieve";
import CFManagement from "views/CFManagement";
import CFReport from "views/CFReport";
import ViewMessages from "views/VIewMessages";

import RegisteredUsers from "views/RegisteredUsers";

function App() {

  useEffect(() => {
    ReactSession.setStoreType("localStorage");
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/index" render={(props) => <Index {...props} />} />
        <Route
          path="/nucleo-icons"
          render={(props) => <NucleoIcons {...props} />}
        />
        <Route
          path="/landing-page"
          render={(props) => <LandingPage {...props} />}
        />
        <Route
          path="/profile-page"
          render={(props) => <ProfilePage {...props} />}
        />
        <Route
          path="/register-page"
          render={(props) => <RegisterPage {...props} />}
        />

        <Route path="/Homepage" exact>
          <Homepage />
        </Route>

        <Route path="/HomepageAssets" exact>
          <HomepageAssets />
        </Route>

        <Route //Setting path for Add Itinerary view
          path="/add-itinerary"
          exact
        >
          <AddItinerary />
        </Route>

        <Route //Setting path for Edit Itinerary view
          path="/view-itineraries"
          exact
        >
          <ViewItineraries />
        </Route>

        <Route path="/sendItinerary/:username" exact>
          <ItinerarySend />
        </Route>

        <Route path="/CustomizedReq" exact>
          <CustomizedRequests />
        </Route>

        <Route path="/edit-itinerary/:id" exact>
          <EditItinerary />
        </Route>

        <Route path="/Itinerary-report" exact>
          <ItineraryReport />
        </Route>

        <Route path="/edit-guide/:id" exact>
          <EditGuide />
        </Route>
        <Route path="/add-guide" exact>
          <AddGuide />
        </Route>
        <Route path="/view-guides" exact>
          <ViewGuides />
        </Route>
        <Route path="/assign-guide/:tide" exact>
          <Assign />
        </Route>

        <Route path="/assign-guide-booking" exact>
          <AssignGuide />
        </Route>

        <Route path="/guide-report" exact>
          <GuideReport />
        </Route>

        <Route path="/edit-driver/:id" exact component={DriverUpdate} />
        <Route path="/Add-Driver" exact component={AddDriver} />
        <Route path="/View-Driver" exact component={DriverDetails} />
       
        <Route path="/assign-driver/:username" exact>
          <AssignD />
        </Route>

        {/*Setting Management Function paths */}

        <Route path="/guide-management" exact>
          <GuideManagement />
        </Route>

        {/* vehicle */}
        <Route path="/add-vehicle" exact>
          <Addvehicle />
        </Route>
        <Route path="/view-vehicles" exact>
          <Vehiclelist />
        </Route>
        <Route path="/type-vehicles" exact>
          <Vtype />
        </Route>

        <Route path="/edit-vehicle/:id" component={Editvehicle} />

        {/*<Route path="/assign-vehicles" component={AssignVehicle} />*/}

        <Route path="/report-vehicles" component={ReportVehicle} />

        <Route path="/vehicle-management" component={VehicleDashboard} />

        <Route path="/edit-vehicle/:id" component={Editvehicle} />

        <Route
          path="/assign-vehiclesBooking"
          component={AssignVehicleBooking}
        />

        <Route path="/report-vehicles" component={ReportVehicle} />

        <Route path="/vehicle-management" component={VehicleDashboard} />

        <Route path="/assign-vehicle/:username" component={AssignVc} />

        {/*registered user path*/}

        <Route path="/registered-user" component={RegisteredUsers} />

        <Route path="/itinerary-management" exact>
          <ItineraryManagement />
        </Route>

        <Route path="/driver-management" exact>
          <DriverManagement />
        </Route>

        <Route path="/booking-management" exact>
          <BookingManagement />
        </Route>

        <Route path="/booktable" exact>
          <Booktable />
        </Route>
        <Route
          path="/edit-bookingmanagement/:id"
          component={Editbookings}
        ></Route>

        <Route
          path="/add-cancelbooking/:id"
          component={Cancelbookingform}
        ></Route>

        <Route path="/edit-driver/:id" component={DriverUpdate} />
        <Route path="/Add-Driver" component={AddDriver} />
        <Route path="/View-Driver" component={DriverDetails} />
        <Route path="/Report-Driver" component={DriverReport} />

        <Route //setting path to Insurence management page
          path="/insurence-home"
          exact
        >
          <InsurenceManagement />
        </Route>

        <Route path="/add-cancelbooking/:id" component={Cancelbookingform} />

        <Route path="/add-insurence" exact>
          <AddInsurence />
        </Route>

        <Route path="/edit-insurence" exact>
          <Editinsurence />
        </Route>

        <Route path="/delete-insurence" exact>
          <DeleteInsurence />
        </Route>

        <Route path="/edit-form-insurence/:id" exact>
          <EditInsurenceForm />
        </Route>

        <Route path="/edit-driver/:id" component={DriverUpdate} />
        <Route path="/Add-Driver" component={AddDriver} />
        <Route path="/View-Driver" component={DriverDetails} />
        <Route path="/Assign-Driver" component={AssignDriver} />

        <Route path="/report-insurance" exact>
          <InsuranceReport />
        </Route>

        <Route //Setting path for hotels
          path="/hotel-management"
          exact
        >
          <HotelHome />
        </Route>

        <Route path="/add" exact>
          <AddHotel />
        </Route>

        <Route path="/edit/:id" component={EditHotel}></Route>

        <Route path="/get" exact>
          <HotelDetails />
        </Route>

        <Route path="/edit-employee/:id" component={EmployeeUpdate} />

        <Route path="/View-Employee" component={EmployeeDetails} />
        <Route path="/Add-Employee" component={AddEmployee} />
        <Route path="/employee-management" exact>
          <EmployeeManagement />
        </Route>

        

        <Route path="/login" exact>
          <Login />
        </Route>

        <Route path="/view-cf" exact>
          <CFRetrieve />
        </Route>

        <Route path="/cf-management" exact>
          <CFManagement />
        </Route>

        <Route path = "/cf-report" exact>
        <CFReport/>
        </Route>

        <Route path = "/view-messages" exact>
          <ViewMessages/>
        </Route>

        <Redirect to="/index" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
