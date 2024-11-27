import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal"; // Importa el componente Modal

function Checkout() {
  const { cart, getTotal, clearCart, setOrderCode, completeOrder } = useCart(); // Importa completeOrder
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [orderCode, setOrderCodeState] = useState(null);

  const handleCompleteOrder = async () => {
    const code = Math.floor(1000 + Math.random() * 9000);
    setOrderCodeState(code);
    setOrderCode(code); // Set order code in global state
    await completeOrder({ code, items: cart, total: getTotal() }); // Guarda el pedido en localStorage
    setShowModal(true);
  };

  const handleCloseModal = () => {
    clearCart();
    setShowModal(false);
    navigate("/"); // Redirige a la página de inicio
  };

  const handleEditOrder = () => {
    navigate("/cart");
  };

  const handleBackToMenu = () => {
    navigate("/"); // Redirige a la página del menú
  };

  const renderProductDetails = (item) => {
    if (item.type === "charola") {
      return (
        <div>
          <strong>Charola:</strong>
          <ul>
            {item.products.map((product, index) => (
              <li key={index}>
                {product.name}
                {product.category && ` (${product.category})`}
              </li>
            ))}
          </ul>
          {item.toppings && <div>Toppings: {item.toppings.join(", ")}</div>}
        </div>
      );
    }

    return (
      <div>
        <strong>{item.name}</strong>
        {item.category && ` (${item.category})`}
        {item.toppings && <div>Toppings: {item.toppings.join(", ")}</div>}
      </div>
    );
  };

  return (
    <div className="checkout">
      <h2>Resumen de Pedido</h2>
      {cart.length === 0 ? (
        <p>No hay productos en tu carrito.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="checkout-item">
              {renderProductDetails(item)}
              <div>Precio: ${item.price || 45.0}</div>
            </div>
          ))}
          <h3>Total: ${getTotal().toFixed(2)}</h3>
          <div className="checkout-buttons">
            <button onClick={handleEditOrder}>Editar Pedido</button>
            <button onClick={handleCompleteOrder}>Completar Pedido</button>
          </div>
          <button onClick={handleBackToMenu}>Volver al Menú</button>
        </div>
      )}
      {showModal && (
        <Modal>
          <h2>Este es tu número de orden: {orderCode}</h2>
          <p>Tómale foto a tu número de orden o memorizala.</p>
          <p>¡Gracias por tu pedido! ^^</p>
          <button onClick={handleCloseModal}>¡Listo!</button>
        </Modal>
      )}
    </div>
  );
}

export default Checkout;
