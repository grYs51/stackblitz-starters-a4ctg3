import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { switchMap, map, catchError, of } from "rxjs";
import { ApiService } from "../../../shared/services/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { navigatedTo } from "../../../shared/utils/router";
import { ListingDetailComponent } from "../listing-detail.component";
import {
  fetchListingDetail,
  fetchListingDetailFailure,
  fetchListingDetailSuccess,
} from "../store/listing-detail/listing-detail.actions";
@Injectable()
export class ListingDetailEffects {
  actions$ = inject(Actions);

  api = inject(ApiService);

  router = inject(Router);

  activatedRoute = inject(ActivatedRoute);

  init$ = createEffect(() =>
    this.router.events.pipe(
      navigatedTo(ListingDetailComponent),
      map((event) => fetchListingDetail({ id: event.snapshot.params["id"] }))
    )
  );

  fetchListings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchListingDetail),
      switchMap(({ id }) => this.api.fetchListing(id)),
      map((listing) => fetchListingDetailSuccess({ listing })),
      catchError((error) => of(fetchListingDetailFailure({ error })))
    )
  );
}
