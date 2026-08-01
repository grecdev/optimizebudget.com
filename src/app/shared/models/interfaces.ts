import { type UserMetadata } from '@supabase/supabase-js';

import { UserMetaDataKeys } from '@shared/models/enums';

interface Route {
  id: number;
  path: string;
  ariaLabel: string;
  textContent?: string;
  target?: '_self' | '_blank';
  icon?: any;
}

interface ClearTimeoutOptions {
  timeout: ReturnType<typeof setTimeout> | null;
}

interface RouteSnapshotData {
  authenticationPage: boolean;
}

interface RegexPatterns {
  specialCharacters: RegExp;
  numbers: RegExp;
  lowercase: RegExp;
  uppercase: RegExp;
  lengthLimit: RegExp;
  fullName: RegExp;
  password: RegExp;
}

interface UserData extends UserMetadata {
  [UserMetaDataKeys.CONFIRMATION_DONE]: boolean;
}

export type { Route, ClearTimeoutOptions, RouteSnapshotData, RegexPatterns, UserData };
