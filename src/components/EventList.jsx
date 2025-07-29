import React, { useEffect, useState } from "react";
import axios from "axios";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("https://your-api.com/api/events").then((res) => {
      setEvents(res.data);
    });
  }, []);

  const handleJoin = (eventId) => {
    axios.post(`https://your-api.com/api/events/join/${eventId}`).then(() => {
      alert("Joined event!");
    });
  };

  return (
    <div>
      <h3>Upcoming Events</h3>
      {events.map((e, i) => (
        <div key={i} style={styles.card}>
          <h4>{e.name}</h4>
          <p>{e.date}</p>
          <button onClick={() => handleJoin(e.id)}>Join</button>
        </div>
      ))}
    </div>
  );
};

const styles = {
  card: {
    padding: "10px",
    background: "#e0f7fa",
    marginBottom: "10px",
    borderRadius: "5px",
  },
};

export default EventList;
