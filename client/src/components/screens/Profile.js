import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'

const Profile = () => {
    const [mypics, setPics] = useState([])  // State for storing user posts
    const { state, dispatch } = useContext(UserContext)  // Accessing global state and dispatch
    const [image, setImage] = useState("")  // State for storing selected image for profile update

    useEffect(() => {
        // Fetching user posts from the server
        fetch('/mypost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")  // Authorization with JWT token
            }
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            setPics(result.mypost)  // Setting user posts in the state
        })
    }, [])  // Empty dependency array to run this effect only once after initial render

    useEffect(() => {
        if (image) {
            // If image is selected, prepare data for upload to Cloudinary
            const data = new FormData()
            data.append("file", image)  // Append selected file
            data.append("upload_preset", "insta-clone")  // Cloudinary upload preset
            data.append("cloud_name", "cnq")  // Cloudinary cloud name

            // Upload the image to Cloudinary
            fetch("https://api.cloudinary.com/v1_1/cnq/image/upload", {
                method: "post",
                body: data
            })
            .then(res => res.json())
            .then(data => {
                // Once uploaded, update the profile picture on the server
                fetch('/updatepic', {
                    method: "put",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("jwt")
                    },
                    body: JSON.stringify({
                        pic: data.url  // Sending the Cloudinary URL for the new profile picture
                    })
                }).then(res => res.json())
                .then(result => {
                    console.log(result)
                    // Update localStorage and global state with the new profile pic
                    localStorage.setItem("user", JSON.stringify({ ...state, pic: result.pic }))
                    dispatch({ type: "UPDATEPIC", payload: result.pic })  // Dispatch to update user state
                }).catch(err => {
                    console.log("Error updating profile pic:", err)
                })
            }).catch(err => {
                console.log("Error uploading photo:", err)
            })
        }
    }, [image, dispatch, state])  // Adding dispatch and state to the dependencies

    const updatePhoto = (file) => {
        setImage(file)  // Update the image state when a new file is selected
    }

    return (
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
            <div style={{ margin: "18px 0px", borderBottom: "1px solid grey" }}>

                <div style={{
                    display: "flex",
                    justifyContent: "space-around",
                }}>
                    <div>
                        {/* Profile image */}
                        <img
                            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                            src={state ? state.pic : "loading"}  // Display the user's profile pic or "loading" text
                        />
                    </div>
                    <div>
                        <h4>{state ? state.name : "loading"}</h4>
                        <h5>{state ? state.email : "loading"}</h5>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                            <h6>{mypics.length} posts</h6>
                            <h6>{state ? state.followers.length : "0"} followers</h6>
                            <h6>{state ? state.following.length : "0"} following</h6>
                        </div>
                    </div>
                </div>

                {/* File upload for updating profile picture */}
                <div className="file-field input-field" style={{ margin: "10px" }}>
                    <div className="btn #64b5f6 blue darken-1">
                        <span>Update pic</span>
                        <input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
            </div>

            {/* Gallery displaying user posts */}
            <div className="gallery">
                {mypics.map(item => {
                    return (
                        <img key={item._id} className="item" src={item.photo} alt={item.title} />
                    )
                })}
            </div>
        </div>
    )
}

export default Profile
