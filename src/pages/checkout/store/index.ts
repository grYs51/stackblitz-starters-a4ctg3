import { createFeatureSelector } from "@ngrx/store";
import { CheckoutState } from "./checkout/checkout.reducer";

export const featureName = "checkout";

export const selectFeature = createFeatureSelector<CheckoutState>(featureName);