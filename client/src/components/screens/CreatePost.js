import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (url) {
            const token = localStorage.getItem("jwt");
            fetch("/createpost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                    title,
                    body,
                    pic: url,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        M.toast({ html: data.error, classes: "#e53935 red darken-1" });
                    } else {
                        M.toast({ html: "Post created successfully!", classes: "#43a047 green darken-1" });
                        navigate("/");
                    }
                })
                .catch((err) => {
                    console.error("Error:", err);
                    M.toast({ html: "Something went wrong", classes: "#e53935 red darken-1" });
                });
        }
    }, [url, title, body, navigate]);

    const postDetails = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "insta-clone");
        data.append("cloud_name", "dqkmnrjdr");

        fetch("https://api.cloudinary.com/v1_1/dqkmnrjdr/image/upload", {
            method: "POST",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                setUrl(data.secure_url);
            })
            .catch((err) => {
                console.error("Error uploading image:", err);
                M.toast({ html: "Image upload failed", classes: "#e53935 red darken-1" });
            });
    };

    return (
        <div
            className="card input-field"
            style={{
                margin: "30px auto",
                maxWidth: "500px",
                padding: "20px",
                textAlign: "center",
            }}
        >
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button
                className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={postDetails}
            >
                Submit Post
            </button>
        </div>
    );
};

export default CreatePost;
