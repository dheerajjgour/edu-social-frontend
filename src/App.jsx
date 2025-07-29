import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Verify from "./pages/Verify";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import CollegeDashboard from "./components/CollegeDashboard";
import "./index.css";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/" element={<Home />} />
        <Route path="/studentDashboard" element={<StudentDashboard />} />
        <Route path="/teacherDashboard" element={<TeacherDashboard />} />
        <Route path="/collegeDashboard" element={<CollegeDashboard />} />
        <Route path="/verify/:userId" element={<Verify />} />
        <Route 
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
