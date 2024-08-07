import { Route } from '@angular/router';
import { PageComponent } from './shared/components/page/page.component';
export const routes: Route[] = [

  {
    path: '',
    component: PageComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/listing-result/listing-result.component').then(m => m.ListingResultComponent)
      }
    ]
  }
];
