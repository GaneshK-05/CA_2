import { createContext, useReducer, useEffect } from "react";
import { orderReducer } from "../reducer/orderReducer";
import { getOrders } from "../services/api";

export const AppContext = createContext();

const initialState = {
  orders: [],
  loading: true,
  error: null
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const data = await getOrders();
        const rawOrders = Array.isArray(data) ? data : data?.orders;

        const normalizedOrders = Array.isArray(rawOrders)
          ? rawOrders.map(order => ({
              ...order,
              orderID: order?.orderID ?? order?.orderId,
              status:
                typeof order?.status === "string"
                  ? order.status.toLowerCase()
                  : order?.status
            }))
          : [];

        dispatch({ type: "SET_ORDERS", payload: normalizedOrders });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: error?.message || "Failed to fetch orders"
        });
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ state }}>
      {children}
    </AppContext.Provider>
  );
};
