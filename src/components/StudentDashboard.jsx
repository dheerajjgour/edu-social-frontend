import React, { useState, useEffect } from 'react';

const StudentDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  const handlePost = () => {
    const post = {
      id: Date.now(),
      content: newPost,
      author: 'You',
      likes: 0,
      comments: []
    };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  const handleLike = (postId) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleComment = (postId, comment) => {
    setPosts(posts.map(p =>
      p.id === postId ? { ...p, comments: [...p.comments, comment] } : p
    ));
  };

  return (
    <div style={styles.container}>
      <h2>Student Dashboard</h2>
      <textarea
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="Write a post..."
        style={styles.textarea}
      />
      <button onClick={handlePost}>Post</button>

      <div style={styles.feed}>
        {posts.map(post => (
          <div key={post.id} style={styles.post}>
            <p><strong>{post.author}</strong>: {post.content}</p>
            <button onClick={() => handleLike(post.id)}>Like ({post.likes})</button>
            <CommentSection postId={post.id} onComment={handleComment} comments={post.comments} />
          </div>
        ))}
      </div>
    </div>
  );
};

const CommentSection = ({ postId, onComment, comments }) => {
  const [comment, setComment] = useState('');
  const submitComment = () => {
    if (comment.trim()) {
      onComment(postId, comment);
      setComment('');
    }
  };

  return (
    <div>
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        style={{ width: '80%' }}
      />
      <button onClick={submitComment}>Add</button>
      <div>
        {comments.map((c, idx) => <p key={idx} style={{ marginLeft: 10 }}>💬 {c}</p>)}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: 600, margin: 'auto', padding: 20 },
  textarea: { width: '100%', height: 80 },
  feed: { marginTop: 20 },
  post: { border: '1px solid #ccc', padding: 10, marginBottom: 10, borderRadius: 5 }
};

export default StudentDashboard;
