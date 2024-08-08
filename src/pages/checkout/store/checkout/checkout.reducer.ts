import { createReducer, on } from "@ngrx/store";
import { sendOrder, sendOrderFailure, sendOrderSuccess } from "./checkout.actions";

export interface CheckoutState {
  loading: boolean;
  success: boolean;
}

export const initialState: CheckoutState  = {
  loading: false,
  success: false,
};

export const checkoutReducer = createReducer(
  initialState,
  on(sendOrder, () => ({
    success: false,
    loading: true,
  })),
  on(sendOrderSuccess, () => ({
    success: true,
    loading: false,
  })),
  on(sendOrderFailure, () => ({
    success: false,
    loading: false,
  }))
);