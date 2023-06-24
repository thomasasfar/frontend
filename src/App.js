import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navigation from  "./components/Navigation"
import './App.css';
import FormAsign from "./components/FormAsign";
import Riwayat from "./components/Riwayat"
import Dash from "./components/Dash";

function App() {
  return (
    <div className="fontku warnabadan badan">
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/form" exact element={<FormAsign />} />
            <Route path="/riwayat" exact element={<Riwayat />}></Route>
            <Route path="/" exact element={<Dash />}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
