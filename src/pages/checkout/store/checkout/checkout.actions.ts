import { createActionGroup, props } from "@ngrx/store";
import { Order } from "../../../../shared/models/checkout";

const checkoutActionGroup = createActionGroup({
  source: "checkout",
  events: {
    sendOrder: props<{ order: Order }>(),
    sendOrderSuccess: props<{ order: Order }>(),
    sendOrderFailure: props<{ error: unknown }>(),
  },
})

export const {
  sendOrder,
  sendOrderSuccess,
  sendOrderFailure,
} = checkoutActionGroup;