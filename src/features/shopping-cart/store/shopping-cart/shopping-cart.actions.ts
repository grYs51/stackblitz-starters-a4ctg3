import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Listing } from "../../../../shared/models/listing";
const shoppingCartActionGroup = createActionGroup({
  source: "Shopping Cart",
  events: {
    fetchCartItems: emptyProps(),
    fetchCartItemsSuccess: props<{ listings: Listing[] }>(),
    fetchCartItemsFailure: props<{ error: unknown }>(),
    addToCart: props<{ id: string }>(),
    addToCartSuccess: props<{ id: string }>(),
    addToCartFailure: props<{ error: unknown }>(),
    incrementFromCart: props<{ id: string }>(),
    decrementFromCart: props<{ id: string }>(),
    removeFromCart: props<{ id: string }>(),
    clearCart: emptyProps(),
    openShoppingCartDialog: emptyProps(),
  },
})

export const {
  fetchCartItems,
  fetchCartItemsSuccess,
  fetchCartItemsFailure,
  addToCart,
  addToCartSuccess,
  addToCartFailure,
  incrementFromCart,
  decrementFromCart,
  removeFromCart,
  clearCart,
  openShoppingCartDialog,
} = shoppingCartActionGroup;