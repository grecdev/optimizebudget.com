import { type EmbeddedViewRef } from '@angular/core';

interface SetOptionsContainerStyleOptions {
  wrapper: EmbeddedViewRef<UserInfoWrapperMobileContext>;
  currentTarget: HTMLElement;
}

interface UserInfoWrapperMobileContext {
  fullName: string;
  email: string;
}

export type { SetOptionsContainerStyleOptions, UserInfoWrapperMobileContext };
