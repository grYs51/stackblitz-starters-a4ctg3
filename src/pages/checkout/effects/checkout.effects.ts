import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  switchMap,
  map,
  catchError,
  of,
  delay,
  withLatestFrom,
  tap,
  filter,
} from "rxjs";
import {
  sendOrder,
  sendOrderSuccess,
  sendOrderFailure,
} from "../store/checkout/checkout.actions";
import { ShoppingCartFacade } from "../../../features/shopping-cart/store/shopping-cart.facade";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { SuccessDialogComponent } from "../../../dialogs/success-dialog/success-dialog.component";
import { ListingResultFacade } from "../../../features/listing/store/listing-result.facade";
import { navigatedTo } from "../../../shared/utils/router";
import { CheckoutComponent } from "../checkout.component";
import { fetchListingResults } from "../../../features/listing/store/listing-result/listing-result.actions";

@Injectable()
export class CheckoutEffects {
  actions$ = inject(Actions);
  shoppingCartFacade = inject(ShoppingCartFacade);
  listingResultFacade = inject(ListingResultFacade);
  matDialog = inject(MatDialog);
  router = inject(Router);

  checkIfItemsExist$ = createEffect(() =>
    this.router.events.pipe(
      navigatedTo(CheckoutComponent),
      withLatestFrom(this.listingResultFacade.listings$),
      filter(([, listings]) => listings.length === 0),
      map(() => fetchListingResults())
    )
  );

  sendOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendOrder),
      withLatestFrom(this.shoppingCartFacade.cart$),
      switchMap(([{ order }, items]) =>
        of(null).pipe(
          tap(() => {
            console.info("Sending order", order, items);
          }),
          delay(2000),
          map(() => sendOrderSuccess({ order })),
          catchError((error) => of(sendOrderFailure({ error })))
        )
      )
    )
  );

  sendOrderSuccessDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendOrderSuccess),
        map(() => {
          this.matDialog.open(SuccessDialogComponent);
          this.router.navigate(["/"]);
        })
      ),
    { dispatch: false }
  );

  clearCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendOrderSuccess),
        map(() => this.shoppingCartFacade.clearCart())
      ),
    { dispatch: false }
  );
}
