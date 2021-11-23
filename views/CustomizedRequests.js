import{Button} from 'reactstrap'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

import IndexHeader from 'components/Headers/IndexHeader';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import DemoFooter from 'components/Footers/DemoFooter';




function CustomizedRequests(){
    
    let history = useHistory();


    const [bookings , setBookings] = useState ([]);
    
    useEffect(()=>{
        axios.get("http://localhost:8070/bookings/").then((res) =>{
            setBookings(res.data);
        })
    })
    var number = 1;
    return(
        <>
        <IndexHeader />
        <IndexNavbar />
        <div>
            <h3>Customized Itinerary Requests</h3><br/><br/>
            <div className = "tableContainer">
                <table className = "table table-striped">
                    <thead>
                        <th scope = "row">#</th>
                        <th scope = "col">Booking ID</th>
                        <th scope = "col">Booking Date </th>
                        <th scope = "col">Description</th>

                        <th scope = "col">Operation</th>

                    </thead>

                    <tbody>
                        {bookings.map((booking) => (
                            <tr>
                                <th scope = "row">{number++}</th>
                                <td>{booking.tourId}</td>
                                <td>{booking.bookingDate}</td>
                                <td>{booking.customziedItinerary}</td>
                                                                                      
                                <td><Button color="info" onClick = {()=>{
                                    history.push(`/sendItinerary/${booking.username}`);
                                }}>Add Itinerary</Button></td>
                            </tr>
                        ))}
                    </tbody>    


                </table>
            </div>    
        </div>    
        <DemoFooter />
        </>
    );


}

export  default CustomizedRequests;