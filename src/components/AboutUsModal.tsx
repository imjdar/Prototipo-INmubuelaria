import React from 'react';
import { X, Award, ShieldCheck, Users, Target, HeartHandshake } from 'lucide-react';
import { PremierLogo } from './PremierLogo';

interface AboutUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutUsModal: React.FC<AboutUsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="about-title">
      <div
        className="about-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '860px',
          padding: '2.5rem',
          boxShadow: '0 25px 60px -15px rgba(33, 49, 69, 0.25)',
          border: '1px solid #E2E8F0',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <button
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Cerrar ventana Quiénes Somos"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#F1F3F5',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#213145'
          }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', marginBottom: '0.75rem' }}>
            <PremierLogo size="md" variant="dark" />
          </div>
          <h2 id="about-title" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#213145', margin: '0.25rem 0 0.5rem 0' }}>
            Quiénes Somos · Trayectoria & Excelencia Inmobiliaria
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.92rem', maxWidth: '620px', margin: '0 auto', lineHeight: 1.5 }}>
            Somos el portal inmobiliario líder especializado en Quito y sus valles (Cumbayá, Puembo, Tumbaco, Nayón y el Hipercentro Metropolitano).
          </p>
        </div>

        {/* Misión, Visión, Valores Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '14px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
              <Target size={20} color="#FEA004" />
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#213145' }}>Nuestra Misión</h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
              Conectar a compradores, inquilinos e inversionistas con propiedades rigurosamente verificadas en Quito y sus valles, garantizando seguridad jurídica y transparencia total.
            </p>
          </div>

          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
              <Award size={20} color="#FEA004" />
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#213145' }}>Nuestra Visión</h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
              Consolidarnos como el ecosistema PropTech de referencia en el Ecuador, impulsando la digitalización de la compraventa con video vertical, IA y verificación notarial.
            </p>
          </div>

          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
              <HeartHandshake size={20} color="#FEA004" />
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#213145' }}>Nuestros Valores</h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
              Ética notarial inquebrantable, rigor en la curaduría arquitectónica, innovación digital continua y trato personalizado con cada cliente.
            </p>
          </div>
        </div>

        {/* Certificaciones y Respaldos */}
        <div style={{
          background: '#213145',
          borderRadius: '16px',
          padding: '1.5rem 2rem',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <ShieldCheck size={22} color="#FEA004" />
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FEA004' }}>
                Certificaciones y Respaldos DMQ
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#CBD5E1', maxWidth: '520px', lineHeight: 1.4 }}>
              Todas nuestras publicaciones para compraventa son auditadas con certificados de gravámenes emitidos por el Registro de la Propiedad del Distrito Metropolitano de Quito.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.4rem 0.85rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700 }}>
              ✓ Alianza Notarial DMQ
            </span>
            <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.4rem 0.85rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700 }}>
              ✓ Registro ACBIR Pichincha
            </span>
          </div>
        </div>

        {/* Equipo de Liderazgo */}
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#213145', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={20} color="#FEA004" />
            <span>Equipo Directivo</span>
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80"
                alt="Mateo Serrano"
                style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #FEA004' }}
              />
              <div>
                <strong style={{ fontSize: '0.88rem', color: '#213145', display: 'block' }}>Ing. Mateo Serrano</strong>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Director Comercial Valles</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                alt="Dra. Sofía Carrillo"
                style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #FEA004' }}
              />
              <div>
                <strong style={{ fontSize: '0.88rem', color: '#213145', display: 'block' }}>Dra. Sofía Carrillo</strong>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Directora Jurídica & Notarial</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80"
                alt="Arq. Juan Diego Alarcón"
                style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #FEA004' }}
              />
              <div>
                <strong style={{ fontSize: '0.88rem', color: '#213145', display: 'block' }}>Arq. Juan Diego Alarcón</strong>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Curador de Arquitectura</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
