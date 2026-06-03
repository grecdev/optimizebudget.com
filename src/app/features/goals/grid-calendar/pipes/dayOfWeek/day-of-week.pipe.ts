import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayOfWeek',
})
export class DayOfWeekPipe implements PipeTransform {
  /**
   * @summary - Static text content for days of the week.
   *
   * @type {Array<string>}
   *
   * @private
   * @readonly
   */
  private readonly daysOfWeek: Array<string> = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  transform(index: number): string {
    const VALUE = this.daysOfWeek[index];

    if (!VALUE) {
      return 'none';
    }

    return VALUE;
  }
}
