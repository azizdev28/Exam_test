import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Sidebar from "./components/sidebar/Sidebar";
import Login from "./pages/login/Login";
import { useState } from "react";
import NotFound from "./components/NotFaund/NotFaund";

function App() {
  const [user, setUser] = useState("");

  const isUserLoggedIn = !!user;

  return (
    <>
      <BrowserRouter>
        <div className="Admin">
          <Sidebar />

          <div className="AdminPanel">
            <Header user={user} />

            <Routes>
              <Route
                path="/"
                element={
                  isUserLoggedIn ? (
                    <Home user={user} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/product" element={<Product user={user} />} />
              <Route path="/newProduct" element={<NewProduct user={user} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
