import { createSelector, Store } from "@ngrx/store";
import { selectFeature } from ".";
import { inject, Injectable } from "@angular/core";

const selectListingResultState = createSelector(selectFeature, (state) => state.listingResults);
const selectListings = createSelector(selectListingResultState, (state) => state.listings);
const selectLoading = createSelector(selectListingResultState, (state) => state.loading);
const selectError = createSelector(selectListingResultState, (state) => state.error);

@Injectable()
export class ListingResultFacade {
  private store = inject(Store);

  listings$ = this.store.select(selectListings);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);
}