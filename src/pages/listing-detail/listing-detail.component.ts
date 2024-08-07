import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ListingDetailFacade } from "./store/listing-detail.facade";
import { PushPipe } from "@ngrx/component";
import { MatButtonModule } from "@angular/material/button";
import { ShoppingCartFacade } from "../../features/shopping-cart/store/shopping-cart.facade";

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

  private shoppingCartFacade = inject(ShoppingCartFacade);

  listing$ = this.facade.listing$;

  loading$ = this.facade.loading$;

  addToCart(id: string) {
    this.shoppingCartFacade.addToCart(id);
  }
}
