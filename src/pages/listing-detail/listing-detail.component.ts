import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ListingDetailFacade } from "./store/listing-detail.facade";
import { PushPipe } from "@ngrx/component";
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: "app-listing-detail",
  standalone: true,
  imports: [PushPipe, MatButtonModule],
  templateUrl: "./listing-detail.component.html",
  styleUrl: "./listing-detail.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingDetailComponent {
  private facade = inject(ListingDetailFacade);

  listing$ = this.facade.listing$;

  loading$ = this.facade.loading$;

  addToCart() {
    console.log("Adding to cart");
  }
}
