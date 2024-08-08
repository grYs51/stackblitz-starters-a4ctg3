import { createReducer, on } from "@ngrx/store";
import { addToCart, removeFromCart, clearCart, fetchCartItemsSuccess, decrementFromCart } from "./shopping-cart.actions";
import { Listing } from "../../../../shared/models/listing";

type products = Record<string, number>;

export interface ShoppingCartState {
  products: products;
  listings: Listing[];
  loading: boolean;
  error: unknown;
}

export const initialState: ShoppingCartState = {
  products: {},
  listings: [],
  loading: false,
  error: null,
};

export const shoppingCartReducer = createReducer(
  initialState,
  on(addToCart, (state, { id }) => ({
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

  on(clearCart, (state) => ({
    ...state,
    products: {},
  })),
  on(fetchCartItemsSuccess, (state, { listings }) => ({
    ...state,
    listings,
  })),
);
