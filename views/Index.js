/*!

=========================================================
* Paper Kit React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

// index sections
import SectionButtons from "views/index-sections/SectionButtons.js";
import SectionNavbars from "views/index-sections/SectionNavbars.js";
import SectionNavigation from "views/index-sections/SectionNavigation.js";
import SectionProgress from "views/index-sections/SectionProgress.js";
import SectionNotifications from "views/index-sections/SectionNotifications.js";
import SectionTypography from "views/index-sections/SectionTypography.js";
import SectionJavaScript from "views/index-sections/SectionJavaScript.js";
import SectionCarousel from "views/index-sections/SectionCarousel.js";
import SectionNucleoIcons from "views/index-sections/SectionNucleoIcons.js";
import SectionDark from "views/index-sections/SectionDark.js";
import SectionLogin from "views/index-sections/SectionLogin.js";
import SectionExamples from "views/index-sections/SectionExamples.js";
import SectionDownload from "views/index-sections/SectionDownload.js";
import AddItinerary from "./AddItinerary";
import ViewItineraries from "./viewItineraries";
import ItineraryManagement from "./ItineraryManagement";
import CustomizedRequests from "./CustomizedRequests";
import AddGuide from "./AddGuide";
import ViewGuides from "./ViewGuides";
import GuideManagement from "./GuideManagement";
import Booktable from "./booktable";
import BookingManagement from "./BookingManagement";
import HotelDetails from "./HotelDetails";
import EditHotel from "./EditHotel";
import AddHotel from "./AddHotel";
import HotelHome from "./HotelHome";
import GuideReport from "./GuideReport";



import Home from "./booktable";

import AddDriver from "./AddDriver";
import DriverDetails from "./DriverDetails"
import DriverManagement from "./DriverManagement";
import Homepage from "./Homepage";



import VehicleDashboard from "./vehicleDashboard";
import Editvehicle from "./editvehicle";
import AssignVehicle from "./assignvehicleBooking";
import EmployeeDetails from "./EmployeeDetails";
import EmployeeUpdate from "./EmployeeUpdate";

import AssignGuide from "./AssignGuideBookings";

import Assign from "./AssignGuide"
import EmployeeManagement from "./EmployeeManagement";
import AddEmployee from "./AddEmployee";
import AssignDriver from "./AssignDriver";
import AssignDriverBooking from "./AssignDriverBookings"

import Login from "./Login";
import ItineraryReport from "./CustomItineraryReport";
import DriverReport from "./DriverReport";



function Index() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });
  return (
    <>

      <div className="main">
        <IndexNavbar />
        <IndexHeader/>
      {/*<SectionButtons />
        <SectionNavbars />
        <SectionNavigation />
        <SectionProgress />
        <SectionNotifications />
        <SectionTypography />
        <SectionJavaScript />
        <SectionCarousel />
        <SectionNucleoIcons />
        <SectionDark />
        <SectionLogin />
        <SectionExamples />
        <SectionDownload />
        <GuideManagement /> 
        
        

        <SectionDownload /> 
        <GuideManagement />

        <AddDriver/>
        <DriverDetails/>
        <DriverManagement/>
     <AssignGuide />
      <BookingManagement />
     <GuideReport />
     <Home/>
      <EmployeeManagement/>
     <AssignGuide /> */}
      <Homepage/>
      
   
      
        <DemoFooter />


      </div>
    </>
  );
}

export default Index;
