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
        dispatch({ type: "SET_ORDERS", payload: data });
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
