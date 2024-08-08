import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  fetchCartItemsFailure,
  fetchCartItemsSuccess,
  openShoppingCartDialog,
} from "../store/shopping-cart/shopping-cart.actions";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ShoppingCartComponent } from "../../../dialogs/shopping-cart/shopping-cart.component";
import { ShoppingCartFacade } from "../store/shopping-cart.facade";
import { ApiService } from "../../../shared/services/api.service";

@Injectable()
export class ShoppingCartEffects {
  actions$ = inject(Actions);

  matDialog = inject(MatDialog);

  facade = inject(ShoppingCartFacade);

  api = inject(ApiService);

  fetchShoppingCartItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(openShoppingCartDialog),
      mergeMap(() => {
        return this.api.fetchListings().pipe(
          map((listings) => fetchCartItemsSuccess({ listings })),
          catchError((error) => of(fetchCartItemsFailure({ error })))
        );
      })
    )
  );

  openShoppingCartDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openShoppingCartDialog),
        tap(() => {
          this.matDialog.open(ShoppingCartComponent, {
            width: "70%",
          });
        })
      ),
    { dispatch: false }
  );
}
