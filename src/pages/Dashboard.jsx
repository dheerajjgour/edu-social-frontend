import React from "react";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed"; // Replace with route content

const Dashboard = () => (
  <div style={{ display: "flex" }}>
    <Sidebar />
    <div style={{ marginLeft: "220px", padding: "20px", width: "100%" }}>
      <Feed />
    </div>
  </div>
);

export default Dashboard;
