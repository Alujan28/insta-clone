import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'  // Use useNavigate instead of useHistory
import { UserContext } from '../../App'
import M from 'materialize-css'

const SignIn = () => {
    const { state, dispatch } = useContext(UserContext)
    const navigate = useNavigate()  // Use useNavigate instead of useHistory
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const PostData = () => {
        // Email validation regex
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!emailRegex.test(email)) {
            M.toast({ html: "Invalid email", classes: "#c62828 red darken-3" })
            return
        }

        // Sending sign-in data to the backend
        fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.error) {
                M.toast({ html: data.error, classes: "#c62828 red darken-3" })
            } else {
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch({ type: "USER", payload: data.user })
                M.toast({ html: "Signed in successfully", classes: "#43a047 green darken-1" })
                navigate('/')  // Use navigate instead of history.push
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}  // Handle email input change
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}  // Handle password input change
                />
                <button 
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={PostData}  // Trigger PostData on button click
                >
                    Login
                </button>
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
                <h6>
                    <Link to="/reset">Forgot password?</Link>
                </h6>
            </div>
        </div>
    )
}

export default SignIn
