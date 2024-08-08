import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType, OnInitEffects } from "@ngrx/effects";
import { switchMap, map, catchError, of } from "rxjs";
import { ApiService } from "../../../shared/services/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { navigatedTo } from "../../../shared/utils/router";
import { ListingResultComponent } from "../../../pages/listing-result/listing-result.component";
import { fetchListingResults, fetchListingResultsSuccess, fetchListingResultsFailure } from "../store/listing-result/listing-result.actions";
import { openShoppingCartDialog } from "../../shopping-cart/store/shopping-cart/shopping-cart.actions";
import { Action } from "@ngrx/store";

@Injectable()
export class ListingResultEffects implements OnInitEffects {

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
      ofType(fetchListingResults, openShoppingCartDialog),
      switchMap(() => this.api.fetchListings()),
      map((listings) => fetchListingResultsSuccess({ listings })),
      catchError((error) => of(fetchListingResultsFailure({ error })))
    )
  );

  ngrxOnInitEffects(): Action {
    return fetchListingResults();
  }
}
