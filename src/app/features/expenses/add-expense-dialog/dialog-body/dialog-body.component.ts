import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogBodyComponent {}
