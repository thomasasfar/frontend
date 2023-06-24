import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import "./App.css";
import FormAsign from "./components/FormAsign";
import Riwayat from "./components/Riwayat";
import Dash from "./components/Dash";
import Login from "./components/Login";

function App() {
  return (
    <div className="fontku warnabadan badan">
      <BrowserRouter>
        <Routes>
          <Route path="/login" exact element={<Login />}></Route>
        </Routes>
        
        
        <Routes>
          <Route path="/form" exact element={<> <Navigation /> <FormAsign /> </>} />
          <Route path="/riwayat" exact element={<> <Navigation /> <Riwayat /> </> }></Route>
          <Route path="/" exact element={<> <Navigation /> <Dash /> </>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
