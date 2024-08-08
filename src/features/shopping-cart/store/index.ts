import {
  ActionReducer,
  createFeatureSelector,
  MetaReducer,
} from "@ngrx/store";
import {
  shoppingCartReducer,
  ShoppingCartState,
} from "./shopping-cart/shopping-cart.reducer";
import { localStorageSync } from "ngrx-store-localstorage";

export const featureName = "shoppingCart";

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

export const metaReducers: MetaReducer[] = [localStorageSyncReducer];

export const selectFeature =
  createFeatureSelector<ShoppingCart>(featureName);