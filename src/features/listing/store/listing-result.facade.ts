import { createSelector, Store } from "@ngrx/store";
import { inject, Injectable } from "@angular/core";
import { ListingState } from ".";

const selectListingResultState = (state: object) => (state as ListingState).listingResults;
export const selectListings = createSelector(selectListingResultState, (state) => state.listings);
const selectLoading = createSelector(selectListingResultState, (state) => state.loading);
const selectError = createSelector(selectListingResultState, (state) => state.error);

@Injectable()
export class ListingResultFacade {
  private store = inject(Store);

  listings$ = this.store.select(selectListings);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);
}