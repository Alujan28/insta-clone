import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'  // Replace useHistory with useNavigate
import M from 'materialize-css'

const SignIn = () => {
    const navigate = useNavigate()  // useNavigate instead of useHistory
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState(null)  // Set initial state to null for image
    const [url, setUrl] = useState(undefined)

    useEffect(() => {
        if (url) {
            uploadFields()  // Call uploadFields once the URL is set
        }
    }, [url])

    // Upload image to cloudinary
    const uploadPic = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "new-insta")
        data.append("cloud_name", "cnq")

        fetch("https://api.cloudinary.com/v1_1/cnq/image/upload", {
            method: "POST",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url)  // Set the URL after the image is uploaded
            })
            .catch(err => {
                console.log(err)
            })
    }

    // Upload user data once image URL is available
    const uploadFields = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "Invalid email", classes: "#c62828 red darken-3" })
            return
        }

        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email,
                pic: url
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                } else {
                    M.toast({ html: data.message, classes: "#43a047 green darken-1" })
                    navigate('/signin')  // Use navigate for redirection
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const PostData = () => {
        if (image) {
            uploadPic()  // If image is provided, upload it first
        } else {
            uploadFields()  // Otherwise, just upload fields
        }
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}  // Handle name input change
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}  // Handle email input change
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}  // Handle password input change
                />
                <div className="file-field input-field">
                    <div className="btn #64b5f6 blue darken-1">
                        <span>Upload pic</span>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}  // Set the image file
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={PostData}  // Trigger PostData on button click
                >
                    SignUp
                </button>
                <h5>
                    <Link to="/signin">Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default SignIn
