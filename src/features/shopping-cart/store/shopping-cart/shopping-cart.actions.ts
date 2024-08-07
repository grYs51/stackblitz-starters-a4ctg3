import { createActionGroup, emptyProps, props } from "@ngrx/store";

const shoppingCartActionGroup = createActionGroup({
  source: "Shopping Cart",
  events: {
    addToCart: props<{ id: string }>(),
    removeFromCart: props<{ id: string }>(),
    clearCart: emptyProps(),
  },
})

export const {
  addToCart,
  removeFromCart,
  clearCart,
} = shoppingCartActionGroup;