import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  addToCart,
  addToCartFailure,
  addToCartSuccess,
  openShoppingCartDialog,
} from "../store/shopping-cart/shopping-cart.actions";
import { map, tap, withLatestFrom } from "rxjs";
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

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToCart),
      withLatestFrom(this.facade.cart$, this.facade.listings$),
      map(([action, cart, listings]) => {
        const listing = listings.find((listing) => listing.id === action.id);

        if (!listing) {
          return addToCartFailure({ error: "Item not found" });
        }
        const quantity = cart[action.id] || 0;
        if (quantity >= listing.stock) {
          return addToCartFailure({ error: "Item out of stock" });
        }
        return addToCartSuccess({ id: action.id });
      })
    )
  );
}
