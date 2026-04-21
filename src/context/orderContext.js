import { createContext, useReducer, useEffect } from "react";
import { AppReducer } from "../reducer/AppReducer";
import { getToken, getOrders } from "../services/api";

export const AppContext = createContext();

const initialState = {
  orders: []
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const data = await getOrders(token);

      dispatch({ type: "SET_ORDERS", payload: data });
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ state }}>
      {children}
    </AppContext.Provider>
  );
};