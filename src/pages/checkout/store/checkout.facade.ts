import { createSelector, Store } from "@ngrx/store";
import { selectFeature } from ".";
import { inject, Injectable } from "@angular/core";
import { sendOrder } from "./checkout/checkout.actions";
import { Order } from "../../../shared/models/checkout";

const selectCheckoutState = createSelector(selectFeature, (state) => state);
const selectLoading = createSelector(
  selectCheckoutState,
  (state) => state.loading
);
const selectSuccess = createSelector(
  selectCheckoutState,
  (state) => state.success
);

@Injectable()
export class CheckoutFacade {
  private store = inject(Store);

  loading$ = this.store.select(selectLoading);
  success$ = this.store.select(selectSuccess);


  sendOrder(order: Order) {
    this.store.dispatch(sendOrder({ order }));
  }
}
