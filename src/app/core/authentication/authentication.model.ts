import { AuthError, Session, type UserAttributes } from '@supabase/supabase-js';

interface SendResetPasswordLinkOptions {
  email: string;
  options: Partial<{
    captchaToken: string;
    redirectTo: string;
  }>;
}

interface ResetPasswordOptions {
  userAttributes: UserAttributes;
}

// Not found in official docs.
type GetSessionResult =
  | { data: { session: Session }; error: null }
  | { data: { session: null }; error: AuthError }
  | { data: { session: null }; error: null };

export type { ResetPasswordOptions, SendResetPasswordLinkOptions, GetSessionResult };

export {};
