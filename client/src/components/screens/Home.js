import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { state } = useContext(UserContext);

    useEffect(() => {
        fetch('/allpost', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setData(result.posts);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const updatePost = (url, body) => {
        fetch(url, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((result) => {
                const newData = data.map((item) => (item._id === result._id ? result : item));
                setData(newData);
            })
            .catch((err) => {
                console.log(err);
                M.toast({ html: "Something went wrong!", classes: "#c62828 red darken-3" });
            });
    };

    const deletePost = (postId) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        fetch(`/deletepost/${postId}`, {
            method: "delete",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                const newData = data.filter((item) => item._id !== result._id);
                setData(newData);
            })
            .catch((err) => {
                console.log(err);
                M.toast({ html: "Failed to delete post!", classes: "#c62828 red darken-3" });
            });
    };

    return (
        <div className="home">
            {loading && <h5>Loading...</h5>}
            {!loading && data.length === 0 && <h5>No posts available</h5>}
            {data.map((item) => (
                <div className="card home-card" key={item._id}>
                    <h5 style={{ padding: "5px" }}>
                        <Link to={item.postedBy?._id !== state?._id ? `/profile/${item.postedBy._id}` : "/profile"}>
                            {item.postedBy?.name || "Unknown"}
                        </Link>
                        {item.postedBy?._id === state?._id && (
                            <i
                                className="material-icons"
                                style={{ float: "right" }}
                                onClick={() => deletePost(item._id)}
                            >
                                delete
                            </i>
                        )}
                    </h5>
                    <div className="card-image">
                        <img src={item.photo} alt={item.title} />
                    </div>
                    <div className="card-content">
                        <i className="material-icons" style={{ color: "red" }}>favorite</i>
                        {item.likes?.includes(state._id) ? (
                            <i className="material-icons" onClick={() => updatePost("/unlike", { postId: item._id })}>
                                thumb_down
                            </i>
                        ) : (
                            <i className="material-icons" onClick={() => updatePost("/like", { postId: item._id })}>
                                thumb_up
                            </i>
                        )}
                        <h6>{item.likes?.length || 0} likes</h6>
                        <h6>{item.title}</h6>
                        <p>{item.body}</p>
                        {item.comments?.map((record) => (
                            <h6 key={record._id}>
                                <span style={{ fontWeight: "500" }}>{record.postedBy?.name || "Anonymous"}</span> {record.text}
                            </h6>
                        ))}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                updatePost("/comment", { text: e.target[0].value, postId: item._id });
                            }}
                        >
                            <input type="text" placeholder="Add a comment" />
                        </form>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
