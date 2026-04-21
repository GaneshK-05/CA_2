import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orders from "../pages/orders";
import OrderDetails from "../pages/orderDetails";
import Filter from "../pages/Filter";
import Stats from "../pages/Stats";
import { Link } from "react-router-dom";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: "12px", padding: "16px" }}>
        <Link to="/orders">Orders</Link>
        <Link to="/filter">Inconsistent Orders</Link>
        <Link to="/stats">Stats</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Orders />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;