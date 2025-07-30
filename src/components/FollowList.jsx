// src/components/FollowList.jsx
import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";

const FollowList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/users"); // your backend endpoint
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleFollowToggle = async (userId) => {
    try {
      const updatedUsers = users.map((user) => {
        if (user.id === userId) {
          const newStatus = !user.isFollowing;

          // Make backend API call
          if (newStatus) {
            axios.post(`http://localhost:8000/api/follow/${userId}`);
          } else {
            axios.post(`http://localhost:8000/api/unfollow/${userId}`);
          }

          return { ...user, isFollowing: newStatus };
        }
        return user;
      });

      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error toggling follow", error);
    }
  };

  return (
    <div className="follow-list">
      <h2>Connect with Teachers & Colleges</h2>
      {users.map((user) => (
        <UserCard key={user.id} user={user} onFollowToggle={handleFollowToggle} />
      ))}
    </div>
  );
};

export default FollowList;
