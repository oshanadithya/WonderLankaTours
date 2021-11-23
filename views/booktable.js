import React, { Component } from 'react';
import axios from 'axios' ;
import styles from "../assets/css/Viewbooking.module.css";
import IndexHeader from 'components/Headers/IndexHeader';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import DemoFooter from 'components/Footers/DemoFooter';
import { post } from 'jquery';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

class Booktable extends Component {
constructor(props){
  super(props);
  this.state = {
    posts:[]
  };

}

componentDidMount(){
  this.retrievePosts();
}

retrievePosts(){
  axios.get("/bookings").then(res =>{
    if(res.data.success){
      this.setState({
        posts:res.data.existingPosts
      });

      console.log(this.state.posts);
    }
  });
}

onDelete=(id) =>{
    axios.delete(`/post/delete/${id}`).then((res)=>{
      alert("Delete Succesfully");
      this.retrievePosts();
    })
}

//search function
filterData(posts,searchkey){
  const result = posts.filter((post)=>
  post.tourId.includes(searchkey)||
  post.arrivalDate.includes(searchkey)||
  post.bookingDate.includes(searchkey)||
  post.iclass.includes(searchkey)||
  post.fullName.includes(searchkey)||
  post.insurance.includes(searchkey)||
  post.itinerary.includes(searchkey)||
  post.tourId.includes(searchkey)||
  post.country.includes(searchkey)||
  post.email.includes(searchkey)||
  post.email.includes(searchkey)
  )
  this.setState({posts:result})
}

handleSearchArea =(e) =>{
  const searchkey=e.currentTarget.value;

  axios.get("/bookings").then(res =>{
    if(res.data.success){
      this.filterData(res.data.existingPosts,searchkey)
    }
  });

}

         

  render() {
    return (
      <div>
       <IndexHeader/>
       <IndexNavbar/>
      
     
      <div>
     
        <br/>
        <br/>
        <center>
        <p className="paragraph">Booking Details</p>
        </center>
        <div style={{position:'absolute' ,left:'85%' ,width:'14%'}}>
        <div className="row">
        <div className="col-lg-12 mt-2 mb-2 ">
          <input 
          className="form-control" 
          type="search" 
          placeholder="search"
          name="searchQuery"
          onChange={this.handleSearchArea}></input>
          </div>
          </div>
          </div>
        <br/>
        <br/>
        <br/>
        
        <table width="100%" border="2px" className={styles.tbldata}>
         <tr>
           
          
           <th style={{width: 50}} className ={styles.tbldata}>TourID</th>
           <th style={{width: 40}}className ={styles.tbldata}>ArrivalDate</th>
           <th style={{width: 40}}className ={styles.tbldata}>BookingDate</th>
           <th className ={styles.tbldata}>Class</th>
           <th style={{width: 30}}className ={styles.tbldata}>Email</th>
           <th style={{width: 30}}className ={styles.tbldata}>MobileNo</th>
           <th style={{width: 140}}className ={styles.tbldata}>Itinerary</th>
           <th className ={styles.tbldata}>UserName</th>
           <th className ={styles.tbldata}>FullName</th>
           <th className ={styles.tbldata}>Insurance</th>
           <th className ={styles.tbldata}>Itinerary</th>
           <th className ={styles.tbldata}>Adults</th>
           <th className ={styles.tbldata}>kids18</th>
           <th className ={styles.tbldata}>Kids8</th>
           <th style={{width: 50}}className ={styles.tbldata}>Country</th>
           <th className ={styles.tbldata}>Payment</th>
           <th className ={styles.tbldata}>Action</th>

         </tr>
      
        
          {this.state.posts.map((posts) =>(
            <tr className={styles.tbldata}>
      
              <td  className={styles.tbldataa}><a href={`/add-cancelbooking/${posts._id}`} style={{textDecoration:'none',color:'rgba(5, 0, 0, 0.658)',fontWeight:'bold'}}>{posts.tourId}</a></td>
              <td  className={styles.tbldata}>{posts.arrivalDate}</td>
              <td className={styles.tbldata}>{posts.bookingDate}</td>
              <td className={styles.tbldata}>{posts.iclass}</td>   
              <td className={styles.tbldata}>{posts.email}</td>
              <td className={styles.tbldata}>{posts.mobileNo}</td>   
              <td className={styles.tbldata}>{posts.itinerary}</td>  
              <td className={styles.tbldata}>{posts.username}</td>   
              <td className={styles.tbldata}>{posts.fullName}</td>  
              <td className={styles.tbldata}>{posts.insurance}</td>
              <td className={styles.tbldata}>{posts.itinerary}</td>
              <td className={styles.tbldata}>{posts.noOfAdults}</td>
              <td className={styles.tbldata}>{posts.noOfKids18}</td>
              <td className={styles.tbldata}>{posts.noOfKids8}</td>
              <td style={{minwidth: 30}}className={styles.tbldata}>{posts.country}</td>
              <td className={styles.tbldata}>{posts.payment}</td>
              <td className={styles.tbldata}>
              <button
                  className={styles.btnEdit}
              
                >
                  <a  style={{textDecoration:'none' ,color:'white',fontweight: 700}} href={`/edit-bookingmanagement/${posts._id}`}>

                  Edit
                  </a>
                </button>
            
              
                <button
                className={styles.btnDelete}
                  onClick={()=>this.onDelete(posts._id)}
                >
                  Delete
                </button>
              
              
                </td>
              </tr>
          ))}

        
        </table>
      </div>
      
      <br/>
      <br/>
      <br/>
      
      
      <DemoFooter/>
      </div>
    )


  }
}

export default Booktable;
