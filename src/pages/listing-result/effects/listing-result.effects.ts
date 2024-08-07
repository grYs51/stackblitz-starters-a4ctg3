import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  fetchListingResults,
  fetchListingResultsFailure,
  fetchListingResultsSuccess,
} from "../store/listing-result/listing-result.actions";
import { switchMap, map, catchError, of } from "rxjs";
import { ApiService } from "../../../shared/services/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { navigatedTo } from "../../../shared/utils/router";
import { ListingResultComponent } from "../listing-result.component";

@Injectable()
export class ListingResultEffects {
  actions$ = inject(Actions);

  api = inject(ApiService);

  router = inject(Router);

  activatedRoute = inject(ActivatedRoute);

  init$ = createEffect(() =>
    this.router.events.pipe(
      navigatedTo(ListingResultComponent),
      map(() => fetchListingResults())
    )
  );

  fetchListings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchListingResults),
      switchMap(() => this.api.fetchListings()),
      map((listings) => fetchListingResultsSuccess({ listings })),
      catchError((error) => of(fetchListingResultsFailure({ error })))
    )
  );
}
