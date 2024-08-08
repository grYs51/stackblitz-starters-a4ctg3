/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";
import { ApiService } from "../../../shared/services/api.service";
import { ShoppingCartFacade } from "../store/shopping-cart.facade";
import { ShoppingCartEffects } from "./shopping-cart.effects";
import { TestBed } from "@angular/core/testing";
import { Action } from "@ngrx/store";
import { provideMockActions } from "@ngrx/effects/testing";
import { addToCart, addToCartFailure, addToCartSuccess } from "../store/shopping-cart/shopping-cart.actions";
import { hot, cold } from "jasmine-marbles";
import { ListingResultFacade } from "../../listing/store/listing-result.facade";

describe("ShoppingCartEffects", () => {
  let effects: ShoppingCartEffects, actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        ShoppingCartEffects,
        {
          provide: ShoppingCartFacade,
          useValue: { cart$: of({})},
        },
        {
            provide: ListingResultFacade,
            useValue: { listings$: of([{ id: "1", stock: 1 }]) },
        },
        { provide: ApiService, useValue: {} },
        { provide: ToastrService, useValue: {} },
        { provide: MatDialog, useValue: {} },
      ],
    });

    effects = TestBed.inject(ShoppingCartEffects);
  });

  it("should be created", () => {
    expect(effects).toBeTruthy();
  });

  describe("addToCart$", () => {
    it("should return addToCartSuccess action", () => {
      const action = addToCart({ id: "1" });
      const expected = cold("-b", {
        b: addToCartSuccess({
          id: "1",
          quantity: 0,
          listing: { id: "1", stock: 1 } as any,
        }),
      });

      actions$ = hot("-a", { a: action });

      expect(effects.addToCart$).toBeObservable(expected);
    });

    it("should return addToCartFailure action when item not found", () => {
      const action = addToCart({ id: "2" });
      const expected = cold("-b", {
        b: addToCartFailure({ error: "Item not found" }),
      });

      actions$ = hot("-a", { a: action });

      expect(effects.addToCart$).toBeObservable(expected);
    });

    xit("should return addToCartFailure action when not enough stock", () => {
      const action = addToCart({ id: "1" });
      const cart = { "1": 1 };
      const listings = [{ id: "1", stock: 1 }];

      effects.facade.cart$ = of(cart);
      effects.listingResultFacade.listings$ = of(listings as any);

      const expected = cold("-b", {
        b: addToCartFailure({ error: "Not enough stock" }),
      });

      actions$ = hot("-a", { a: action });

      expect(effects.addToCart$).toBeObservable(expected);
    });
  });
});
