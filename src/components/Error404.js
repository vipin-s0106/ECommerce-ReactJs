import React, { Component } from 'react'
import errorImg from '../assests/error404.png'

export class Error404 extends Component {
    render() {
        return (
            <div>
                <img src={errorImg} />
            </div>
        )
    }
}

export default Error404
