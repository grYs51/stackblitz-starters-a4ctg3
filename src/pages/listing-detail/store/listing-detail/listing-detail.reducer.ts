import { createReducer, on } from "@ngrx/store";
import { Listing } from "../../../../shared/models/listing";
import { fetchListingDetail, fetchListingDetailSuccess, fetchListingDetailFailure } from "./listing-detail.actions";

export interface listingDetailState {
  listing: Listing | undefined;
  loading: boolean;
  error: unknown;
}

export const initialState: listingDetailState = {
  listing: undefined,
  loading: false,
  error: null,
};

export const listingDetailReducer = createReducer(
  initialState,
  on(fetchListingDetail, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(fetchListingDetailSuccess, (state, { listing }) => ({
    ...state,
    listing,
    loading: false,
  })),
  on(fetchListingDetailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);