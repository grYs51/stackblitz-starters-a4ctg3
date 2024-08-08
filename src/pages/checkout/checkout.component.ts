import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FormComponent } from "./components/form/form.component";
import { PushPipe } from "@ngrx/component";
import { CheckoutFacade } from "./store/checkout.facade";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ShoppingCartFacade } from "../../features/shopping-cart/store/shopping-cart.facade";
import { OverviewComponent } from "./components/overview/overview.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-checkout",
  standalone: true,
  imports: [FormComponent, PushPipe, OverviewComponent],
  templateUrl: "./checkout.component.html",
  styleUrl: "./checkout.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {
  private facade = inject(CheckoutFacade);
  private shoppingCartFacade = inject(ShoppingCartFacade);
  private router = inject(Router);

  loading$ = this.facade.loading$;

  success$ = this.facade.success$;

  items$ = this.shoppingCartFacade.cartWithItems$;

  form = new FormGroup({
    shippingInfo: new FormGroup({
      name: new FormControl("", [Validators.required]),
      address: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
      ]),
    }),
    paymentInfo: new FormGroup({
      cardNumber: new FormControl("", [
        Validators.required,
        Validators.pattern(/^\d{16}$/),
      ]),
      expirationDate: new FormControl("", [
        Validators.required,
        Validators.pattern(/^\d{2}\/\d{2}$/),
      ]),
    }),
  });

  submit() {
    this.facade.sendOrder({
      paymentInfo: {
        cardNumber: this.form.value.paymentInfo!.cardNumber!,
        expirationDate: this.form.value.paymentInfo!.expirationDate!,
      },
      shippingInfo: {
        name: this.form.value.shippingInfo!.name!,
        address: this.form.value.shippingInfo!.address!,
      },
    });
  }

  constructor() {
    this.success$.pipe(takeUntilDestroyed()).subscribe((success) => {
      if (success) {
        this.form.reset();
      }
    });

    this.shoppingCartFacade.totalItems$.pipe(takeUntilDestroyed()).subscribe((totalItems) => {
      if (totalItems === 0) {
        this.router.navigate(["/"]);
      }
    });
  }
}
