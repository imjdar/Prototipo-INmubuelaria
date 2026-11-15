import React, { useState } from 'react';
import { X, ShieldCheck, Star, Phone, MessageSquare, MapPin, Search, Building2, UserCheck, ExternalLink, Briefcase } from 'lucide-react';
import { agentService, AgentProfile, CompanyProfile } from '../services/agentService';

interface AgentsDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContactWhatsAppAgent: (agent: AgentProfile) => void;
  onOpenAgentProfile?: (agent: AgentProfile) => void;
}

export const AgentsDirectoryModal: React.FC<AgentsDirectoryModalProps> = ({
  isOpen,
  onClose,
  onContactWhatsAppAgent,
  onOpenAgentProfile
}) => {
  const [activeTab, setActiveTab] = useState<'AGENTS' | 'COMPANIES'>('AGENTS');
  const [selectedSector, setSelectedSector] = useState<string>('ALL');
  const [searchFilter, setSearchFilter] = useState<string>('');

  if (!isOpen) return null;

  const agents = agentService.filterBySector(selectedSector).filter((a) =>
    a.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    a.company.toLowerCase().includes(searchFilter.toLowerCase()) ||
    a.specialtySector.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const companies: CompanyProfile[] = agentService.getAllCompanies().filter((c) =>
    c.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.tradeName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.address.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.description.toLowerCase().includes(searchFilter.toLowerCase())
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
        <div style={{ marginBottom: '1.25rem' }}>
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
            <span>DIRECTORIO DE PROFESIONALES Y EMPRESAS VERIFICADAS</span>
          </div>
          <h2 id="agents-title" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#213145', margin: '0 0 0.5rem 0' }}>
            Expertos Certificados en Quito y sus Valles
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.88rem', margin: 0 }}>
            Contacta a corredores profesionales con licencia notarial DMQ y a las constructoras más prestigiosas del Distrito Metropolitano.
          </p>
        </div>

        {/* Tab Selector: Agentes vs Inmobiliarias */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '2px solid #F1F5F9',
          marginBottom: '1.25rem'
        }}>
          <button
            onClick={() => setActiveTab('AGENTS')}
            style={{
              padding: '0.75rem 1.25rem',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'AGENTS' ? '3px solid #FEA004' : '3px solid transparent',
              color: activeTab === 'AGENTS' ? '#213145' : '#64748B',
              fontWeight: activeTab === 'AGENTS' ? 800 : 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '-2px',
              transition: 'all 0.15s ease'
            }}
          >
            <UserCheck size={18} color={activeTab === 'AGENTS' ? '#FEA004' : '#94A3B8'} />
            <span>Agentes Inmobiliarios ({agents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('COMPANIES')}
            style={{
              padding: '0.75rem 1.25rem',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'COMPANIES' ? '3px solid #FEA004' : '3px solid transparent',
              color: activeTab === 'COMPANIES' ? '#213145' : '#64748B',
              fontWeight: activeTab === 'COMPANIES' ? 800 : 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '-2px',
              transition: 'all 0.15s ease'
            }}
          >
            <Building2 size={18} color={activeTab === 'COMPANIES' ? '#FEA004' : '#94A3B8'} />
            <span>Inmobiliarias & Constructoras ({companies.length})</span>
          </button>
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
              placeholder={activeTab === 'AGENTS' ? "Buscar por nombre, constructora o sector..." : "Buscar constructora, razón social o ubicación..."}
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

          {activeTab === 'AGENTS' && (
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
          )}
        </div>

        {/* Tab 1: AGENTS GRID */}
        {activeTab === 'AGENTS' && (
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
                    onClick={() => onOpenAgentProfile?.(agent)}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #FEA004',
                      flexShrink: 0,
                      cursor: 'pointer'
                    }}
                    title="Ver perfil completo"
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <h3
                        onClick={() => onOpenAgentProfile?.(agent)}
                        style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#213145', cursor: 'pointer' }}
                      >
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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <button
                    onClick={() => onContactWhatsAppAgent(agent)}
                    style={{
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
                    <span>WhatsApp</span>
                  </button>

                  {onOpenAgentProfile && (
                    <button
                      onClick={() => onOpenAgentProfile(agent)}
                      style={{
                        padding: '0.55rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #FEA004',
                        background: '#FFF7ED',
                        color: '#EA580C',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                      title="Ver Ficha Notarial y Catálogo"
                    >
                      <ExternalLink size={14} />
                      <span>Ver Dossier</span>
                    </button>
                  )}

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
                    title="Llamar directamente"
                  >
                    <Phone size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: COMPANIES & DEVELOPERS (PÁGINA 08) */}
        {activeTab === 'COMPANIES' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.25rem' }}>
            {companies.map((comp) => (
              <div
                key={comp.id}
                style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  background: '#FFFFFF',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <img
                    src={comp.logoUrl}
                    alt={comp.tradeName}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '12px',
                      objectFit: 'cover',
                      border: '2px solid #E2E8F0',
                      flexShrink: 0
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#213145' }}>
                        {comp.tradeName}
                      </h3>
                      <span title="Empresa Registrada en Superintendencia y SRI" style={{ color: '#059669', display: 'flex' }}>
                        <ShieldCheck size={16} />
                      </span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 500 }}>
                      {comp.name}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem', fontSize: '0.75rem' }}>
                      <span style={{ background: '#EFF6FF', color: '#1D4ED8', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.7rem' }}>
                        RUC: {comp.ruc}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#EAB308', fontWeight: 700 }}>
                        <Star size={13} fill="#EAB308" />
                        <span>{comp.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p style={{ margin: 0, fontSize: '0.8rem', color: '#475569', lineHeight: 1.45 }}>
                  {comp.description}
                </p>

                {/* Metrics Row */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.5rem',
                  background: '#F8FAFC',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#334155' }}>
                    <Briefcase size={14} color="# FEA004" />
                    <span><strong>{comp.activeProjectsCount}</strong> Proyectos en desarrollo</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#334155' }}>
                    <UserCheck size={14} color="#0284C7" />
                    <span><strong>{comp.agentsCount}</strong> Corredores adscritos</span>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.75rem',
                  color: '#64748B'
                }}>
                  <MapPin size={14} color="#FEA004" style={{ flexShrink: 0 }} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{comp.address}</span>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.open(`https://wa.me/${comp.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hola ${comp.tradeName}, vi sus proyectos en Propiedades Premier y quisiera más información corporativa.`)}`, '_blank');
                      }
                    }}
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
                    <span>Contactar Ventas Corporativas</span>
                  </button>

                  <a
                    href={`tel:${comp.phone}`}
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
        )}
      </div>
    </div>
  );
};
