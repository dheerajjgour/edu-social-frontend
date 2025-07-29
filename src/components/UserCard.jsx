// src/components/UserCard.jsx
import React from "react";

const UserCard = ({ user, onFollowToggle }) => {
  return (
    <div className="user-card">
      <div>
        <h3>{user.name}</h3>
        <p>{user.role}</p>
      </div>
      <button onClick={() => onFollowToggle(user.id)}>
        {user.isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default UserCard;
