import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Listing } from "../../../../shared/models/listing";

const listingResultActionGroup = createActionGroup({
  source: "Listing Result",
  events: {
    fetchListingResults: emptyProps(),
    fetchListingResultsSuccess: props<{ listings: Listing[] }>(),
    fetchListingResultsFailure: props<{ error: unknown }>(),
  },
})

export const {
  fetchListingResults,
  fetchListingResultsSuccess,
  fetchListingResultsFailure,
} = listingResultActionGroup;