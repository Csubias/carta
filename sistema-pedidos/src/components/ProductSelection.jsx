import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import ToppingsModal from "./ToppingsModal";
5;
const products = {
  rebanada: [
    { name: "Gansito", price: 30, category: "gelatina" },
    { name: "Galleta Oreo", price: 30, category: "gelatina" },
    { name: "Chocolate Abuelita", price: 30, category: "gelatina" },
    { name: "Chocolate", price: 40, category: "pastel" },
    { name: "Turín", price: 40, category: "pastel" },
    { name: "Hersheys", price: 40, category: "pastel" },
    { name: "Chocolate", price: 35, category: "pay" },
    { name: "Limón", price: 35, category: "pay" },
    { name: "Vainilla", price: 25, category: "flan" },
    { name: "Napolitano Sencillo", price: 25, category: "flan" },
    { name: "Napolitano Philadelphia", price: 25, category: "flan" },
    { name: "Elote", price: 25, category: "flan" },
  ],
  charola: [
    { name: "Chocolate", price: 40 },
    { name: "Turín", price: 40 },
    { name: "Hersheys", price: 40 },
  ],
  vaso: [
    { name: "Vaso de Gelatina", price: 60 },
    { name: "Vaso de Pay", price: 70 },
  ],
};

function ProductSelection() {
  const { type } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSelectProduct = (product) => {
    if (type === "charola") {
      const isSelected = selectedProducts.includes(product);
      if (isSelected) {
        // Deseleccionar el producto
        setSelectedProducts((prev) => prev.filter((p) => p !== product));
      } else if (selectedProducts.length < 3) {
        // Seleccionar el producto
        setSelectedProducts((prev) => [...prev, product]);
      }
    } else {
      setSelectedProduct(product);
      setShowModal(true);
    }
  };

  const handleAddToCart = (toppings) => {
    const productWithToppings = {
      ...selectedProduct,
      toppings,
      category: selectedProduct.category,
    };
    addToCart(productWithToppings);
    setSelectedProduct(null);
    setShowModal(false);
    navigate("/cart");
  };

  const handleAddCharolaToCart = (toppings) => {
    addToCart({ type: "charola", products: selectedProducts, toppings });
    setSelectedProducts([]);
    setShowModal(false);
    navigate("/cart");
  };

  const handleAcceptCharola = () => {
    setShowModal(true);
  };

  return (
    <div className="product-selection">
      <h2>
        {type === "rebanada" && "Selecciona tu rebanada"}
        {type === "charola" && "Selecciona 3 de nuestros ricos postres"}
        {type === "vaso" && "Escoge un vaso de tu postre favorito"}
      </h2>

      {/* Para rebanada, muestra las categorías y productos como tarjetas */}
      {type === "rebanada" && (
        <div>
          {["gelatina", "pastel", "pay", "flan"].map((category) => (
            <div key={category}>
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
              <div className="product-grid">
                {products.rebanada
                  .filter((product) => product.category === category)
                  .map((product) => (
                    <button
                      key={product.name}
                      onClick={() => handleSelectProduct(product)}
                    >
                      {product.name} - ${product.price}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Selección de charola, selecciona 3 productos */}
      {type === "charola" && (
        <div>
          {products[type]?.map((product) => (
            <button
              key={product.name}
              onClick={() => handleSelectProduct(product)}
              style={{
                opacity: selectedProducts.includes(product) ? 0.5 : 1,
              }}
            >
              {product.name}
            </button>
          ))}
          {selectedProducts.length === 3 && (
            <button onClick={handleAcceptCharola}>Aceptar</button>
          )}
        </div>
      )}

      {/* Modal de toppings */}
      {showModal && type === "charola" && (
        <ToppingsModal
          product={{ name: "Charola", price: 45 }}
          onClose={() => setShowModal(false)}
          onAddToCart={(toppings) => handleAddCharolaToCart(toppings)}
        />
      )}

      {type === "vaso" && (
        <div>
          {products[type]?.map((product) => (
            <button
              key={product.name}
              onClick={() => handleSelectProduct(product)}
            >
              {product.name} - ${product.price}
            </button>
          ))}
        </div>
      )}

      {showModal && type !== "charola" && (
        <ToppingsModal
          product={selectedProduct}
          onClose={() => setShowModal(false)}
          onAddToCart={(toppings) => handleAddToCart(toppings)}
        />
      )}
    </div>
  );
}

export default ProductSelection;
