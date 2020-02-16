import React, { Component } from 'react'
import {Redirect, Link} from 'react-router-dom'

import DefaultProfile from '../images/avatar.jpg'
import {isAuthenticated, signout} from '../auth'
import {remove} from './apiUser'

class Profile extends Component {

    state = {
        redirect: false
    }

    deleteAccount = () => {
        const token = isAuthenticated().token
        const userId = this.props.userId
        remove(userId, token)
        .then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                signout(() => console.log("User is deleted"))
                this.setState({redirect: true})
            }
        })
    }

    deleteConfirmed = () => {
        let answer = window.confirm("Are you sure you to delete your account?")
        if(answer) {
            this.deleteAccount()
        }
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to="/" />
        }
        
        return (
            <>
                <button
                    onClick={this.deleteConfirmed}
                    className="btn btn-raised btn-danger"
                >
                    Delete Profile
                </button>
            </>
        )
    }
}

export default Profile
