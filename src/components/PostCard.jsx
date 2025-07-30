import React from "react";

const PostCard = ({ post }) => (
  <div style={styles.card}>
    <h4>{post.author}</h4>
    <p>{post.content}</p>
    <small>{new Date(post.created_at).toLocaleString()}</small>
  </div>
);

const styles = {
  card: {
    background: "#d1bebeff",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "10px",
  },
};

export default PostCard;
