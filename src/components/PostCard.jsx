const PostCard = ({ post }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded mb-4">
      <div className="font-bold">{post.user}</div>
      <div className="text-sm text-gray-500 mb-2">{post.type.toUpperCase()}</div>
      <p className="mb-2">{post.content}</p>
      <div className="text-sm text-gray-600">
        ❤️ {post.likes} | 💬 {post.comments}
      </div>
    </div>
  );
};

export default PostCard;
