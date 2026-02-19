import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type DialogOptions } from './dialog.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements DialogOptions {
  public title: string = 'Please add your title!';
  public closeButton: boolean = true;
}
