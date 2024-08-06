import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-listing-result",
  standalone: true,
  imports: [],
  templateUrl: "./listing-result.component.html",
  styleUrl: "./listing-result.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingResultComponent {}
