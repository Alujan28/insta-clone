import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import M from 'materialize-css';

const Reset = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    // Helper function to display toast messages
    const showToast = (message, classes) => {
        M.toast({ html: message, classes });
    };

    // Email validation using a more reliable regex
    const isValidEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    const PostData = async () => {
        if (!isValidEmail(email)) {
            showToast("Invalid email", "#c62828 red darken-3");
            return;
        }

        try {
            const res = await fetch('/reset-password', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (data.error) {
                showToast(data.error, "#c62828 red darken-3");
            } else {
                showToast(data.message, "#43a047 green darken-1");
                navigate('/signin');
            }
        } catch (err) {
            console.error("Error during password reset:", err);
            showToast("Something went wrong, please try again later.", "#c62828 red darken-3");
        }
    };

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={PostData}
                    disabled={!email || !isValidEmail(email)} // Disable if email is empty or invalid
                >
                    Reset Password
                </button>
            </div>
        </div>
    );
};

export default Reset;