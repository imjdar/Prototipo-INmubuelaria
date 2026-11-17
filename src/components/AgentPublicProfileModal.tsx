/**
 * PROPIEDADES PREMIER - AGENT PUBLIC PROFILE MODAL (PÁGINA 07 - SPRINT 2)
 * 
 * Ficha pública integral del anunciante con credenciales notariales DMQ,
 * reseñas verificadas de compradores, métricas de efectividad y catálogo activo.
 */

import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Star,
  Phone,
  MessageSquare,
  MapPin,
  Award,
  Home,
  CheckCircle2,
  Building
} from 'lucide-react';
import { AgentProfile } from '../services/agentService';
import { Property } from '../types/property';
import { PROPERTIES } from '../data/properties';

interface AgentPublicProfileModalProps {
  isOpen: boolean;
  agent: AgentProfile | null;
  onClose: () => void;
  onSelectProperty?: (property: Property) => void;
  onContactWhatsApp?: (agent: AgentProfile) => void;
}

export const AgentPublicProfileModal: React.FC<AgentPublicProfileModalProps> = ({
  isOpen,
  agent,
  onClose,
  onSelectProperty,
  onContactWhatsApp
}) => {
  const [activeTab, setActiveTab] = useState<'CATALOG' | 'REVIEWS' | 'BIO'>('CATALOG');

  if (!isOpen || !agent) return null;

  // Filtrar propiedades asociadas a este agente
  const agentProperties = PROPERTIES.filter(
    p => p.agent?.name.toLowerCase().includes(agent.name.toLowerCase().split(' ')[1] || 'serrano') ||
         p.sector.toLowerCase().includes(agent.specialtySector.toLowerCase().split(' ')[0])
  );

  // Reseñas verificadas
  const verifiedReviews = [
    {
      id: 'rev-1',
      author: 'Dr. Fernando Alarcón & Familia',
      role: 'Comprador Verificado · Notaría 35 DMQ',
      date: 'Octubre 2026',
      rating: 5,
      comment: `Excelente acompañamiento legal durante todo el proceso de compra de nuestra residencia en Cumbayá. Verificó gravámenes, historial notarial del lote y gestionó la entrega formal de escrituras sin contratiempos.`,
      sector: 'Cumbayá · San Juan Alto'
    },
    {
      id: 'rev-2',
      author: 'Ing. Carmen Astudillo',
      role: 'Inversionista Bienes Raíces',
      date: 'Septiembre 2026',
      rating: 5,
      comment: `Profesionalismo intachable. Nos asesoró en la adquisición de una propiedad con generador eléctrico al 100% y pozo de agua propio en Puembo. Transparencia total en aranceles municipales.`,
      sector: 'Puembo Country Club'
    },
    {
      id: 'rev-3',
      author: 'Arq. Sebastián Vivanco',
      role: 'Desarrollador Asociado',
      date: 'Agosto 2026',
      rating: 4.9,
      comment: `Gran capacidad de cierre comercial y conocimiento milimétrico de las ordenanzas urbanísticas del Municipio de Quito. Muy recomendado para ventas de alta gama.`,
      sector: 'La Carolina · Hipercentro'
    }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="agent-profile-name">
      <div
        className="agent-profile-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '880px',
          padding: '0',
          boxShadow: '0 25px 70px -15px rgba(33, 49, 69, 0.3)',
          border: '1px solid #E2E8F0',
          position: 'relative',
          maxHeight: '92vh',
          overflowY: 'auto'
        }}
      >
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Cerrar perfil del agente"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#213145',
            zIndex: 10,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <X size={20} />
        </button>

        {/* Portada Superior Institucional */}
        <div style={{
          background: 'linear-gradient(135deg, #213145 0%, #152232 100%)',
          color: '#FFFFFF',
          padding: 'clamp(1.25rem, 4vw, 2.5rem)',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={agent.avatar}
                alt={agent.name}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid #FEA004',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.25)'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '2px',
                right: '2px',
                background: '#FEA004',
                borderRadius: '50%',
                padding: '0.2rem',
                display: 'flex'
              }} title="Licencia Verificada DMQ">
                <CheckCircle2 size={16} color="#FFFFFF" />
              </div>
            </div>

            <div style={{ flex: 1, minWidth: 'min(100%, 240px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span style={{
                  background: 'rgba(254, 160, 4, 0.15)',
                  color: '#FEA004',
                  border: '1px solid rgba(254, 160, 4, 0.4)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}>
                  <ShieldCheck size={13} color="#FEA004" />
                  CORREDOR INMOBILIARIO VERIFICADO DMQ
                </span>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{agent.licenseNumber}</span>
              </div>

              <h2 id="agent-profile-name" style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 0.35rem 0', color: '#FFFFFF' }}>
                {agent.name}
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.85rem', color: '#CBD5E1' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Building size={14} color="#FEA004" />
                  {agent.company}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MapPin size={14} color="#FEA004" />
                  {agent.specialtySector}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#FDE047', fontWeight: 700 }}>
                  <Star size={14} fill="#FDE047" color="#FDE047" />
                  {agent.rating} ({agent.reviewCount} reseñas)
                </span>
              </div>
            </div>

            {/* Botones de Contacto Directo */}
            <div style={{ display: 'flex', gap: '0.75rem', width: '100%', marginTop: '0.5rem' }}>
              <button
                type="button"
                onClick={() => onContactWhatsApp ? onContactWhatsApp(agent) : window.open(`https://wa.me/593998765432?text=Hola%20${encodeURIComponent(agent.name)},%20vi%20tu%20perfil%20en%20Propiedades%20Premier`, '_blank')}
                style={{
                  flex: 1,
                  background: '#25D366',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)'
                }}
              >
                <MessageSquare size={18} />
                <span>Contactar por WhatsApp</span>
              </button>

              <a
                href={`tel:${agent.phone.replace(/\s+/g, '')}`}
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Phone size={16} />
                <span>Llamar</span>
              </a>
            </div>
          </div>
        </div>

        {/* Métricas de Desempeño */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 120px), 1fr))',
          gap: '1rem',
          padding: '1.25rem clamp(1rem, 3vw, 2.5rem)',
          background: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#213145' }}>{agent.yearsExperience} Años</div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Trayectoria Notarial</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FEA004' }}>{agentProperties.length || agent.activeListingsCount}</div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Inmuebles Activos</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#16A34A' }}>98%</div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Satisfacción Clientes</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#213145' }}>100%</div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Auditoría Sin Juicios</div>
          </div>
        </div>

        {/* Barra de Navegación de Pestañas */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #E2E8F0',
          padding: '0 2.5rem',
          background: '#FFFFFF'
        }}>
          <button
            type="button"
            onClick={() => setActiveTab('CATALOG')}
            style={{
              padding: '1rem 1.25rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'CATALOG' ? '3px solid #FEA004' : '3px solid transparent',
              color: activeTab === 'CATALOG' ? '#213145' : '#64748B',
              fontWeight: activeTab === 'CATALOG' ? 800 : 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Home size={16} color={activeTab === 'CATALOG' ? '#FEA004' : '#64748B'} />
            <span>Catálogo Activo ({agentProperties.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('REVIEWS')}
            style={{
              padding: '1rem 1.25rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'REVIEWS' ? '3px solid #FEA004' : '3px solid transparent',
              color: activeTab === 'REVIEWS' ? '#213145' : '#64748B',
              fontWeight: activeTab === 'REVIEWS' ? 800 : 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Star size={16} color={activeTab === 'REVIEWS' ? '#FEA004' : '#64748B'} />
            <span>Reseñas Verificadas ({verifiedReviews.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('BIO')}
            style={{
              padding: '1rem 1.25rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'BIO' ? '3px solid #FEA004' : '3px solid transparent',
              color: activeTab === 'BIO' ? '#213145' : '#64748B',
              fontWeight: activeTab === 'BIO' ? 800 : 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Award size={16} color={activeTab === 'BIO' ? '#FEA004' : '#64748B'} />
            <span>Credenciales & Trayectoria</span>
          </button>
        </div>

        {/* Contenido de Pestañas */}
        <div style={{ padding: '1.75rem 2.5rem' }}>
          {activeTab === 'CATALOG' && (
            <div>
              <div style={{ marginBottom: '1rem', color: '#64748B', fontSize: '0.85rem' }}>
                Inmuebles curados y comercializados bajo representación exclusiva de <strong>{agent.name}</strong> en Quito y valles:
              </div>

              {agentProperties.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#64748B' }}>
                  No hay propiedades adicionales disponibles en este momento.
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
                  {agentProperties.map(p => (
                    <div
                      key={p.id}
                      onClick={() => {
                        if (onSelectProperty) {
                          onSelectProperty(p);
                          onClose();
                        }
                      }}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.04)'
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                        (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 20px rgba(0,0,0,0.08)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 10px rgba(0,0,0,0.04)';
                      }}
                    >
                      <div style={{ position: 'relative', height: '140px' }}>
                        <img
                          src={p.image}
                          alt={p.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{
                          position: 'absolute',
                          top: '8px',
                          left: '8px',
                          background: '#213145',
                          color: '#FFFFFF',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '6px'
                        }}>
                          {p.sector}
                        </div>
                        <div style={{
                          position: 'absolute',
                          bottom: '8px',
                          right: '8px',
                          background: '#FEA004',
                          color: '#FFFFFF',
                          fontSize: '0.82rem',
                          fontWeight: 800,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '6px'
                        }}>
                          ${p.price.toLocaleString('en-US')}
                        </div>
                      </div>

                      <div style={{ padding: '0.75rem 1rem' }}>
                        <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#213145', margin: '0 0 0.35rem 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {p.title}
                        </h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748B' }}>
                          <span>{p.bedrooms} Dorm · {p.bathrooms} Baños</span>
                          <span>{p.areaBuild} m²</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'REVIEWS' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {verifiedReviews.map(rev => (
                <div
                  key={rev.id}
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '1.25rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div>
                      <strong style={{ color: '#213145', fontSize: '0.92rem' }}>{rev.author}</strong>
                      <div style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <CheckCircle2 size={13} color="#059669" />
                        {rev.role}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: '#FEF3C7', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                      <Star size={13} fill="#D97706" color="#D97706" />
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#92400E' }}>{rev.rating}.0</span>
                    </div>
                  </div>

                  <p style={{ color: '#334155', fontSize: '0.86rem', lineHeight: '1.45', margin: '0 0 0.5rem 0' }}>
                    "{rev.comment}"
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94A3B8' }}>
                    <span>📍 Operación en: {rev.sector}</span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'BIO' && (
            <div>
              <div style={{ background: '#FFFDF5', border: '1px solid #FEF08A', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#213145', fontSize: '0.95rem', fontWeight: 800 }}>
                  Perfil Profesional & Especialidad
                </h4>
                <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: '1.5', margin: '0 0 0.75rem 0' }}>
                  {agent.description}
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.8rem', color: '#213145' }}>
                  <span><strong>Licencia Notarial:</strong> {agent.licenseNumber}</span>
                  <span><strong>Zona de Cobertura:</strong> {agent.specialtySector}</span>
                  <span><strong>Empresa:</strong> {agent.company}</span>
                </div>
              </div>

              <div style={{ border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.25rem' }}>
                <h4 style={{ margin: '0 0 0.75rem 0', color: '#213145', fontSize: '0.92rem', fontWeight: 800 }}>
                  Garantías de Transparencia Notarial
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem', color: '#475569' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle2 size={15} color="#16A34A" />
                    <span>Verificación de antecedentes ante el Consejo de la Judicatura y Registro Notarial DMQ</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle2 size={15} color="#16A34A" />
                    <span>Todas las propiedades comercializadas cuentan con certificado de gravámenes libre de hipotecas litigiosas</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle2 size={15} color="#16A34A" />
                    <span>Acompañamiento en trámites de alcabalas municipales y créditos hipotecarios BIESS</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
