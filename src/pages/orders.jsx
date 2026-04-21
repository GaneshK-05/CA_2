import { useContext } from "react";
import { AppContext } from "../context/orderContext.jsx";
import { Link } from "react-router-dom";
import { isValidOrder } from "../utils/orderValidation";

const Orders = () => {
  const { state } = useContext(AppContext);
  const { orders, loading, error } = state;

  const validOrders = orders.filter(isValidOrder);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Unable to load orders: {error}</p>;

  return (
    <div>
      <h2>Orders</h2>
      <p>Valid Orders: {validOrders.length}</p>

      {validOrders.map(order => (
        <div key={order.orderID}>
          <p>Order ID: {order.orderID}</p>
          <p>{order.customerName}</p>
          <p>{order.restaurant}</p>
          <p>Status: {order.status}</p>

          <Link to={`/orders/${order.orderID}`}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Orders;