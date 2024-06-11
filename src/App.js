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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addmember" element={<AddMember />} />
        <Route path="/process" element={<Process />} />
        <Route path="/viewpatient" element={<PatientView />} />
        <Route path="/rememberpw" element={<Password />} />
      </Routes>
    </div>
  );
}

export default App;
