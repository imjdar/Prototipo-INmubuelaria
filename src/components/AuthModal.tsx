import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  Eye, 
  EyeOff, 
  KeyRound
} from 'lucide-react';
import { UserRole } from '../types/auth';
import { authService } from '../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<UserRole>('BUYER');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');

  if (!isOpen) return null;

  const handleDemoLogin = async (key: 'agent' | 'buyer' | 'admin') => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const { user } = await authService.loginWithDemo(key);
      onLoginSuccess(user);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Error al iniciar sesión de prueba');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple' | 'facebook') => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const { user } = await authService.socialLogin(provider);
      onLoginSuccess(user);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Error en autenticación social');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (mode === 'login') {
        if (!email) throw new Error('Por favor ingresa tu correo electrónico');
        const { user } = await authService.login({ email, password });
        onLoginSuccess(user);
      } else {
        if (!fullName || !email) throw new Error('Completa los campos obligatorios');
        const { user } = await authService.register({
          fullName,
          email,
          password,
          phone: phone || '+593 99 000 0000',
          role,
          companyName: role === 'AGENT' ? companyName : undefined,
          licenseNumber: role === 'AGENT' ? licenseNumber : undefined
        });
        onLoginSuccess(user);
      }
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Ocurrió un error al procesar tu solicitud');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="auth-modal-card" 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '520px',
          padding: '2rem',
          boxShadow: '0 25px 60px -15px rgba(23, 26, 28, 0.25)',
          border: '1px solid #E5E7EB',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Cerrar modal"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#F3F4F6',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#4B5563',
            transition: 'all 0.2s'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'rgba(212, 175, 55, 0.12)', 
            padding: '0.35rem 0.85rem', 
            borderRadius: '999px',
            color: '#B89230',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '0.75rem'
          }}>
            <ShieldCheck size={14} />
            <span>Acceso Seguro · Sprint 1 Auth & RBAC</span>
          </div>
          <h2 style={{ 
            fontFamily: 'Playfair Display, serif', 
            fontSize: '1.75rem', 
            color: '#171A1C', 
            margin: '0 0 0.5rem 0' 
          }}>
            {mode === 'login' ? 'Bienvenido a Valle & Urbe' : 'Crear Cuenta en Valle & Urbe'}
          </h2>
          <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: 0 }}>
            {mode === 'login' 
              ? 'Ingresa a tu portafolio privado, alertas de inversión y gestión notarial.' 
              : 'Únete a la plataforma PropTech contemporánea de Quito y sus valles.'}
          </p>
        </div>

        {/* Quick Demo Access Bar */}
        <div style={{
          background: '#F9FAFB',
          border: '1px solid #E5E7EB',
          borderRadius: '10px',
          padding: '0.85rem 1rem',
          marginBottom: '1.25rem'
        }}>
          <div style={{ 
            fontSize: '0.75rem', 
            fontWeight: 700, 
            color: '#374151', 
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}>
            <Sparkles size={13} color="#D4AF37" />
            <span>ACCESO RÁPIDO PARA EVALUACIÓN (DEMO ROLES):</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => handleDemoLogin('agent')}
              style={{
                background: '#FFFFFF',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                padding: '0.5rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#1F2937',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.15s'
              }}
              title="Ing. Mateo Serrano (Lic. Notarial #0492)"
            >
              💼 Agente Pro
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('buyer')}
              style={{
                background: '#FFFFFF',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                padding: '0.5rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#1F2937',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.15s'
              }}
              title="Dra. Sofía Carrillo (Inversionista)"
            >
              💎 Compradora
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              style={{
                background: '#FFFFFF',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                padding: '0.5rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#1F2937',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.15s'
              }}
              title="Admin Central DMQ"
            >
              ⚡ SuperAdmin
            </button>
          </div>
        </div>

        {/* OAuth 2.0 Social Logins (PRO-007) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              width: '100%',
              padding: '0.65rem 1rem',
              background: '#FFFFFF',
              border: '1px solid #D1D5DB',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#374151',
              cursor: 'pointer',
              transition: 'background 0.15s'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Continuar con Google</span>
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
            <button
              type="button"
              onClick={() => handleSocialLogin('apple')}
              disabled={isLoading}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.6rem',
                background: '#000000',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.815rem',
                fontWeight: 600,
                color: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.03-7.61-7.79-11.73-14.28-5.77-9.06-10.15-19.12-13.14-30.17-3-11.05-4.5-21.49-4.5-31.33 0-14.54 3.73-26.68 11.2-36.43 7.46-9.75 16.79-14.77 27.97-15.06 4.91 0 10.22 1.3 15.93 3.9 5.71 2.6 9.4 4.02 11.08 4.25 2.11-.47 5.92-1.97 11.44-4.5 5.51-2.53 10.4-3.73 14.65-3.6 11.25.75 20.31 4.77 27.18 12.06-9.9 5.99-14.74 14.28-14.53 24.87.21 8.24 3.4 15.11 9.58 20.61 6.18 5.5 13.39 8.68 21.63 9.55-2.02 6.06-4.45 12.35-7.3 18.89zM119.22 33.15c0-6.9 2.47-13.25 7.42-19.04 4.95-5.79 11.11-9.29 18.49-10.51.35 1.5.53 2.94.53 4.32 0 6.78-2.58 13.24-7.74 19.38-5.16 6.14-11.4 9.68-18.7 10.63v-4.78z"/>
              </svg>
              <span>Apple ID</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('facebook')}
              disabled={isLoading}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.6rem',
                background: '#1877F2',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.815rem',
                fontWeight: 600,
                color: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          margin: '1.25rem 0',
          gap: '0.75rem' 
        }}>
          <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }}></div>
          <span style={{ fontSize: '0.75rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            o con correo profesional
          </span>
          <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }}></div>
        </div>

        {/* Tab Selector (Login vs Register) */}
        <div style={{
          display: 'flex',
          background: '#F3F4F6',
          borderRadius: '8px',
          padding: '4px',
          marginBottom: '1.25rem'
        }}>
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMessage(null); }}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '6px',
              border: 'none',
              background: mode === 'login' ? '#FFFFFF' : 'transparent',
              color: mode === 'login' ? '#111827' : '#6B7280',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: mode === 'login' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s'
            }}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setErrorMessage(null); }}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '6px',
              border: 'none',
              background: mode === 'register' ? '#FFFFFF' : 'transparent',
              color: mode === 'register' ? '#111827' : '#6B7280',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: mode === 'register' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s'
            }}
          >
            Crear Cuenta
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div style={{
            background: '#FEE2E2',
            border: '1px solid #FCA5A5',
            color: '#B91C1C',
            padding: '0.65rem 0.85rem',
            borderRadius: '8px',
            fontSize: '0.815rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <X size={15} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {mode === 'register' && (
            <>
              {/* Role Selection (RBAC) */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.35rem' }}>
                  Tipo de Perfil en la Plataforma:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setRole('BUYER')}
                    style={{
                      padding: '0.65rem',
                      borderRadius: '8px',
                      border: role === 'BUYER' ? '2px solid #D4AF37' : '1px solid #E5E7EB',
                      background: role === 'BUYER' ? '#FEFBF0' : '#FFFFFF',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '0.825rem', color: '#1F2937' }}>
                      Comprador / Inversionista
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#6B7280' }}>
                      Búsqueda VIP y calculadoras
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('AGENT')}
                    style={{
                      padding: '0.65rem',
                      borderRadius: '8px',
                      border: role === 'AGENT' ? '2px solid #D4AF37' : '1px solid #E5E7EB',
                      background: role === 'AGENT' ? '#FEFBF0' : '#FFFFFF',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '0.825rem', color: '#1F2937' }}>
                      Agente / Inmobiliaria
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#6B7280' }}>
                      Publicar inmuebles y captar leads
                    </div>
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
                  Nombre y Apellido
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color="#9CA3AF" style={{ position: 'absolute', left: '10px', top: '10px' }} />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej. Mateo Serrano"
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.6rem 0.6rem 2.2rem',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
                  Teléfono / WhatsApp (Ecuador +593)
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} color="#9CA3AF" style={{ position: 'absolute', left: '10px', top: '10px' }} />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+593 99 876 5432"
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.6rem 0.6rem 2.2rem',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
              </div>

              {/* Agent specifics */}
              {role === 'AGENT' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
                      Inmobiliaria / Firma
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Ej. Valle & Urbe"
                      style={{
                        width: '100%',
                        padding: '0.55rem',
                        border: '1px solid #D1D5DB',
                        borderRadius: '8px',
                        fontSize: '0.825rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
                      Registro Notarial / Licencia
                    </label>
                    <input
                      type="text"
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                      placeholder="Lic. #0492 DMQ"
                      style={{
                        width: '100%',
                        padding: '0.55rem',
                        border: '1px solid #D1D5DB',
                        borderRadius: '8px',
                        fontSize: '0.825rem'
                      }}
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {/* Email */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
              Correo Electrónico
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="#9CA3AF" style={{ position: 'absolute', left: '10px', top: '10px' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu.nombre@empresa.com"
                style={{
                  width: '100%',
                  padding: '0.6rem 0.6rem 0.6rem 2.2rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '0.875rem'
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151' }}>
                Contraseña
              </label>
              {mode === 'login' && (
                <span 
                  onClick={() => alert('Para fines del prototipo de evaluación, puedes ingresar con cualquier contraseña o usar los accesos rápidos de prueba superiores.')}
                  style={{ fontSize: '0.72rem', color: '#B89230', cursor: 'pointer' }}
                >
                  ¿Olvidaste tu contraseña?
                </span>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#9CA3AF" style={{ position: 'absolute', left: '10px', top: '10px' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{
                  width: '100%',
                  padding: '0.6rem 2.2rem 0.6rem 2.2rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '0.875rem'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '10px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#9CA3AF',
                  padding: 0
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              marginTop: '0.5rem',
              width: '100%',
              padding: '0.75rem',
              background: '#171A1C',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'background 0.15s'
            }}
          >
            {isLoading ? (
              <span>Procesando...</span>
            ) : (
              <>
                <KeyRound size={16} color="#D4AF37" />
                <span>{mode === 'login' ? 'Acceder a mi Portafolio' : 'Crear Mi Cuenta Segura'}</span>
              </>
            )}
          </button>
        </form>

        {/* Security Footer Note */}
        <div style={{
          marginTop: '1.25rem',
          textAlign: 'center',
          fontSize: '0.7rem',
          color: '#9CA3AF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.35rem'
        }}>
          <ShieldCheck size={13} color="#10B981" />
          <span>Sesión encriptada con rotación de JWT · PostgreSQL 16 PostGIS</span>
        </div>
      </div>
    </div>
  );
};
