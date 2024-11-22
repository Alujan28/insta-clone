import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'  // Import useNavigate instead of useHistory
import M from 'materialize-css'

const Reset = () => {
    const navigate = useNavigate()  // Use useNavigate instead of useHistory
    const [email, setEmail] = useState("")  // State to hold the entered email

    const PostData = () => {
        // Email validation regex
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!emailRegex.test(email)) {
            M.toast({ html: "Invalid email address", classes: "#c62828 red darken-3" })
            return
        }

        // Sending email to the backend for password reset request
        fetch('/reset-password', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })  // Sending email as part of the request body
        })
        .then(res => res.json())  // Handling the JSON response
        .then(data => {
            if (data.error) {
                M.toast({ html: data.error, classes: "#c62828 red darken-3" })
            } else {
                M.toast({ html: data.message, classes: "#43a047 green darken-1" })
                navigate('/signin')  // Use navigate instead of history.push
            }
        })
        .catch(err => {
            console.log(err)
            M.toast({ html: "Something went wrong. Please try again later.", classes: "#c62828 red darken-3" })
        })
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}  // Handling input change
                />
                <button
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={PostData}  // Calling PostData when the button is clicked
                >
                    Reset Password
                </button>
            </div>
        </div>
    )
}

export default Reset
