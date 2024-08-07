import { Route } from '@angular/router';
import { PageComponent } from './shared/components/page/page.component';
export const routes: Route[] = [

  {
    path: '',
    component: PageComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/listing-result/listing-result.routes')
      },
      {
        path: 'listing-detail',
        loadChildren: () => import('./pages/listing-detail/listing-detail.routes')
      }
    ]
  }
];
