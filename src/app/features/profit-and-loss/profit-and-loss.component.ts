import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-profit-and-loss',
  templateUrl: './profit-and-loss.component.html',
  styleUrls: ['./profit-and-loss.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfitAndLossComponent {}
