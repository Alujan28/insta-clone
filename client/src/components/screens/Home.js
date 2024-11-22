import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

const Home = () => {
    const [data, setData] = useState([]);
    const { state, dispatch } = useContext(UserContext);

    useEffect(() => {
        fetch('/allpost', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.error) {
                    M.toast({ html: result.error, classes: '#c62828 red darken-3' });
                } else {
                    setData(result.posts);
                }
            })
            .catch((err) => {
                console.log(err);
                M.toast({ html: 'Failed to load posts. Please try again.', classes: '#c62828 red darken-3' });
            });
    }, []);

    const likePost = (id) => {
        fetch('/like', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
                postId: id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                const newData = data.map((item) => (item._id === result._id ? result : item));
                setData(newData);
            })
            .catch((err) => {
                console.log(err);
                M.toast({ html: 'Failed to like the post. Please try again.', classes: '#c62828 red darken-3' });
            });
    };

    const unlikePost = (id) => {
        fetch('/unlike', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
                postId: id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                const newData = data.map((item) => (item._id === result._id ? result : item));
                setData(newData);
            })
            .catch((err) => {
                console.log(err);
                M.toast({ html: 'Failed to unlike the post. Please try again.', classes: '#c62828 red darken-3' });
            });
    };

    const makeComment = (text, postId) => {
        fetch('/comment', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
                postId,
                text,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                const newData = data.map((item) => (item._id === result._id ? result : item));
                setData(newData);
            })
            .catch((err) => {
                console.log(err);
                M.toast({ html: 'Failed to add comment. Please try again.', classes: '#c62828 red darken-3' });
            });
    };

    const deletePost = (postid) => {
        fetch(`/deletepost/${postid}`, {
            method: 'delete',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                const newData = data.filter((item) => item._id !== result._id);
                setData(newData);
            })
            .catch((err) => {
                console.log(err);
                M.toast({ html: 'Failed to delete post. Please try again.', classes: '#c62828 red darken-3' });
            });
    };

    return (
        <div className="home">
            {data.length === 0 ? (
                <h5>Loading posts...</h5>
            ) : (
                data.map((item) => (
                    <div className="card home-card" key={item._id}>
                        <h5 style={{ padding: '5px' }}>
                            <Link to={item.postedBy._id !== state._id ? '/profile/' + item.postedBy._id : '/profile'}>
                                {item.postedBy.name}
                            </Link>
                            {item.postedBy._id === state._id && (
                                <i
                                    className="material-icons"
                                    style={{ float: 'right' }}
                                    onClick={() => deletePost(item._id)}
                                >
                                    delete
                                </i>
                            )}
                        </h5>
                        <div className="card-image">
                            <img src={item.photo} loading="lazy" />
                        </div>
                        <div className="card-content">
                            <i className="material-icons" style={{ color: 'red' }}>
                                favorite
                            </i>
                            {item.likes.includes(state._id) ? (
                                <i className="material-icons" onClick={() => unlikePost(item._id)}>
                                    thumb_down
                                </i>
                            ) : (
                                <i className="material-icons" onClick={() => likePost(item._id)}>
                                    thumb_up
                                </i>
                            )}
                            <h6>{item.likes.length} likes</h6>
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            {item.comments.map((record) => (
                                <h6 key={record._id}>
                                    <span style={{ fontWeight: '500' }}>{record.postedBy.name}</span> {record.text}
                                </h6>
                            ))}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    makeComment(e.target[0].value, item._id);
                                }}
                            >
                                <input type="text" placeholder="Add a comment" />
                            </form>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Home;
