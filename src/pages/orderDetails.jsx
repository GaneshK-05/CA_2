import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/orderContext.jsx";

const OrderDetails = () => {
  const { id } = useParams();
  const { state } = useContext(AppContext);

  const order = state.orders.find(o => String(o.orderID) === String(id));

  if (!order) return <h3>Order not found</h3>;

  return (
    <div>
      <h2>Order Details</h2>

      <p>Customer: {order.customerName}</p>
      <p>Restaurant: {order.restaurant}</p>

      <h3>Items</h3>
      {(order.items || []).map((item, i) => (
        <div key={i}>
          {item.name} - {item.quantity} × {item.price}
        </div>
      ))}

      <p>Total: {order.totalAmount}</p>
      <p>Status: {order.status}</p>
      <p>Delivery Time: {order.deliveryTime || "N/A"}</p>
      <p>Rating: {order.rating}</p>
    </div>
  );
};

export default OrderDetails;