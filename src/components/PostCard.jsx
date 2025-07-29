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
    background: "#f0f0f0",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "10px",
  },
};

export default PostCard;
