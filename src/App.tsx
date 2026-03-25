import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

/** Layout */
import MainLayout from "./layouts/Main/mainLayout";

/** Note: Route Protecter */
import ProtectRoute from "./utils/ProtectRoute";
import Loader from "./components/UI/Loader/Loader";

const Catalog = lazy(() => import("./pages/SingleCategory/SingleCategory"));
const Home = lazy(() => import("./pages/Home/Home"));
const LoginPage = lazy(() => import("./pages/auth/Auth"));
const Sell = lazy(() => import("./pages/Sellnow/Sell"));
const SingleCategory = lazy(() => import("./pages/SingleCategory/SingleCategory"));
const Chat = lazy(() => import("./pages/chat/Chat"));
const ProductPage = lazy(() => import("./pages/SingleProduct/SingleProduct"));
const ProfilePage = lazy(() => import("./pages/Profile/ProfilePage"));
const FavouritePage = lazy( () => import("./pages/favourite/favourite"));
const NotificationPage = lazy(() => import("./pages/Notification/Notification"));

function App() {
  return (
    <Suspense fallback={<Loader />}>

      <Routes>

        {/* Main Layout */}
        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/category/:categoryId" element={<SingleCategory />} />

          <Route path="catalog" element={<Catalog />} />

          <Route  path="/product/:productId"  element={<ProductPage />} />

          <Route path="/profile/:userId" element={<ProfilePage />}/>
          
          <Route path="/notifications" element={<NotificationPage />}/>

          <Route path="*" element={<h1>Not Found</h1>} />

          {/* Secure Routes */}
          <Route 
            path="/sell" 
              element={
                <ProtectRoute>
                  <Sell />
                </ProtectRoute>
              }
           />

          <Route 
            path="/favourites" 
              element={
                <ProtectRoute>
                  <FavouritePage />
                </ProtectRoute>
              } 
          />

          <Route 
            path="/inbox" 
              element={
                <ProtectRoute>
                  <Chat />
                </ProtectRoute>
              } 
          />

          <Route 
            path="/inbox/:chatId"
              element={
                <ProtectRoute>
                  <Chat />
                </ProtectRoute>
              }
          />

        </Route>

      </Routes>

    </Suspense>
  );
}

export default App;