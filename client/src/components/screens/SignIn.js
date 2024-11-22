import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import M from 'materialize-css';

const SignIn = () => {
    const { dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    // Helper function for toast messages
    const showToast = (message, classes) => {
        M.toast({ html: message, classes });
    };

    // Email validation function
    const isValidEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    const PostData = async () => {
        if (!isValidEmail(email)) {
            showToast('Invalid email', '#c62828 red darken-3');
            return;
        }

        try {
            const res = await fetch('/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, email }),
            });

            const data = await res.json();

            if (data.error) {
                showToast(data.error, '#c62828 red darken-3');
            } else {
                localStorage.setItem('jwt', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                dispatch({ type: 'USER', payload: data.user });
                showToast('Signed in successfully', '#43a047 green darken-1');
                navigate('/');
            }
        } catch (err) {
            console.log(err);
            showToast('Something went wrong, please try again later.', '#c62828 red darken-3');
        }
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
                    onClick={PostData}
                    disabled={!email || !password || !isValidEmail(email)} // Disable if email or password is empty
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
    );
};

export default SignIn;
