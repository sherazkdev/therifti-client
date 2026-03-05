import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

/** Note: Layouts */
import MainLayout from "./layouts/Main/mainLayout";

const Home = lazy(() => import("./pages/Home/Home"));
const LoginPage = lazy(() => import("./pages/auth/Auth"));
const Sell = lazy(() => import("./pages/Sellnow/Sell"));
const SingleCategory = lazy(() => import("./pages/SingleCategory/SingleCategory"));
const ProductPage = lazy(() => import("./pages/SingleProduct/ProductPage"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>

      <Routes>
        
        {/* Main Layout */}
        <Route element={<MainLayout />}>  
      
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/category/:categoryId" element={<SingleCategory />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="*" element={<h1> Not Found </h1>} />
        </Route>
      
      </Routes>

    </Suspense>
  );
}

export default App;