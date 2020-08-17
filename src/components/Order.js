import React, { Component } from 'react'
import axios from 'axios';

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
            console.log(err)
        })
    }


    render() {
        return (
            <div>
                Orders List
            </div>
        )
    }
}

export default Order
