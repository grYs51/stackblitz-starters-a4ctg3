import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";

import { CartItem } from "../../../../shared/models/listing";
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: "app-overview",
  standalone: true,
  imports: [MatListModule, MatCardModule, CurrencyPipe],
  templateUrl: "./overview.component.html",
  styleUrl: "./overview.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  items = input<CartItem[]>();

  price = computed(() => this.items()?.reduce((acc, item) => acc + item.price * item.quantity, 0));
}
