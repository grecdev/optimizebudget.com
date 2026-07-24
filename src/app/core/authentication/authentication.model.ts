import { type UserAttributes } from '@supabase/supabase-js';

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

export type { ResetPasswordOptions, SendResetPasswordLinkOptions };

export {};
