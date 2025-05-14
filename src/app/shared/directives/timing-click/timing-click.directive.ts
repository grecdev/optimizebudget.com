import { DestroyRef, Directive, HostListener, inject, input, OnInit, output } from '@angular/core';

import { debounceTime, MonoTypeOperatorFunction, Subject, Subscription, throttleTime } from 'rxjs';

import { TimingType } from './timing-click.model';

@Directive({
  selector: '[appTimingClick]',
  standalone: false,
})
export class TimingClickDirective implements OnInit {
  timingClick = output<MouseEvent>();
  timingTimeMS = input<number>(500); // Milliseconds
  timingType = input.required<TimingType>();

  private destroyRef = inject(DestroyRef);
  private clickSubject = new Subject();
  private subscription: Subscription = new Subscription();

  @HostListener('click', ['$event'])
  clickEvent(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.clickSubject.next(event);
  }

  ngOnInit() {
    const timingType: Record<TimingType, MonoTypeOperatorFunction<unknown>> = {
      throttle: throttleTime(this.timingTimeMS()),
      debounce: debounceTime(this.timingTimeMS()),
    };

    this.subscription = this.clickSubject
      .pipe(timingType[this.timingType()])
      .subscribe((data) => this.timingClick.emit(data as MouseEvent));

    this.destroyRef.onDestroy(() => {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    });
  }
}
