import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatBadgeModule } from "@angular/material/badge";
import { ShoppingCartFacade } from "../../../features/shopping-cart/store/shopping-cart.facade";
import { PushPipe } from "@ngrx/component";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-toolbar",
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    PushPipe,
    RouterLink,
  ],
  templateUrl: "./toolbar.component.html",
  styleUrl: "./toolbar.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  private shoppingCartFacade = inject(ShoppingCartFacade);

  total$ = this.shoppingCartFacade.totalItems$;

  openCart() {
    this.shoppingCartFacade.openCartDialog();
  }
}
