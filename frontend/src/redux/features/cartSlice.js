import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Get cart items from local storage, if there is already any iten in the cart then get it from local storage otherwise set it to empty array
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : [],
}

export const cartSlice = createSlice({
  initialState,
  name: "cartSlice",
  reducers: {
    setCartItem: (state, action) => {
      const item = action.payload;

      const isItemExist = state.cartItems.find( 
        //Product id is unique so we can use it to check if the item is already in the cart
        (i) => i.product === item.product
      );

      if(isItemExist){
        state.cartItems = state.cartItems.map(
          (i) => i.product === isItemExist.product ? item : i
        )
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Save cart items to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems?.filter(
        (i) => i.product !== action.payload
      );

      // Save cart items to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;

      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    }
  }
})

export default cartSlice.reducer;


export const { setCartItem, removeCartItem,saveShippingInfo } = cartSlice.actions;