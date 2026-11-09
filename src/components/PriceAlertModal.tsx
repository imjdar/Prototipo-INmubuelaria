import React, { useState } from 'react';
import { Sector, PropertyType, Property } from '../types/property';
import { alertService } from '../services/alertService';
import { X, Bell, CheckCircle2, ShieldCheck, Mail, Phone } from 'lucide-react';

interface PriceAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetProperty?: Property | null;
  defaultSector?: Sector | 'ALL';
  defaultType?: PropertyType | 'ALL';
  onAlertCreated?: (message: string) => void;
}

export const PriceAlertModal: React.FC<PriceAlertModalProps> = ({
  isOpen,
  onClose,
  targetProperty,
  defaultSector = 'ALL',
  defaultType = 'ALL',
  onAlertCreated
}) => {
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [sector, setSector] = useState<Sector | 'ALL'>(targetProperty ? targetProperty.sector : defaultSector);
  const [propertyType, setPropertyType] = useState<PropertyType | 'ALL'>(targetProperty ? targetProperty.type : defaultType);
  const [maxBudget, setMaxBudget] = useState<number>(targetProperty ? targetProperty.price : 450000);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Por favor ingresa un correo electrónico válido');
      return;
    }

    if (targetProperty) {
      alertService.subscribeToPropertyPriceDrop(
        targetProperty.id,
        targetProperty.title,
        targetProperty.price,
        email,
        phone
      );
      onAlertCreated?.(`🔔 Alerta activada: Te avisaremos de inmediato si ${targetProperty.title} baja de precio.`);
    } else {
      alertService.subscribeToSearchAlert(
        email,
        sector,
        propertyType,
        maxBudget,
        phone
      );
      onAlertCreated?.(`🔔 Alerta de búsqueda guardada: Te notificaremos nuevas propiedades en ${sector === 'ALL' ? 'Quito y Valles' : sector}.`);
    }

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="alert-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '520px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          background: 'linear-gradient(135deg, #213145 0%, #172435 100%)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: '#FEA004',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <Bell size={20} />
            </div>
            <div>
              <h2 id="alert-modal-title" style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF' }}>
                {targetProperty ? 'Alerta de Bajada de Precio' : 'Crear Alerta de Búsqueda'}
              </h2>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#94A3B8' }}>
                {targetProperty ? 'Sé el primero en enterarte si el anunciante reduce el precio' : 'Recibe notificaciones automáticas por correo y WhatsApp'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '6px',
              padding: '0.4rem',
              color: '#FFFFFF',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#DCFCE7',
              color: '#16A34A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <CheckCircle2 size={32} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#213145', marginBottom: '0.5rem' }}>
              ¡Alerta Activada con Éxito!
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', maxWidth: '340px', margin: '0 auto' }}>
              Te notificaremos inmediatamente a <strong>{email}</strong> cuando haya cambios de precio o nuevas oportunidades.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
            {targetProperty && (
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '0.75rem',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <img
                  src={targetProperty.image}
                  alt={targetProperty.title}
                  style={{ width: '56px', height: '56px', borderRadius: '6px', objectFit: 'cover' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase' }}>
                    {targetProperty.sector} · Ref {targetProperty.id}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#213145', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {targetProperty.title}
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#FEA004' }}>
                    ${targetProperty.price.toLocaleString()}
                  </div>
                </div>
              </div>
            )}

            {!targetProperty && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem' }}>
                    Sector Deseado
                  </label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value as any)}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  >
                    <option value="ALL">Todos los Valles y Quito</option>
                    <option value="Cumbayá">Cumbayá</option>
                    <option value="Puembo">Puembo</option>
                    <option value="González Suárez">González Suárez</option>
                    <option value="La Carolina">La Carolina</option>
                    <option value="Tumbaco">Tumbaco</option>
                    <option value="Nayón">Nayón</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem' }}>
                    Tipo de Inmueble
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as any)}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  >
                    <option value="ALL">Todos los tipos</option>
                    <option value="Departamento">Departamentos</option>
                    <option value="Casa">Casas</option>
                    <option value="Penthouse">Penthouses</option>
                    <option value="Suite">Suites</option>
                    <option value="Oficina">Oficinas</option>
                  </select>
                </div>
              </div>
            )}

            {!targetProperty && (
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem' }}>
                  <span>Presupuesto Máximo de Alerta</span>
                  <span style={{ color: '#FEA004', fontWeight: 700 }}>${maxBudget.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="1500000"
                  step="25000"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#FEA004' }}
                />
              </div>
            )}

            {/* Email input */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
                Correo Electrónico (Notificaciones) *
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#94A3B8" style={{ position: 'absolute', left: '10px', top: '12px' }} />
                <input
                  type="email"
                  required
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem 0.6rem 2.25rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.88rem'
                  }}
                />
              </div>
            </div>

            {/* WhatsApp input (optional) */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
                WhatsApp para Alertas Inmediatas (Opcional)
              </label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} color="#94A3B8" style={{ position: 'absolute', left: '10px', top: '12px' }} />
                <input
                  type="tel"
                  placeholder="+593 99 876 5432"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem 0.6rem 2.25rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.88rem'
                  }}
                />
              </div>
            </div>

            {/* Privacy note */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.72rem',
              color: '#64748B',
              marginBottom: '1.25rem'
            }}>
              <ShieldCheck size={14} color="#16A34A" />
              <span>Cero spam. Solo te contactaremos cuando haya cambios reales de precio.</span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                background: '#FEA004',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 12px rgba(254, 160, 4, 0.3)'
              }}
            >
              <Bell size={16} />
              <span>{targetProperty ? 'Activar Alerta de Precio' : 'Guardar y Recibir Alertas'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
