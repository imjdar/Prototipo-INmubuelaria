import React, { useState } from 'react';
import { X, ShieldCheck, Star, Phone, MessageSquare, MapPin, Search } from 'lucide-react';
import { agentService, AgentProfile } from '../services/agentService';

interface AgentsDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContactWhatsAppAgent: (agent: AgentProfile) => void;
}

export const AgentsDirectoryModal: React.FC<AgentsDirectoryModalProps> = ({
  isOpen,
  onClose,
  onContactWhatsAppAgent
}) => {
  const [selectedSector, setSelectedSector] = useState<string>('ALL');
  const [searchFilter, setSearchFilter] = useState<string>('');

  if (!isOpen) return null;

  const agents = agentService.filterBySector(selectedSector).filter((a) =>
    a.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    a.company.toLowerCase().includes(searchFilter.toLowerCase()) ||
    a.specialtySector.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="agents-title">
      <div
        className="agents-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '920px',
          padding: '2rem 2.5rem',
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
          aria-label="Cerrar directorio de agentes"
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
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: '#FFF7ED',
            color: '#FEA004',
            border: '1px solid #FED7AA',
            padding: '0.25rem 0.75rem',
            borderRadius: '999px',
            fontSize: '0.72rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            marginBottom: '0.5rem'
          }}>
            <ShieldCheck size={14} color="#FEA004" />
            <span>DIRECTORIO DE AGENTES E INMOBILIARIAS VERIFICADAS</span>
          </div>
          <h2 id="agents-title" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#213145', margin: '0 0 0.5rem 0' }}>
            Expertos Certificados en Quito y sus Valles
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.88rem', margin: 0 }}>
            Contacta a corredores profesionales y constructoras con licencia DMQ vigente y trayectoria comprobada.
          </p>
        </div>

        {/* Search & Sector Filters */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: '1.5rem',
          background: '#F8FAFC',
          padding: '0.75rem 1rem',
          borderRadius: '12px',
          border: '1px solid #E2E8F0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flex: 1, minWidth: '220px' }}>
            <Search size={16} color="#94A3B8" />
            <input
              type="text"
              placeholder="Buscar por nombre, constructora o sector..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{
                width: '100%',
                border: 'none',
                background: 'none',
                outline: 'none',
                fontSize: '0.85rem',
                color: '#213145'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {['ALL', 'Cumbayá', 'La Carolina', 'Tumbaco'].map((sector) => (
              <button
                key={sector}
                onClick={() => setSelectedSector(sector)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '999px',
                  border: 'none',
                  background: selectedSector === sector ? '#FEA004' : '#FFFFFF',
                  color: selectedSector === sector ? '#FFFFFF' : '#475569',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: selectedSector === sector ? '#FEA004' : '#CBD5E1',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {sector === 'ALL' ? 'Todos los Sectores' : sector}
              </button>
            ))}
          </div>
        </div>

        {/* Agents Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.25rem' }}>
          {agents.map((agent) => (
            <div
              key={agent.id}
              style={{
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '1.25rem',
                background: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #FEA004',
                    flexShrink: 0
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#213145' }}>
                      {agent.name}
                    </h3>
                    {agent.isVerified && (
                      <span title="Agente con Licencia Notarial DMQ Verificada" style={{ color: '#0284C7', display: 'flex' }}>
                        <ShieldCheck size={16} />
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
                    {agent.company}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#EAB308', fontSize: '0.75rem', fontWeight: 700 }}>
                      <Star size={13} fill="#EAB308" />
                      <span>{agent.rating}</span>
                    </div>
                    <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>({agent.reviewCount} reseñas)</span>
                    <span style={{ fontSize: '0.7rem', color: '#CBD5E1' }}>•</span>
                    <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 700 }}>{agent.activeListingsCount} en cartera</span>
                  </div>
                </div>
              </div>

              <p style={{ margin: 0, fontSize: '0.78rem', color: '#475569', lineHeight: 1.4 }}>
                {agent.description}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '0.5rem',
                borderTop: '1px solid #F1F3F5',
                fontSize: '0.72rem',
                color: '#64748B'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <MapPin size={13} color="#FEA004" />
                  <span>{agent.specialtySector}</span>
                </div>
                <span>{agent.licenseNumber}</span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                <button
                  onClick={() => onContactWhatsAppAgent(agent)}
                  style={{
                    flex: 1,
                    background: '#25D366',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.55rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <MessageSquare size={14} />
                  <span>Contactar WhatsApp</span>
                </button>

                <a
                  href={`tel:${agent.phone}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.55rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    background: '#FFFFFF',
                    color: '#213145',
                    fontSize: '0.8rem',
                    textDecoration: 'none',
                    fontWeight: 600
                  }}
                >
                  <Phone size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
