import { createSlice } from "@reduxjs/toolkit";
import { products } from "../../data/productsData";

const initialState = {
  products: products,
  cart: [],
  netTotal: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let product = { ...action.payload, quantity: 1 };
      state.cart.push(product);
    },
    removeCart: (state, action) => {
      state.cart = state.cart.filter(
        (_, index) => index !== action.payload
      );
    },
    incrementProduct: (state, action) => {
      state.cart[action.payload].quantity += 1;
    },
    decrementProduct: (state, action) => {
      if (state.cart[action.payload].quantity > 1) {
        state.cart[action.payload].quantity -= 1;
      } else {
        state.cart.splice(action.payload, 1);
      }
    },
    setNetTotal: (state, action) => {
      state.netTotal = action.payload;
    },
  },
});

export const { addToCart, removeCart, incrementProduct, decrementProduct, setNetTotal } = productSlice.actions;

export const getTotal = () => (dispatch, getState) => {
  const { cart } = getState().product;
  const netTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  dispatch(setNetTotal(netTotal));
};

export default productSlice.reducer;
