import React from "react";

const Profile = () => {
    return (
        <div style={{
            maxWidth: "850px", 
            margin: "0 auto",
            padding: "20px", 
        }}>
            {/* Profile Header */}
            <div style={{
                display: "flex",
                flexWrap: "wrap", 
                justifyContent: "space-around",
                alignItems: "center", 
                margin: "20px 0px",
                borderBottom: "1px solid grey",
                paddingBottom: "20px", 
            }}>
                {/* Profile Image */}
                <div style={{
                    marginBottom: "20px",
                    flexBasis: "150px", 
                    textAlign: "center",
                }}>
                    <img
                        style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "75px", 
                        }}
                        src="https://img.freepik.com/free-photo/pretty-zo-qn-zith-photo-frq-e-close-up_1187-5658.jpg?uid=R147514784&ga=GA1.1.1158692380.1730345942&semt=ais_hybrid"
                        alt="Profile"
                    />
                </div>
                {/* Profile Details */}
                <div style={{
                    flex: 1, 
                    minWidth: "250px",
                    textAlign: "center",
                }}>
                    <h4 style={{
                        margin: "0px",
                        marginBottom: "10px",
                        fontSize: "1.5rem", 
                    }}>hinata hyuga</h4>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        maxWidth: "300px",
                        margin: "0 auto", 
                    }}>
                        <h6>40 posts</h6>
                        <h6>40 followers</h6>
                        <h6>40 following</h6>
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            <div
                className="gallery"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
                    gap: "15px",
                    marginTop: "20px",
                }}
            >
                <img
                    className="item"
                    src="https://img.freepik.com/free-photo/pretty-girl-showing-gesture-like-frame_1187-5744.jpg?uid=R147514784&ga=GA1.1.1158692380.1730345942&semt=ais_hybrid"
                    alt="Gallery"
                    style={{
                        width: "100%",
                        borderRadius: "10px",
                    }}
                />
                <img
                    className="item"
                    src="https://img.freepik.com/free-photo/pretty-girl-showing-gesture-like-frame_1187-5744.jpg?uid=R147514784&ga=GA1.1.1158692380.1730345942&semt=ais_hybrid"
                    alt="Gallery"
                    style={{
                        width: "100%",
                        borderRadius: "10px",
                    }}
                />
                <img
                    className="item"
                    src="https://img.freepik.com/free-photo/pretty-girl-showing-gesture-like-frame_1187-5744.jpg?uid=R147514784&ga=GA1.1.1158692380.1730345942&semt=ais_hybrid"
                    alt="Gallery"
                    style={{
                        width: "100%",
                        borderRadius: "10px",
                    }}
                />
                <img
                    className="item"
                    src="https://img.freepik.com/free-photo/pretty-girl-showing-gesture-like-frame_1187-5744.jpg?uid=R147514784&ga=GA1.1.1158692380.1730345942&semt=ais_hybrid"
                    alt="Gallery"
                    style={{
                        width: "100%",
                        borderRadius: "10px",
                    }}
                />
                <img
                    className="item"
                    src="https://img.freepik.com/free-photo/pretty-girl-showing-gesture-like-frame_1187-5744.jpg?uid=R147514784&ga=GA1.1.1158692380.1730345942&semt=ais_hybrid"
                    alt="Gallery"
                    style={{
                        width: "100%",
                        borderRadius: "10px",
                    }}
                />
                <img
                    className="item"
                    src="https://img.freepik.com/free-photo/pretty-girl-showing-gesture-like-frame_1187-5744.jpg?uid=R147514784&ga=GA1.1.1158692380.1730345942&semt=ais_hybrid"
                    alt="Gallery"
                    style={{
                        width: "100%",
                        borderRadius: "10px",
                    }}
                />
            </div>
        </div>
    );
};

export default Profile;
