import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
  ],
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessDialogComponent { }
