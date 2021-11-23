import React, { Component } from 'react';
import axios from 'axios';
class bookingdetails extends Component {
    constructor(props){
        super(props);
        this.state={
            post:{}
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        axios.get(`/book/${id}`).then((res) =>{
            if(res.data.success){
                this.setState({
                    post:res.data.post
                });
                console.log(this.state.post);
            }
        });
    }
    
    render() {

        const{arrivalDate,tourID} = this.state.post;

        return (
            <div style={{marginTop:'20px'}}>
                 details
                
                <h4>{arrivalDate}</h4>
                <h4>{tourID}</h4>
               
            </div>
        );
    }
}

export default bookingdetails;