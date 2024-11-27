import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

function Cashier() {
  const [orderCode, setOrderCode] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [change, setChange] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { getOrder, completeOrder } = useCart();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setOrderCode(e.target.value);
  };

  const handleSearchOrder = async () => {
    console.log("Searching for order with code:", orderCode); // Mensaje de depuración
    const order = await getOrder(orderCode.toString()); // Asegúrate de que estás buscando por 'code' como cadena
    if (order) {
      setOrderDetails(order);
      console.log("Order details:", order); // Mensaje de depuración
    } else {
      alert("Código de orden no encontrado");
    }
  };

  const handlePaymentChange = (e) => {
    setPaymentAmount(e.target.value);
  };

  const handlePayment = async () => {
    const total = orderDetails.total;
    const payment = parseFloat(paymentAmount);
    if (payment >= total) {
      setChange(payment - total);
      setShowModal(true);
      await completeOrder({ ...orderDetails, paid: true });
      setTimeout(() => {
        setShowModal(false);
        navigate("/");
      }, 3000);
    } else {
      alert("El monto ingresado es insuficiente");
    }
  };

  return (
    <div className="cashier">
      <h2>Ingrese el código de la orden</h2>
      <input
        type="text"
        value={orderCode}
        onChange={handleInputChange}
        placeholder="Código de orden"
      />
      <button onClick={handleSearchOrder}>Buscar Orden</button>
      {orderDetails && (
        <div className="order-summary">
          <h3>Resumen de la Orden</h3>
          <ul>
            {orderDetails.items &&
              orderDetails.items.map((item, index) => (
                <li key={index}>
                  {item.name} - ${item.price}
                  {item.toppings && ` - Toppings: ${item.toppings.join(", ")}`}
                </li>
              ))}
          </ul>
          <h3>Total: ${orderDetails.total.toFixed(2)}</h3>
          <div>
            <input
              type="number"
              value={paymentAmount}
              onChange={handlePaymentChange}
              placeholder="Monto recibido"
            />
            <button onClick={handlePayment}>Pagar</button>
          </div>
        </div>
      )}
      {showModal && (
        <Modal>
          <h2>Orden {orderDetails.code} pagada</h2>
          <p>Cambio: ${change.toFixed(2)}</p>
          <button onClick={() => setShowModal(false)}>Cerrar</button>
        </Modal>
      )}
    </div>
  );
}

export default Cashier;
