enum AuthenticationQueryParams {
  TOKEN = 'token',
}

enum AuthenticationBrowserStorageKeys {
  AUTHENTICATION = 'authentication',
}

interface ResetPasswordOptions {
  email: string;
  options: Partial<{
    captchaToken: string;
    redirectTo: string;
  }>;
}

interface AuthenticationLocalStorage {
  [AuthenticationQueryParams.TOKEN]: string;
}

export type { ResetPasswordOptions, AuthenticationLocalStorage };
export { AuthenticationQueryParams, AuthenticationBrowserStorageKeys };
