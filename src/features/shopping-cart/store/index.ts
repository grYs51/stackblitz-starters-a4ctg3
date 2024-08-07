import {
  ActionReducer,
  createFeatureSelector,
  MetaReducer,
  provideStore,
} from "@ngrx/store";
import {
  shoppingCartReducer,
  ShoppingCartState,
} from "./shopping-cart/shopping-cart.reducer";
import { localStorageSync } from "ngrx-store-localstorage";
import { provideEffects } from "@ngrx/effects";
import { ShoppingCartEffects } from "../effects/shopping-cart.effects";

export const featureName = "shopping-cart";

export interface ShoppingCart {
  shoppingCart: ShoppingCartState;
}

export const reducers = {
  shoppingCart: shoppingCartReducer,
};

const localStorageSyncReducer = (reducer: ActionReducer<ShoppingCart>) => {
  return localStorageSync({
    keys: ["shoppingCart"],
    rehydrate: true,
  })(reducer);
};

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

export const selectFeature =
  createFeatureSelector<ShoppingCartState>(featureName);

export const storeProviders = [
  provideEffects([ShoppingCartEffects]),
  provideStore(reducers, { metaReducers }),
];
