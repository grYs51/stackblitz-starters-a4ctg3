import { Route } from "@angular/router";
import { ListingResultComponent } from "./listing-result.component";
import { provideState } from "@ngrx/store";
import { featureName, reducers } from "./store";
import { ListingResultFacade } from "./store/listing-result.facade";
import { provideEffects } from "@ngrx/effects";
import { ListingResultEffects } from "./effects/listing-result.effects";

export default  [
  {
    path: "",
    component: ListingResultComponent,
    providers: [
      provideEffects(ListingResultEffects),
      provideState(featureName, reducers),
      ListingResultFacade,
    ]
  }
] as Route[];