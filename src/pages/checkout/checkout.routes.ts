import { Route } from "@angular/router";
import { CheckoutComponent } from "./checkout.component";
import { provideState } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { CheckoutFacade } from "./store/checkout.facade";
import { featureName } from "./store";
import { checkoutReducer } from "./store/checkout/checkout.reducer";
import { CheckoutEffects } from "./effects/checkout.effects";
export default [
  {
    path: "",
    component: CheckoutComponent,
    providers: [
      provideState(featureName, checkoutReducer),
      provideEffects([CheckoutEffects]),
      CheckoutFacade,
    ]
  }
] as Route[];
