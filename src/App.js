import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/pages/Home";
import AddMember from "./components/pages/AddMember";
import Process from "./components/pages/Process";
import PatientView from "./components/pages/PatientView";
import Login from "./components/pages/Login";
import Password from "./components/pages/Password";

const userControl = localStorage.getItem("user");

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={userControl ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/addmember"
          element={userControl ? <AddMember /> : <Navigate to="/" />}
        />
        <Route
          path="/process"
          element={userControl ? <Process /> : <Navigate to="/" />}
        />
        <Route
          path="/viewpatient"
          element={userControl ? <PatientView /> : <Navigate to="/" />}
        />
        <Route path="/rememberpw" element={<Password />} />
      </Routes>
    </div>
  );
}

export default App;
