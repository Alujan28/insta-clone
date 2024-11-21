import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const PostData = () => {
        if (!email || !password) {
            M.toast({ html: "Please fill all fields", classes: "#e53935 red darken-1" });
            return;
        }

        if (!isValidEmail(email)) {
            M.toast({ html: "Invalid email format", classes: "#e53935 red darken-1" });
            return;
        }

        fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#e53935 red darken-1" });
                } else {
                    
                    localStorage.setItem("jwt", data.token);

                    M.toast({ html: "Login successful", classes: "#43a047 green darken-1" });
                    navigate("/");  
                }
            })
            .catch((err) => {
                console.error("Error:", err);
                M.toast({ html: "Something went wrong", classes: "#e53935 red darken-1" });
            });
    };

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={() => PostData()}
                >
                    Login
                </button>
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
            </div>
        </div>
    );
};

export default SignIn;
