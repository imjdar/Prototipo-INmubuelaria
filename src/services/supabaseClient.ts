/**
 * PROPIEDADES PREMIER - SUPABASE CLIENT INTEGRATION
 * 
 * Gestiona la autenticación con Supabase (Google OAuth, Email/Password),
 * base de datos PostgreSQL en la nube y almacenamiento Supabase Storage.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export class SupabaseService {
  private static instance: SupabaseService;
  private client: SupabaseClient | null = null;

  private constructor() {
    this.initClient();
  }

  public static getInstance(): SupabaseService {
    if (!SupabaseService.instance) {
      SupabaseService.instance = new SupabaseService();
    }
    return SupabaseService.instance;
  }

  public getConfig(): SupabaseConfig {
    if (typeof window !== 'undefined') {
      const storedUrl = localStorage.getItem('premier_supabase_url');
      const storedKey = localStorage.getItem('premier_supabase_key');
      if (storedUrl && storedKey) {
        return { url: storedUrl, anonKey: storedKey };
      }
    }

    const env = (import.meta as unknown as { env: Record<string, string> }).env || {};
    return {
      url: env.VITE_SUPABASE_URL || 'https://awsvnqfbyopcqtdhmmnx.supabase.co',
      anonKey: env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3c3ZucWZieW9wY3F0ZGhtbW54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4MzM1NDIsImV4cCI6MjA5MDQwOTU0Mn0.dLLLBAigTC1E4qefBrYCcZ5VEYlk7A-loH4zxIqujsQ'
    };
  }

  public saveConfig(url: string, anonKey: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('premier_supabase_url', url.trim());
      localStorage.setItem('premier_supabase_key', anonKey.trim());
      this.initClient();
    }
  }

  public isConfigured(): boolean {
    const { url, anonKey } = this.getConfig();
    return Boolean(url && anonKey && url.includes('supabase.co'));
  }

  private initClient(): void {
    const { url, anonKey } = this.getConfig();
    if (url && anonKey && url.includes('supabase.co')) {
      try {
        this.client = createClient(url, anonKey);
      } catch (err) {
        console.error('Error al inicializar Supabase:', err);
        this.client = null;
      }
    } else {
      this.client = null;
    }
  }

  public getClient(): SupabaseClient | null {
    if (!this.client && this.isConfigured()) {
      this.initClient();
    }
    return this.client;
  }

  /**
   * Inicio de sesión con Google OAuth a través de Supabase
   */
  public async signInWithGoogle(): Promise<{ error: Error | null }> {
    const client = this.getClient();
    if (!client) {
      return { error: new Error('Supabase no está configurado con VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.') };
    }

    try {
      const { error } = await client.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined
        }
      });
      return { error: error ? new Error(error.message) : null };
    } catch (err) {
      return { error: err as Error };
    }
  }

  /**
   * Subida de imágenes a Supabase Storage Bucket ('properties')
   */
  public async uploadPropertyImage(file: File, path: string): Promise<{ publicUrl: string | null; error: Error | null }> {
    const client = this.getClient();
    if (!client) {
      return { publicUrl: null, error: new Error('Supabase Storage no configurado.') };
    }

    try {
      const cleanPath = path.replace(/^\/+/, '');
      const { error } = await client.storage.from('properties').upload(cleanPath, file, {
        upsert: true,
        contentType: file.type
      });

      if (error) {
        return { publicUrl: null, error: new Error(error.message) };
      }

      const { data } = client.storage.from('properties').getPublicUrl(cleanPath);
      return { publicUrl: data.publicUrl, error: null };
    } catch (err) {
      return { publicUrl: null, error: err as Error };
    }
  }
}

export const supabaseService = SupabaseService.getInstance();
