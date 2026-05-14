import { type EmbeddedViewRef } from '@angular/core';

interface SetOptionsContainerStyleOptions {
  selectOptionsWrapper: EmbeddedViewRef<void>;
  currentTarget: HTMLElement;
}

interface HandleOptionChangeOptions {
  value: string;
  textContent: string;
}

export type { SetOptionsContainerStyleOptions, HandleOptionChangeOptions };
