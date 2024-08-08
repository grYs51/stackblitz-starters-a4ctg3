import { createSelector, Store } from "@ngrx/store";
import { inject, Injectable } from "@angular/core";
import {
  addToCart,
  clearCart,
  decrementFromCart,
  openShoppingCartDialog,
  removeFromCart,
} from "./shopping-cart/shopping-cart.actions";
import { combineLatest, map } from "rxjs";
import { ShoppingCart } from ".";
import { selectListings } from "../../listing/store/listing-result.facade";
import { CartItem } from "../../../shared/models/listing";

export const selectState = (state: object) =>
  (state as ShoppingCart).shoppingCart;
export const selectCart = createSelector(selectState, (state) => state.products);
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

  cartWithItems$ = combineLatest([
    this.cart$,
    this.store.select(selectListings),
  ]).pipe(
    map(([cart, listings]) => {
      return Object.entries(cart).map(([id, quantity]) => {
        const listing = listings.find((listing) => listing.id === id);
        return {
          ...listing,
          quantity,
        };
      }).filter(item => item !== undefined && item.price !== undefined) as CartItem[];
    })
  );

  totalPrice$ = this.cartWithItems$.pipe(
    map((cart) =>
      cart.reduce((acc, item) => acc + (item.price ?? 0) * item.quantity, 0)
    )
  );

  addToCart(id: string) {
    this.store.dispatch(addToCart({ id }));
  }

  increment(id: string) {
    this.store.dispatch(addToCart({ id }));
  }
  
  decrement(id: string) {
    this.store.dispatch(decrementFromCart({ id }));
  }

  removeFromCart(id: string) {
    this.store.dispatch(removeFromCart({ id }));
  }

  clearCart() {
    this.store.dispatch(clearCart());
  }

  openCartDialog() {
    this.store.dispatch(openShoppingCartDialog());
  }
}
