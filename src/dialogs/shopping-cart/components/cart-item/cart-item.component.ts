import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CartItem } from '../../../../shared/models/listing';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    MatCardModule ,
    CurrencyPipe,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent { 
  product = input.required<CartItem>();

  remove = output<string>();

  increment = output<string>();

  decrement = output<string>();
}
