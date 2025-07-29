import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);
 

  useEffect(() => {
    axios.get("https://your-api.com/api/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>News Feed</h2>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
