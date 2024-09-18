//Holaaaaaaaaaaaa prueba(:
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import ToppingsModal from "./ToppingsModal";

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
  charola: [{ name: "Chocolate" }, { name: "Turín" }, { name: "Hersheys" }],
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
  const [showAcceptButton, setShowAcceptButton] = useState(false);

  const handleSelectProduct = (product) => {
    if (type === "charola") {
      if (selectedProducts.includes(product)) {
        setSelectedProducts((prev) => prev.filter((p) => p !== product));
      } else if (selectedProducts.length < 3) {
        setSelectedProducts((prev) => [...prev, product]);
        if (selectedProducts.length === 2) {
          setShowAcceptButton(true);
        }
      }
    } else {
      setSelectedProduct(product);
      setShowModal(true);
    }
  };

  const handleAcceptSelection = () => {
    setShowModal(true);
    setShowAcceptButton(false);
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

  return (
    <div className="product-selection">
      <h2>
        {type === "rebanada" && "Selecciona tu rebanadaaaa"}
        {type === "charola" && "Selecciona 3 de nuestros ricos postreeeees"}
        {type === "vaso" && "Escoge un vaso de tu postre favorieeeeto"}
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
              disabled={selectedProducts.includes(product)}
            >
              {product.name}
            </button>
          ))}
          {showAcceptButton && (
            <button onClick={handleAcceptSelection}>Aceptar</button>
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
