import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/auth/LoginPage";
import Sell from "./pages/Sellnow/Sell";
import SingleProduct from "./pages/SingleProductPage/SingleProduct";




function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/sell" element={<Sell/>}/>
      {/* <Route path="/category/:categoryName" element={<SingleProduct/>}/> */} //route by name 

      <Route path="/category/:categoryId" element={<SingleProduct />} />  //route by id 

      

      

    </Routes>
  );
}

export default App;