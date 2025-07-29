import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => (
  <div style={styles.sidebar}>
    <h3>EduSocial</h3>
    <ul style={styles.ul}>
      <li><Link to="/">Feed</Link></li>
      <li><Link to="/follow">Follow</Link></li>
      <li><Link to="/messages">Messages</Link></li>
      <li><Link to="/assignments">Assignments</Link></li>
      <li><Link to="/events">Events</Link></li>
    </ul>
  </div>
);

const styles = {
  sidebar: {
    width: "300px",
    padding: "15px",
    background: "rgb(58 68 141)",
    height: "100vh",
    position: "fixed",
    color:"#fff"
  },
  ul: {
    listStyle: "none",
    padding: 0,
  },
};

export default Sidebar;

