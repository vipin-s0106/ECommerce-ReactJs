import React, { Component } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export class Order extends Component {

    constructor(props){
        super(props) 
        
        this.state = {
            orders:[]
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3200/orders')
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            if(err.response.status === 401){
                this.props.history.push('/login')
            }
            else{
                return toast.error("some error occured")
            }
        })
    }


    render() {
        return (
            <div>
                Order List
                <ToastContainer />
            </div>
        )
    }
}

export default Order
