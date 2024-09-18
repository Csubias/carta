// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import MenuSelection from "./components/MenuSelection";
import ProductSelection from "./components/ProductSelection";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Home from "./components/Home"; // Importa el componente Home

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Ruta para Home */}
          <Route path="/menu" element={<MenuSelection />} />{" "}
          {/* Ruta para MenuSelection */}
          <Route path="/products/:type" element={<ProductSelection />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
