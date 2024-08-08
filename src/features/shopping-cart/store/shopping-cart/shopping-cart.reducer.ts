import { createReducer, on } from "@ngrx/store";
import {
  removeFromCart,
  clearCart,
  fetchCartItemsSuccess,
  decrementFromCart,
  incrementFromCart,
  addToCartSuccess,
  updateCart,
} from "./shopping-cart.actions";

export type Products = Record<string, number>;

export interface ShoppingCartState {
  products: Products;
  loading: boolean;
  error: unknown;
}

export const initialState: ShoppingCartState = {
  products: {},
  loading: false,
  error: null,
};

export const shoppingCartReducer = createReducer(
  initialState,
  on(addToCartSuccess, incrementFromCart, (state, { id }) => ({
    ...state,
    products: {
      ...state.products,
      [id]: (state.products[id] || 0) + 1,
    },
  })),
  on(decrementFromCart, (state, { id }) => {
    const newQuantity = (state.products[id] || 0) - 1;
    const newProducts = { ...state.products };
    if (newQuantity > 0) {
      newProducts[id] = newQuantity;
    } else {
      delete newProducts[id];
    }
    return {
      ...state,
      products: newProducts,
    };
  }),
  on(removeFromCart, (state, { id }) => {
    const newProducts = { ...state.products };
    delete newProducts[id];
    return {
      ...state,
      products: newProducts,
    };
  }),
  on(updateCart, (state, { products }) => ({
    ...state,
    products,
  })),
  on(clearCart, (state) => ({
    ...state,
    products: {},
  })),
  on(fetchCartItemsSuccess, (state, { listings }) => ({
    ...state,
    listings,
  }))
);
