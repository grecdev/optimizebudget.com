import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-modal-body',
  templateUrl: './modal-body.component.html',
  styleUrls: ['./modal-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalBodyComponent {}
