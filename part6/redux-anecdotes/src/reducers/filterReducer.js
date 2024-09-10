export const filter = (value) => {
  return {
    type: "FILTER",
    payload: value,
  };
};

const filterReducer = (state = "ALL", action) => {
  switch (action.type) {
    case "FILTER":
      return action.payload;
    case "ALL":
      return "ALL";
    default:
      return state;
  }
};

export default filterReducer;
