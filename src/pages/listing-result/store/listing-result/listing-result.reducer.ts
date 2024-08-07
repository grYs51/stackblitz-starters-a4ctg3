import { createReducer, on } from "@ngrx/store";
import { Listing } from "../../../../shared/models/listing";
import { fetchListingResults, fetchListingResultsSuccess, fetchListingResultsFailure } from "./listing-result.actions";

export interface listingResultState {
  listings: Listing[];
  loading: boolean;
  error: unknown;
}

export const initialState: listingResultState = {
  listings: [],
  loading: false,
  error: null,
};

export const listingResultReducer = createReducer(
  initialState,
  on(fetchListingResults, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(fetchListingResultsSuccess, (state, { listings }) => ({
    ...state,
    listings,
    loading: false,
  })),
  on(fetchListingResultsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);