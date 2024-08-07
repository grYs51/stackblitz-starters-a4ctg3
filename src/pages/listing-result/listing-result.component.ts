import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ListingResultFacade } from "./store/listing-result.facade";
import { PushPipe } from "@ngrx/component";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: "app-listing-result",
  standalone: true,
  imports: [PushPipe, MatTableModule, MatButtonModule, RouterLink, MatProgressSpinnerModule],
  templateUrl: "./listing-result.component.html",
  styleUrl: "./listing-result.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingResultComponent {
  private facade = inject(ListingResultFacade);

  listings$ = this.facade.listings$;

  loading$ = this.facade.loading$;

  displayedColumns: string[] = ["id", "title", "price", "link"];
}
