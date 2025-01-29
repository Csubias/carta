import { db } from './firebaseConfig';
import { collection, addDoc, getDocs } from "firebase/firestore";

// Referencia a la colección "orders"
const ordersCollection = collection(db, 'orders');

// 📝 Función para guardar un pedido en Firestore
export const saveOrder = async (order) => {
  try {
    const docRef = await addDoc(ordersCollection, order);
    console.log("✅ Pedido guardado con ID:", docRef.id);
    return docRef.id; // Retornar ID por si es necesario
  } catch (error) {
    console.error("❌ Error al guardar el pedido:", error);
    throw new Error("No se pudo guardar el pedido");
  }
};

// 📝 Función para obtener todos los pedidos de Firestore
export const getOrders = async () => {
  try {
    const querySnapshot = await getDocs(ordersCollection);
    const orders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return orders;
  } catch (error) {
    console.error("❌ Error al obtener los pedidos:", error);
    return []; // Devolver un array vacío en caso de error
  }
};
