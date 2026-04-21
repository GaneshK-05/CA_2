import { useParams } from "react-router-dom";
import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

const OrderDetails = () => {
  const { id } = useParams();
  const { state } = useContext(OrderContext);

  const order = state.orders.find(o => o.orderID === id);

  if (!order) return <p>Order not found</p>;

  return (
    <div>
      <h2>{order.customerName}</h2>
      <p>Restaurant: {order.restaurant}</p>

      <h3>Items:</h3>
      <ul>
        {order.items.map((item, index) => (
          <li key={index}>
            {item.name} - ₹{item.price} x {item.quantity}
          </li>
        ))}
      </ul>

      <p>Total: ₹{order.totalAmount}</p>
      <p>Status: {order.status}</p>
      <p>Rating: {order.rating}</p>
    </div>
  );
};

export default OrderDetails;