import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { ShoppingCartFacade } from "../../features/shopping-cart/store/shopping-cart.facade";
import { LetDirective, PushPipe } from "@ngrx/component";
import { CartItemComponent } from "./components/cart-item/cart-item.component";
import { Observable } from "rxjs";
import { Listing } from "../../shared/models/listing";
import { CurrencyPipe } from "@angular/common";

interface CartItem extends Listing {
  quantity: number;
}

@Component({
  selector: "app-shopping-cart",
  standalone: true,
  imports: [
    MatDialogModule,
    LetDirective,
    PushPipe,
    CartItemComponent,
    MatButtonModule,
    CartItemComponent,
    MatDividerModule,
    CurrencyPipe,
  ],
  templateUrl: "./shopping-cart.component.html",
  styleUrl: "./shopping-cart.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartComponent {
  private facade = inject(ShoppingCartFacade);

  products$ = this.facade.cartWithItems$ as Observable<CartItem[]>;

  total$ = this.facade.totalItems$;

  totalPrice$ = this.facade.totalPrice$;

  removeFromCart(id: string) {
    this.facade.removeFromCart(id);
  }

  incrementItem(id: string) {
    this.facade.addToCart(id);
  }

  decrementItem(id: string) {
    this.facade.decrement(id);
  }
}
