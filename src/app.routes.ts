import { Route } from '@angular/router';
export const routes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/listing-result/listing-result.component').then(m => m.ListingResultComponent)
  }
];
