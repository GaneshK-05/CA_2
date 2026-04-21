import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import { Link } from "react-router-dom";

const Orders = () => {
  const { state } = useContext(OrderContext);

  const validOrders = state.orders.filter(order =>
    order.orderID &&
    order.customerName &&
    order.items &&
    order.totalAmount > 0
  );

  return (
    <div>
      <h2>Valid Orders</h2>
      {validOrders.map(order => (
        <div key={order.orderID}>
          <h3>{order.customerName}</h3>
          <p>Total: ₹{order.totalAmount}</p>
          <Link to={`/orders/${order.orderID}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default Orders;