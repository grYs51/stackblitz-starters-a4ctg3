import { createSelector, Store } from "@ngrx/store";
import { selectFeature } from ".";
import { inject, Injectable } from "@angular/core";
import { addToCart, clearCart, removeFromCart } from "../../../features/shopping-cart/store/shopping-cart/shopping-cart.actions";

const selectListingDetailState = createSelector(selectFeature, (state) => state.listingDetail);
const selectListing = createSelector(selectListingDetailState, (state) => state.listing);
const selectLoading = createSelector(selectListingDetailState, (state) => state.loading);
const selectError = createSelector(selectListingDetailState, (state) => state.error);

@Injectable()
export class ListingDetailFacade {
  private store = inject(Store);

  listing$ = this.store.select(selectListing);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);

  addListingToCart(id: string) {
    this.store.dispatch(addToCart({ id }));
  }

  removeListingFromCart(id: string) {
    this.store.dispatch(removeFromCart({ id }));
  }

  clearCart() {
    this.store.dispatch(clearCart());
  }
}