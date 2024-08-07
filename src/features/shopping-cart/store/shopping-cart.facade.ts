import { createSelector, Store } from "@ngrx/store";
import {  selectFeature } from ".";
import { inject } from "@angular/core";

const selectCart = createSelector(selectFeature, (state) => state.products);
const selectLoading = createSelector(selectFeature, (state) => state.loading);
const selectError = createSelector(selectFeature, (state) => state.error);

export class ShoppingCartFacade {
  private store = inject(Store);

  cart$ = this.store.select(selectCart);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);
}