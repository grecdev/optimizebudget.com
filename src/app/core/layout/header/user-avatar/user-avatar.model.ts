import { type EmbeddedViewRef } from '@angular/core';

interface SetOptionsContainerStyleOptions {
  wrapper: EmbeddedViewRef<UserInfoWrapperContext>;
  currentTarget: HTMLElement;
}

interface UserInfoWrapperContext {
  fullName: string;
  email: string;
}

export type { SetOptionsContainerStyleOptions, UserInfoWrapperContext };
