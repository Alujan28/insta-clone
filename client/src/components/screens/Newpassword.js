import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom' // useNavigate instead of useHistory
import M from 'materialize-css'

const SignIn = () => {
    const navigate = useNavigate()  // useNavigate hook
    const [password, setPassword] = useState("")  // Corrected the typo
    const { token } = useParams()  // Params to fetch the token from the URL

    console.log(token)

    const PostData = () => {
        fetch("/new-password", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                token
            })
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.error) {
                M.toast({ html: data.error, classes: "#c62828 red darken-3" })
            }
            else {
                M.toast({ html: data.message, classes: "#43a047 green darken-1" })
                navigate('/signin')  // use navigate instead of history.push
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input
                    type="password"
                    placeholder="Enter a new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}  // Corrected the typo
                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                        onClick={PostData}>
                    Update Password
                </button>
            </div>
        </div>
    )
}

export default SignIn
