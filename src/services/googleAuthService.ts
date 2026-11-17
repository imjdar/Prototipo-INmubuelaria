/**
 * PROPIEDADES PREMIER - GOOGLE IDENTITY SERVICES (GIS)
 * 
 * Implementación oficial de Google OAuth 2.0 para autenticación real
 * con cuentas @gmail.com o Google Workspace sin dependencias pesadas.
 */

export interface GoogleJwtPayload {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
  given_name?: string;
  family_name?: string;
  iat: number;
  exp: number;
  jti: string;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string; select_by?: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          prompt: (notification?: (notification: unknown) => void) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              type?: 'standard' | 'icon';
              theme?: 'outline' | 'filled_blue' | 'filled_black';
              size?: 'large' | 'medium' | 'small';
              text?: 'signin_with' | 'signup_with' | 'continue_with';
              shape?: 'rectangular' | 'pill' | 'circle' | 'square';
              logo_alignment?: 'left' | 'center';
              width?: number;
              locale?: string;
            }
          ) => void;
          disableAutoSelect: () => void;
        };
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (tokenResponse: { access_token?: string; error?: string }) => void;
          }) => { requestAccessToken: () => void };
        };
      };
    };
  }
}

export class GoogleAuthService {
  private static instance: GoogleAuthService;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): GoogleAuthService {
    if (!GoogleAuthService.instance) {
      GoogleAuthService.instance = new GoogleAuthService();
    }
    return GoogleAuthService.instance;
  }

  public isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * Obtiene el Client ID configurado en variables de entorno o localStorage
   */
  public getClientId(): string {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('premier_google_client_id');
      if (stored) return stored;
    }
    const env = (import.meta as unknown as { env: Record<string, string> }).env || {};
    return env.VITE_GOOGLE_CLIENT_ID || '';
  }

  /**
   * Permite guardar un Client ID en caliente desde la interfaz
   */
  public setClientId(clientId: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('premier_google_client_id', clientId.trim());
      this.isInitialized = false;
    }
  }

  /**
   * Decodifica de forma segura el JWT que entrega Google
   */
  public decodeCredential(jwtToken: string): GoogleJwtPayload | null {
    try {
      const base64Url = jwtToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload) as GoogleJwtPayload;
    } catch (err) {
      console.error('Error al decodificar token de Google:', err);
      return null;
    }
  }

  /**
   * Inicializa el SDK de Google Identity Services con el callback receptor
   */
  public initialize(onSuccess: (payload: GoogleJwtPayload, credential: string) => void): boolean {
    if (typeof window === 'undefined' || !window.google?.accounts?.id) {
      console.warn('Google Identity Services SDK aún no ha cargado.');
      return false;
    }

    const clientId = this.getClientId();
    if (!clientId) {
      console.info('Google Client ID no configurado. Utilice VITE_GOOGLE_CLIENT_ID en .env o ingréselo en la app.');
      return false;
    }

    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (res) => {
          if (res.credential) {
            const decoded = this.decodeCredential(res.credential);
            if (decoded) {
              onSuccess(decoded, res.credential);
            }
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true
      });
      this.isInitialized = true;
      return true;
    } catch (err) {
      console.error('Error al inicializar Google Identity Services:', err);
      return false;
    }
  }

  /**
   * Dispara el Popup oficial de Google One-Tap o Selección de Cuenta
   */
  public promptLogin(onSuccess: (payload: GoogleJwtPayload, credential: string) => void): void {
    const ready = this.initialize(onSuccess);
    if (ready && window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    }
  }

  /**
   * Renderiza el botón oficial nativo de Google en un contenedor del DOM
   */
  public renderGoogleButton(
    container: HTMLElement,
    onSuccess: (payload: GoogleJwtPayload, credential: string) => void,
    options?: { width?: number; text?: 'signin_with' | 'signup_with' | 'continue_with' }
  ): boolean {
    const ready = this.initialize(onSuccess);
    if (!ready || !window.google?.accounts?.id) return false;

    window.google.accounts.id.renderButton(container, {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      text: options?.text || 'continue_with',
      shape: 'rectangular',
      logo_alignment: 'left',
      width: options?.width || 340,
      locale: 'es'
    });
    return true;
  }
}

export const googleAuthService = GoogleAuthService.getInstance();
