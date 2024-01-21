import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Sidebar from "./components/sidebar/Sidebar";
import Login from "./pages/login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="block">
          <Sidebar />

          <div className="block__second">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<Product />} />
              <Route path="/newProduct" element={<NewProduct />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
