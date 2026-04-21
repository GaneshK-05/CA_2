export const orderReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload
      };

    case "SET_ORDERS":
      return {
        ...state,
        orders: action.payload,
        loading: false,
        error: null
      };

    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case "FILTER_BY_STATUS":
      return {
        ...state,
        filtered: state.orders.filter(
          order => order.status === action.payload
        )
      };

    default:
      return state;
  }
};