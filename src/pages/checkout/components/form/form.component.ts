import { ChangeDetectionStrategy, Component, computed, input, output } from "@angular/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-form",
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./form.component.html",
  styleUrl: "./form.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  form = input.required<FormGroup>();

  loading = input<boolean>();

  submit = output();

  shippingInfo = computed(() => this.form().controls["shippingInfo"] as FormGroup);

  paymentInfo = computed(() => this.form().controls["paymentInfo"] as FormGroup);
}
