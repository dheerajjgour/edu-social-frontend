import React, { useEffect, useState } from "react";
import axios from "axios";

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("https://your-api.com/api/messages").then((res) => {
      setMessages(res.data);
    });
  }, []);

  return (
    <div>
      <h3>Messages</h3>
.
      {messages.map((msg, i) => (
        <div key={i} style={styles.msg}>
          <strong>{msg.sender}:</strong> {msg.text}
        </div>
      ))}
    </div>
  );
};

const styles = {
  msg: {
    padding: "10px",
    background: "#eee",
    marginBottom: "5px",
    borderRadius: "5px",
  },
};

export default MessageList;
