import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const StudentDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handlePost = () => {
    if (!newPost.trim() && !imagePreview) {
      toast.error("Post can't be empty!");
      return;
    }

    const post = {
      id: Date.now(),
      content: newPost,
      author: "👨‍🎓 Student",
      image: imagePreview,
      likes: 0,
      comments: [],
    };

    setPosts([post, ...posts]);
    setNewPost("");
    setNewImage(null);
    setImagePreview(null);
    toast.success("Post created!");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    setNewImage(file);
  };

  const handleLike = (id) => {
    setPosts(
      posts.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleComment = (id, comment) => {
    if (!comment.trim()) {
      toast.error("Comment can't be empty!");
      return;
    }

    setPosts(
      posts.map((p) =>
        p.id === id ? { ...p, comments: [...p.comments, comment] } : p
      )
    );
    toast.success("Comment added!");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-100 to-white">
      <Toaster position="top-right" />
      {/* Sidebar */}
      <aside className="w-64 bg-purple-700 text-white py-6 px-4 flex-shrink-0 rounded-tr-3xl rounded-br-3xl shadow-lg">
        <div className="text-2xl font-bold mb-10 flex items-center gap-2">
          🎓 <span>EduPortal</span>
        </div>
        <nav className="flex flex-col gap-4 text-sm font-medium">
          <a href="#" className="hover:bg-purple-600 p-3 rounded-lg">🏠 Dashboard</a>
          <a href="#" className="hover:bg-purple-600 p-3 rounded-lg">💳 Payment Info</a>
          <a href="#" className="hover:bg-purple-600 p-3 rounded-lg">📝 Registration</a>
          <a href="#" className="hover:bg-purple-600 p-3 rounded-lg">📚 Courses</a>
          <a href="#" className="hover:bg-purple-600 p-3 rounded-lg">📤 Drop Semester</a>
          <a href="#" className="hover:bg-purple-600 p-3 rounded-lg">📈 Result</a>
          <a href="#" className="hover:bg-purple-600 p-3 rounded-lg">📢 Notice</a>
          <a href="#" className="hover:bg-purple-600 p-3 rounded-lg">🗓 Schedule</a>
          <a href="#" className="hover:bg-red-500 p-3 rounded-lg mt-auto">🚪 Logout</a>
        </nav>
      </aside>

     
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-purple-700">Welcome back, John!</h2>
            <p className="text-sm text-gray-500">Always stay updated in your student portal</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <h3 className="text-sm font-semibold">John Doe</h3>
              <p className="text-xs text-gray-500">3rd year</p>
            </div>
            <img src="https://i.pravatar.cc/40" alt="profile" className="rounded-full w-10 h-10" />
          </div>
        </div>

      
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <p className="text-sm text-gray-500">Total Payable</p>
            <h2 className="text-2xl font-bold text-purple-700 mt-2">$10,000</h2>
          </div>
          <div className="bg-purple-100 border-2 border-purple-600 p-6 rounded-2xl shadow text-center">
            <p className="text-sm text-gray-600">Total Paid</p>
            <h2 className="text-2xl font-bold text-purple-800 mt-2">$5,000</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <p className="text-sm text-gray-500">Others</p>
            <h2 className="text-2xl font-bold text-purple-700 mt-2">$300</h2>
          </div>
        </div>

        
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Enrolled Courses</h3>
            <button className="text-sm text-purple-600 hover:underline">See all</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-50 p-4 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="text-md font-bold text-purple-800 mb-1">Object Oriented Programming</h4>
              <button className="text-xs text-white bg-purple-600 px-4 py-1 rounded mt-2 hover:bg-purple-700">View</button>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="text-md font-bold text-purple-800 mb-1">Database Systems</h4>
              <button className="text-xs text-white bg-purple-600 px-4 py-1 rounded mt-2 hover:bg-purple-700">View</button>
            </div>
          </div>
        </div>

        {/* Post Box */}
        <div className="bg-white p-6 rounded-2xl shadow-xl mb-8">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none mb-4"
            rows="4"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mb-4 rounded-lg max-h-64 object-contain w-full"
            />
          )}
          <button
            onClick={handlePost}
            className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
          >
            Post
          </button>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-lg text-purple-800">{post.author}</p>
                <button
                  onClick={() => handleLike(post.id)}
                  className="text-sm text-purple-600 hover:underline"
                >
                  👍 Like ({post.likes})
                </button>
              </div>
              <p className="text-gray-700 mb-2">{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="rounded-md mb-4 max-h-80 w-full object-cover"
                />
              )}
              <CommentSection
                postId={post.id}
                comments={post.comments}
                onComment={handleComment}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

const CommentSection = ({ postId, comments, onComment }) => {
  const [comment, setComment] = useState("");

  const submitComment = () => {
    onComment(postId, comment);
    setComment("");
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={submitComment}
          disabled={!comment.trim()}
          className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 transition"
        >
          Add
        </button>
      </div>
      {comments.length > 0 && (
        <div className="ml-1 space-y-1 text-sm text-gray-600">
          {comments.map((c, i) => (
            <p key={i} className="pl-2 border-l-4 border-purple-400">
              💬 {c}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
