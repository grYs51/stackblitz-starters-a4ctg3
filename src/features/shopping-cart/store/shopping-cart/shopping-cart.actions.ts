import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Listing } from "../../../../shared/models/listing";
import { Products } from "./shopping-cart.reducer";
const shoppingCartActionGroup = createActionGroup({
  source: "Shopping Cart",
  events: {
    fetchCartItems: emptyProps(),
    fetchCartItemsFailure: props<{ error: unknown }>(),
    addToCart: props<{ id: string }>(),
    addToCartSuccess: props<{ id: string, quantity: number, listing: Listing }>(),
    addToCartFailure: props<{ error: unknown }>(),
    incrementFromCart: props<{ id: string }>(),
    decrementFromCart: props<{ id: string }>(),
    removeFromCart: props<{ id: string }>(),
    updateCart: props<{ products: Products }>(),
    clearCart: emptyProps(),
    openShoppingCartDialog: emptyProps(),
  },
})

export const {
  fetchCartItems,
  fetchCartItemsFailure,
  addToCart,
  addToCartSuccess,
  addToCartFailure,
  incrementFromCart,
  decrementFromCart,
  removeFromCart,
  updateCart,
  clearCart,
  openShoppingCartDialog,
} = shoppingCartActionGroup;