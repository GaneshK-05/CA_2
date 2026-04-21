export const orderReducer = (state, action) => {
  switch (action.type) {
    case "SET_ORDERS":
      return {
        ...state,
        orders: action.payload
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