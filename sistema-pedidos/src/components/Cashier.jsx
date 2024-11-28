import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import Modal from "./Modal";

function Cashier() {
  const [orderCode, setOrderCode] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [change, setChange] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { getOrder } = useCart();

  const handleSearchOrder = () => {
    const order = getOrder(orderCode);
    if (order) {
      setOrderDetails(order);
    } else {
      alert("Código de orden no encontrado.");
    }
  };

  const handlePayment = () => {
    if (orderDetails && paymentAmount >= orderDetails.total) {
      setChange(paymentAmount - orderDetails.total);
      setShowModal(true);
    } else {
      alert("El monto recibido no es suficiente.");
    }
  };

  return (
    <div className="cashier">
      <h2>Ingrese el código de la orden</h2>
      <input
        type="text"
        value={orderCode}
        onChange={(e) => setOrderCode(e.target.value)}
        placeholder="Código de orden"
      />
      <button onClick={handleSearchOrder}>Buscar Orden</button>
      {orderDetails && (
        <div>
          <h3>Resumen de la Orden</h3>
          {orderDetails.items.map((item, index) => (
            <div key={index}>
              {item.name} - ${item.price}
              {item.category && ` (${item.category})`}
              {item.toppings && ` - Toppings: (${item.toppings.join(", ")})`}
              {item.type === "charola" && (
                <ul>
                  {item.products.map((p, i) => (
                    <li key={i}>
                      {p.name}
                      {p.category && ` (${p.category})`}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <h3>Total: ${orderDetails.total.toFixed(2)}</h3>
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            placeholder="Monto recibido"
          />
          <button onClick={handlePayment}>Pagar</button>
        </div>
      )}
      {showModal && (
        <Modal>
          <h2>Cambio: ${change.toFixed(2)}</h2>
          <button onClick={() => setShowModal(false)}>Cerrar</button>
        </Modal>
      )}
    </div>
  );
}

export default Cashier;
