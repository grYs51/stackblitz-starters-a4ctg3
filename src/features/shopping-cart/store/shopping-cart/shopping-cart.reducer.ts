import { createReducer, on } from "@ngrx/store";
import { addToCart, removeFromCart, clearCart } from "./shopping-cart.actions";

type products = Record<string, number>;

export interface ShoppingCartState {
  products: products;
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
  on(addToCart, (state, { id }) => ({
    ...state,
    products: {
      ...state.products,
      [id]: (state.products[id] || 0) + 1,
    },
  })),
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
  }))
);
