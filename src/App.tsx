import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

const HomePage = lazy( () => import("./pages/Home/Home"));
const LoginPage = lazy( () => import("./pages/auth/Auth"));
const SellPage = lazy( () => import("./pages/Sellnow/Sell"));
const SingleCategory = lazy( () => import("./pages/SingleCategory/SingleCategory"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/sell" element={<SellPage />}/>
      <Route path="/category/:category" element={<SingleCategory />} />
    </Routes>
  );
}

export default App;
