import React, { useState } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";

const Signup = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const PostData = () => {
        if (!name || !email || !password) {
            M.toast({ html: "Please add all the fields", classes: "#e53935 red darken-1" });
            return;
        }

        fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                password,
                email
            })
        }).then(res => res.json())
        .then(data => {
            if (data.error) {
                M.toast({ html: data.error, classes: "#e53935 red darken-1" });
            } else {
                M.toast({ html: "Signup successful", classes: "#43a047 green darken-1" });
            }
        })
        .catch(err => {
            console.error(err);
            M.toast({ html: "Something went wrong", classes: "#e53935 red darken-1" });
        });
    };

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input 
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={PostData}
                >
                    Signup
                </button>
                <h5>
                    <Link to="/signin">Already have an account?</Link>
                </h5>
            </div>
        </div>
    );
};

export default Signup;
