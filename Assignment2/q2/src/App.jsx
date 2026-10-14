
import { useState } from "react";
import "./App.css";

function Dashboard({ isLoggedIn, userName, role, onLogout }) {
  const [selectedAction, setSelectedAction] = useState("");

  const adminReports = ["Monthly Summary", "Attendance Report", "User Activity"];
  const studentReports = ["Course Progress", "Exam Results", "Fee Status"];

  const adminActions = {
    "Manage Users": "Add, edit, and remove users from the system.",
    "View Reports": "Review all school performance and attendance reports.",
    "Generate Report": "Create a custom activity and summary report for the class.",
  };

  const studentActions = {
    "View Courses": "See your enrolled subjects and upcoming lectures.",
    "Check Results": "Open and review your latest exam scores.",
    Attendance: "Track your class attendance and absences.",
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {isLoggedIn ? (
        <>
          <h2>Welcome, {userName}!</h2>
          <p>
            You are logged in as <strong>{role}</strong>.
          </p>

          {role === "admin" && (
            <div className="options">
              <button onClick={() => setSelectedAction("Manage Users")}>Manage Users</button>
              <button onClick={() => setSelectedAction("View Reports")}>View Reports</button>
              <button onClick={() => setSelectedAction("Generate Report")}>Generate Report</button>
            </div>
          )}

          {role === "student" && (
            <div className="options">
              <button onClick={() => setSelectedAction("View Courses")}>View Courses</button>
              <button onClick={() => setSelectedAction("Check Results")}>Check Results</button>
              <button onClick={() => setSelectedAction("Attendance")}>Attendance</button>
            </div>
          )}

          {selectedAction && (
            <div className="detail-panel">
              <h3>{selectedAction}</h3>
              <p>
                {role === "admin"
                  ? adminActions[selectedAction]
                  : studentActions[selectedAction]}
              </p>
            </div>
          )}

          {role === "admin" && (
            <div className="report-box">
              <h3>Admin Reports</h3>
              <ul>
                {adminReports.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {role === "student" && (
            <div className="report-box">
              <h3>Student Reports</h3>
              <ul>
                {studentReports.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {role !== "admin" && role !== "student" && (
            <p className="warning">Role not recognized.</p>
          )}

          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </>
      ) : (
        <div className="login-box">
          <p>Please login to access your dashboard.</p>
          <button className="login-btn">Login</button>
        </div>
      )}
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Rishika");
  const [role, setRole] = useState("admin");

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <div className="app-wrapper">
      {!isLoggedIn ? (
        <div className="login-card">
          <h2>Login</h2>
          <label>
            Name
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value || "User")}
            />
          </label>

          <label>
            Role
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="student">Student</option>
            </select>
          </label>

          <button className="login-btn" onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <Dashboard
          isLoggedIn={isLoggedIn}
          userName={userName}
          role={role}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;

