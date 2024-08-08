import { listingResultReducer, listingResultState } from "./listing-result/listing-result.reducer";
import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

export const featureName = "listing";

export interface ListingState {
  listingResults: listingResultState;
}

export const reducers : ActionReducerMap<ListingState> = {
  listingResults: listingResultReducer,
};

export const selectFeature = createFeatureSelector<ListingState>(featureName);