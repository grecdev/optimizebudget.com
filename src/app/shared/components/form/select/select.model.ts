import { type EmbeddedViewRef } from '@angular/core';

interface SetOptionsContainerStyleOptions {
  optionsContainer: EmbeddedViewRef<void>;
  currentTarget: HTMLElement;
}

interface HandleOptionChangeOptions {
  value: string;
  textContent: string;
}

export type { SetOptionsContainerStyleOptions, HandleOptionChangeOptions };
