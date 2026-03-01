import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/auth/LoginPage";
import SellItem from "./components/SellNow/SellItem";




function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/sell" element={<SellItem/>}/>
    </Routes>
  );
}

export default App;
