import { createSelector, Store } from "@ngrx/store";
import { inject, Injectable } from "@angular/core";
import {
  addToCart,
  clearCart,
  removeFromCart,
} from "./shopping-cart/shopping-cart.actions";
import { map } from "rxjs";
import { ShoppingCart } from ".";

const selectState = (state: object) =>
  (state as ShoppingCart).shoppingCart;
const selectCart = createSelector(selectState, (state) => state.products);
const selectLoading = createSelector(selectState, (state) => state.loading);
const selectError = createSelector(selectState, (state) => state.error);

@Injectable()
export class ShoppingCartFacade {
  private store = inject(Store);

  cart$ = this.store.select(selectCart);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);

  totalItems$ = this.cart$.pipe(
    map((cart) => Object.values(cart).reduce((acc, quantity) => acc + quantity, 0))
  );

  addToCart(id: string) {
    this.store.dispatch(addToCart({ id }));
  }

  removeFromCart(id: string) {
    this.store.dispatch(removeFromCart({ id }));
  }

  clearCart() {
    this.store.dispatch(clearCart());
  }
}
