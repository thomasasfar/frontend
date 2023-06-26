import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import "./App.css";
import FormAssign from "./components/FormAssign";
import Riwayat from "./components/Riwayat";
import Dash from "./components/Dash";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Redirect from "./components/Redirect";
import Attendancece from "./components/Attendance";

function App() {
  return (
    <div className="fontku warnabadan">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Redirect />}></Route>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/register" exact element={<Register />}></Route>
        </Routes>

        <Routes>
          <Route
            path="/form"
            exact
            element={
              <>
                <Navigation /> <FormAssign />
              </>
            }
          />
          <Route
            path="/attd"
            exact
            element={
              <>
                <Navigation /> <Attendancece />
              </>
            }
          />
          <Route
            path="/riwayat"
            exact
            element={
              <>
                <Navigation /> <Riwayat />
              </>
            }
          ></Route>
          <Route
            path="/"
            exact
            element={
              <>
                <Navigation /> <Dash />
              </>
            }
          ></Route>
          <Route
            path="/profile"
            exact
            element={
              <>
                {" "}
                <Navigation /> <Profile />{" "}
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
