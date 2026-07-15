interface ResetPasswordOptions {
  email: string;
  options: Partial<{
    captchaToken: string;
    redirectTo: string;
  }>;
}

export type { ResetPasswordOptions };
