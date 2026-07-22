enum LocalStorageKeys {
  AUTHENTICATION = 'authentication',
}

enum AuthenticationLocalStorageKeys {
  TOKEN = 'token',
  EXPIRES_AT = 'expires_at',
  DISPLAY_NAME = 'display_name',
  EMAIL = 'email',
}

interface ResetPasswordOptions {
  email: string;
  options: Partial<{
    captchaToken: string;
    redirectTo: string;
  }>;
}

interface AuthenticationLocalStorage {
  [AuthenticationLocalStorageKeys.TOKEN]: string;
  [AuthenticationLocalStorageKeys.EXPIRES_AT]: number;
  [AuthenticationLocalStorageKeys.DISPLAY_NAME]: string;
  [AuthenticationLocalStorageKeys.EMAIL]: string;
}

export type { ResetPasswordOptions, AuthenticationLocalStorage };

export { LocalStorageKeys, AuthenticationLocalStorageKeys };
