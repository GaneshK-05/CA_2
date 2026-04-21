import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { isValidOrder } from "../utils/validation";
import { Link } from "react-router-dom";

const Orders = () => {
  const { state } = useContext(AppContext);

  const validOrders = state.orders.filter(isValidOrder);

  return (
    <div>
      <h2>Orders</h2>

      {validOrders.map(order => (
        <div key={order.orderID}>
          <p>{order.customerName}</p>
          <p>{order.restaurant}</p>

          <Link to={`/orders/${order.orderID}`}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Orders;