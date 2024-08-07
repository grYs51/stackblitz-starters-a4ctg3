import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import { listingDetailReducer, listingDetailState } from "./listing-detail/listing-detail.reducer";

export const featureName = "listing-detail";

export interface ListingDetailState {
  listingDetail: listingDetailState;
}

export const reducers : ActionReducerMap<ListingDetailState> = {
  listingDetail: listingDetailReducer,
};

export const selectFeature = createFeatureSelector<ListingDetailState>(featureName);