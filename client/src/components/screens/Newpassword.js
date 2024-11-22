import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import M from 'materialize-css';

const NewPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const { token } = useParams(); // Retrieve token from URL params

    const validatePassword = (password) => {
        // Example: password must be at least 6 characters long
        return password.length >= 6;
    };

    const PostData = () => {
        if (!validatePassword(password)) {
            M.toast({ 
                html: "Password must be at least 6 characters long.", 
                classes: "#c62828 red darken-3" 
            });
            return;
        }

        fetch('/new-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password,
                token,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    M.toast({ 
                        html: data.error, 
                        classes: "#c62828 red darken-3" 
                    });
                } else {
                    M.toast({ 
                        html: data.message, 
                        classes: "#43a047 green darken-1" 
                    });
                    navigate('/signin');
                }
            })
            .catch((err) => {
                console.error(err);
                M.toast({ 
                    html: "Something went wrong. Please try again.", 
                    classes: "#c62828 red darken-3" 
                });
            });
    };

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input
                    type="password"
                    placeholder="Enter a new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={PostData}
                >
                    Update Password
                </button>
            </div>
        </div>
    );
};

export default NewPassword;