import { createActionGroup, props } from "@ngrx/store";
import { Listing } from "../../../../shared/models/listing";

const listingDetailActionGroup = createActionGroup({
  source: "Listing Detail",
  events: {
    fetchListingDetail: props<{ id: string }>(),
    fetchListingDetailSuccess: props<{ listing: Listing }>(),
    fetchListingDetailFailure: props<{ error: unknown }>(),
  },
})

export const {
  fetchListingDetail,
  fetchListingDetailSuccess,
  fetchListingDetailFailure,
} = listingDetailActionGroup;