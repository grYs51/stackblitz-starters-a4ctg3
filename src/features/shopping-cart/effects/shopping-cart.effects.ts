import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  addToCart,
  addToCartFailure,
  addToCartSuccess,
  openShoppingCartDialog,
  removeFromCart,
  updateCart,
} from "../store/shopping-cart/shopping-cart.actions";
import { filter, map, tap, withLatestFrom } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ShoppingCartComponent } from "../../../dialogs/shopping-cart/shopping-cart.component";
import { ShoppingCartFacade } from "../store/shopping-cart.facade";
import { ApiService } from "../../../shared/services/api.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class ShoppingCartEffects {
  actions$ = inject(Actions);

  matDialog = inject(MatDialog);

  facade = inject(ShoppingCartFacade);

  api = inject(ApiService);

  toastr = inject(ToastrService);

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
          return addToCartFailure({ error: "Not enough stock" });
        }
        return addToCartSuccess({ id: action.id, quantity, listing });
      })
    )
  );

  // Toast
  addToCartSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addToCartSuccess),
        tap(({ listing, quantity }) => {
          this.toastr.success(
            `${quantity + 1}x ${listing.title} in cart`,
            "Item added to cart"
          );
        })
      ),
    { dispatch: false }
  );

  addToCartFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addToCartFailure),
        tap(({ error }) => {
          this.toastr.error(error as string);
        })
      ),
    { dispatch: false }
  );

  clearItems$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeFromCart),
        tap(() => {
          this.toastr.success("Item removed from cart", "Item removed");
        })
      ),
    { dispatch: false }
  );

  checkIfAllItemsInCartAreAvailable$ = createEffect(() =>
    this.actions$.pipe(
      ofType(openShoppingCartDialog),
      withLatestFrom(this.facade.cart$, this.facade.listings$),
      filter(([, , listings]) => !!listings),
      map(([, cart, listings]) => {
        const updatedCart = Object.entries(cart).reduce(
          (acc, [id, quantity]) => {
            const listing = listings.find((listing) => listing.id === id);
            if (!listing) {
              return acc;
            }
            const updatedQuantity = Math.min(quantity, listing.stock);
            return { ...acc, [id]: updatedQuantity };
          },
          {} as Record<string, number>
        );

        const totalItemsInCart = Object.values(cart).reduce((acc, quantity) => acc + quantity, 0);
        const totalItemsInUpdatedCart = Object.values(updatedCart).reduce(
          (acc, quantity) => acc + quantity,
          0
        );

        if (totalItemsInCart !== totalItemsInUpdatedCart) {
          return updateCart({ products: updatedCart });
        }
        return { type: "NOOP" };
      })
    )
  );

  toastWhenCartUpdated$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateCart),
        tap(() => {
          this.toastr.info("Some items are out of stock or have been removed", "Cart updated");
        })
      ),
    { dispatch: false }
  );
}
