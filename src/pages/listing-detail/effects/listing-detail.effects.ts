import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { switchMap, map, catchError, of, withLatestFrom } from "rxjs";
import { ApiService } from "../../../shared/services/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { navigatedTo } from "../../../shared/utils/router";
import { ListingDetailComponent } from "../listing-detail.component";
import {
  fetchListingDetail,
  fetchListingDetailFailure,
  fetchListingDetailSuccess,
} from "../store/listing-detail/listing-detail.actions";
import { ListingResultFacade } from "../../../features/listing/store/listing-result.facade";
@Injectable()
export class ListingDetailEffects {
  actions$ = inject(Actions);

  api = inject(ApiService);

  router = inject(Router);

  activatedRoute = inject(ActivatedRoute);

  listingResultFacade = inject(ListingResultFacade);

  init$ = createEffect(() =>
    this.router.events.pipe(
      navigatedTo(ListingDetailComponent),
      map((event) => fetchListingDetail({ id: event.snapshot.params["id"] }))
    )
  );



  fetchListings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchListingDetail),
      withLatestFrom(this.listingResultFacade.listings$),
      switchMap(([{ id }, listings]) => {
        const existingListing = listings.find((listing) => listing.id === id);
        if (existingListing) {
          return of(fetchListingDetailSuccess({ listing: existingListing }));
        } else {
          return this.api.fetchListing(id).pipe(
            map((listing) => fetchListingDetailSuccess({ listing })),
            catchError((error) => of(fetchListingDetailFailure({ error })))
          );
        }
      })
    )
  );
}
