import React, { useEffect, useState } from "react";
import axios from "axios";


const StudentDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [grades, setGrades] = useState([]);
  const [events, setEvents] = useState([]);
  const [homeworkText, setHomeworkText] = useState("");

  const API_BASE = "https://your-api-url.com/api";

  useEffect(() => {
    fetchAssignments();
    fetchGrades();
    fetchEvents();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get(`${API_BASE}/assignments`);
      setAssignments(res.data);
    } catch (err) {
      alert("Failed to load assignments");
    }
  };

  const fetchGrades = async () => {
    try {
      const res = await axios.get(`${API_BASE}/grades`);
      setGrades(res.data);
    } catch (err) {
      alert("Failed to load grades");
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_BASE}/events`);
      setEvents(res.data);
    } catch (err) {
      alert("Failed to load events");
    }
  };

  const handleHomeworkSubmit = async (e) => {
    e.preventDefault();
    if (!homeworkText) return alert("Homework can't be empty");
    try {
      await axios.post(`${API_BASE}/submit-homework`, { text: homeworkText });
      alert("Homework submitted");
      setHomeworkText("");
    } catch (err) {
      alert("Submission failed");
    }
  };

  return (
    <div className="dashboard-container">
  
      <div className="sidebar">
        <h2>Student Panel</h2>
        <ul>
          <li>Dashboard</li>
          <li>Assignments</li>
          <li>Submit Homework</li>
          <li>Events</li>
          <li>Grades</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <h1>Student Dashboard</h1>

        {/* Assignments */}
        <section>
          <h2>Assignments</h2>
          <div className="card-container">
            {assignments.map((item) => (
              <div key={item.id} className="card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p><b>Due:</b> {item.due_date}</p>
              </div>
            ))}
          </div>
        </section>

       
        <section>
          <h2>Submit Homework</h2>
          <form onSubmit={handleHomeworkSubmit}>
            <textarea
              rows="4"
              placeholder="Write your homework here..."
              value={homeworkText}
              onChange={(e) => setHomeworkText(e.target.value)}
              className="textarea"
            />
            <br />
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </section>

      
        <section>
          <h2>Events / Groups</h2>
          <ul className="event-list">
            {events.map((event) => (
              <li key={event.id}>
                <b>{event.name}</b> - {event.date}
              </li>
            ))}
          </ul>
        </section>

        {/* Grades */}
        <section>
          <h2>Grades</h2>
          <table className="grades-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Grade</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade) => (
                <tr key={grade.id}>
                  <td>{grade.subject}</td>
                  <td>{grade.grade}</td>
                  <td>{grade.feedback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;
