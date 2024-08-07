import { Route } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";
import { ListingDetailEffects } from "./effects/listing-detail.effects";
import { ListingDetailComponent } from "./listing-detail.component";
import { featureName, reducers } from "./store";
import { ListingDetailFacade } from "./store/listing-detail.facade";

export default [
  {
    path: ":id",
    component: ListingDetailComponent,
    providers: [
      provideState(featureName, reducers),
      provideEffects(ListingDetailEffects),
      ListingDetailFacade,
    ]
  }
] as Route[];