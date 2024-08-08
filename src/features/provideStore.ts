import { metaReducers, reducers as shoppingCartReducers } from "./shopping-cart/store"
import { reducers as  listingReducers } from "./listing/store"
import { provideStore } from "@ngrx/store"
import { provideEffects } from "@ngrx/effects"
import { ShoppingCartFacade } from "./shopping-cart/store/shopping-cart.facade"
import { ListingResultFacade } from "./listing/store/listing-result.facade"
import { ListingResultEffects } from "./listing/effects/listing-result.effects"
import { ShoppingCartEffects } from "./shopping-cart/effects/shopping-cart.effects"

const storeReducers = {
  ...shoppingCartReducers,
  ...listingReducers
}

export const storeProviders = () => [
  provideStore(storeReducers, { metaReducers }),
  provideEffects([ShoppingCartEffects, ListingResultEffects]),
  ShoppingCartFacade, 
  ListingResultFacade
]