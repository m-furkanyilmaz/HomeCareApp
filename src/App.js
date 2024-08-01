import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import AddMember from "./components/pages/AddMember";
import Process from "./components/pages/Process";
import PatientView from "./components/pages/PatientView";
import Login from "./components/pages/Login";
import Password from "./components/pages/Password";
import { useEffect } from "react";
// import LoginNavigater from "./components/LoginNavigater";

const userControl = sessionStorage.getItem("user");

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path={sessionStorage ? "/home" : "/"}
          element={userControl ? <Home /> : <Login />}
        />
        <Route
          path={sessionStorage ? "/addmember" : "/"}
          element={userControl ? <AddMember /> : <Login />}
        />
        <Route
          path={sessionStorage ? "/process" : "/"}
          element={userControl ? <Process /> : <Login />}
        />
        <Route
          path={sessionStorage ? "/viewpatient" : "/"}
          element={userControl ? <PatientView /> : <Login />}
        />
        <Route
          path={sessionStorage ? "/rememberpw" : "/"}
          element={userControl ? <Password /> : <Login />}
        />
      </Routes>
    </div>
  );
}

export default App;
