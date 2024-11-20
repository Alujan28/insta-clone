import React from "react";

const CreatePost = () => {
    return (
        <div className="card input-field"
        style={{
            margin:"10px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}
        >
            <input type="text" placeholder="title" />
            <input type="text" placeholder="body" />
            <div className="file-field input-field">
                <div className="btn">
                    <span>File</span>
                    <input type="file" />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
