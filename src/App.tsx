import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/auth/LoginPage";
import Sell from "./pages/Sellnow/Sell";
import SingleCategory from "./pages/SingleCategory/SingleCategory";




function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/sell" element={<Sell/>}/>
      <Route path="/category/:categoryId" element={<SingleCategory />} />  //route by id 

      

      

    </Routes>
  );
}

export default App;
