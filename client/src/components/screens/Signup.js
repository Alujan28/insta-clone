import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css';

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [url, setUrl] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (url) {
            uploadFields();
        }
    }, [url]);

    const uploadPic = () => {
        if (!image) return;
        const fileType = image.type.split('/')[0];
        if (fileType !== 'image') {
            M.toast({ html: 'Only image files are allowed', classes: '#c62828 red darken-3' });
            return;
        }
        setIsLoading(true);
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'new-insta');
        data.append('cloud_name', 'cnq');
        fetch("https://api.cloudinary.com/v1_1/dqkmnrjdr/image/upload", {
            method: 'post',
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                setUrl(data.url);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
                M.toast({ html: 'Image upload failed', classes: '#c62828 red darken-3' });
            });
    };

    const uploadFields = () => {
        // Validate fields before submitting
        if (!name || !password || !email) {
            M.toast({ html: 'All fields are required', classes: '#c62828 red darken-3' });
            return;
        }
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: 'Invalid email', classes: '#c62828 red darken-3' });
            return;
        }
        setIsLoading(true);
        fetch('/signup', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                password,
                email,
                pic: url,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setIsLoading(false);
                if (data.error) {
                    M.toast({ html: data.error, classes: '#c62828 red darken-3' });
                } else {
                    M.toast({ html: data.message, classes: '#43a047 green darken-1' });
                    navigate('/signin');
                }
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
                M.toast({ html: 'Signup failed', classes: '#c62828 red darken-3' });
            });
    };

    const PostData = (e) => {
        e.preventDefault();
        if (image) {
            uploadPic();
        } else {
            uploadFields();
        }
    };

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <div className="file-field input-field">
                    <div className="btn #64b5f6 blue darken-1">
                        <span>Upload Pic</span>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={PostData}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'SignUp'}
                </button>
                <h5>
                    <Link to="/signin">Already have an account?</Link>
                </h5>
            </div>
        </div>
    );
};

export default SignUp;
