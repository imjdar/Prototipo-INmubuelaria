import React, { useState, useMemo } from 'react';
import { Property, Sector } from '../types/property';
import { HardHat, DollarSign, ArrowRight, MapPin, MessageSquare, Share2 } from 'lucide-react';

interface ProjectsViewProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onContactWhatsApp: (property: Property) => void;
  onOpenSchedule: (property: Property) => void;
  onShare: (property: Property) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  properties,
  onSelectProperty,
  onContactWhatsApp,
  onOpenSchedule,
  onShare
}) => {
  const [selectedStage, setSelectedStage] = useState<'ALL' | 'PLANOS' | 'CONSTRUCCION' | 'ENTREGA_INMEDIATA'>('ALL');
  const [selectedSector, setSelectedSector] = useState<Sector | 'ALL'>('ALL');

  // Interactive Payment Stages Simulator
  const [simulationPrice, setSimulationPrice] = useState<number>(240000);
  const [constructionMonths, setConstructionMonths] = useState<number>(24);
  const [reservePct, setReservePct] = useState<number>(10);
  const [constructionPct, setConstructionPct] = useState<number>(30);

  // Derived simulation calculations
  const reserveAmount = (simulationPrice * reservePct) / 100;
  const constructionAmount = (simulationPrice * constructionPct) / 100;
  const monthlyInstallment = Math.round(constructionAmount / constructionMonths);
  const deliveryBalance = simulationPrice - reserveAmount - constructionAmount;

  // Filter projects
  const projectList = useMemo(() => {
    return properties.filter((p) => {
      const isProject = p.operationType === 'PROYECTO' || p.type === 'Proyecto' || p.title.toLowerCase().includes('residences') || p.title.toLowerCase().includes('torre');
      if (!isProject) return false;

      if (selectedStage !== 'ALL') {
        const stage = p.projectDetails?.stage;
        if (stage !== selectedStage) return false;
      }

      if (selectedSector !== 'ALL' && p.sector !== selectedSector) return false;

      return true;
    });
  }, [properties, selectedStage, selectedSector]);

  return (
    <div className="projects-view-container" style={{ padding: '2rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Hero Banner for Projects */}
      <div style={{
        background: 'linear-gradient(135deg, #152232 0%, #213145 100%)',
        color: '#FFFFFF',
        borderRadius: '16px',
        padding: '2.75rem 2.5rem',
        marginBottom: '2rem',
        position: 'relative',
        boxShadow: '0 12px 30px rgba(33, 49, 69, 0.15)'
      }}>
        <div style={{ maxWidth: '800px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(254, 160, 4, 0.2)',
            color: '#FEA004',
            padding: '0.4rem 0.85rem',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>
            <HardHat size={16} />
            <span>Nuevos Desarrollos Inmobiliarios en Preventa y Construcción</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.85rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Invierte en Proyectos Inmobiliarios de Vanguardia
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#CBD5E1', margin: 0, lineHeight: 1.6 }}>
            Accede a las mejores condiciones de preventa con fideicomisos mercantiles auditados, financiamiento directo 
            durante obra sin intereses y plusvalía garantizada en Cumbayá, Puembo y La Carolina.
          </p>
        </div>
      </div>

      {/* Filter Tabs: Stages and Sectors */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        background: '#FFFFFF',
        padding: '1.25rem 1.5rem',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {[
            { id: 'ALL', label: 'Todos los proyectos' },
            { id: 'PLANOS', label: 'En Planos (Preventa)' },
            { id: 'CONSTRUCCION', label: 'En Construcción' },
            { id: 'ENTREGA_INMEDIATA', label: 'Entrega Inmediata' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStage(tab.id as any)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: selectedStage === tab.id ? '2px solid #FEA004' : '1px solid #E2E8F0',
                background: selectedStage === tab.id ? '#FFF8EE' : '#F8FAFC',
                color: selectedStage === tab.id ? '#FEA004' : '#475569',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>Sector:</label>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value as any)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '0.88rem',
              background: '#FFFFFF'
            }}
          >
            <option value="ALL">Todos los sectores</option>
            <option value="Cumbayá">Cumbayá</option>
            <option value="Puembo">Puembo</option>
            <option value="La Carolina">La Carolina</option>
            <option value="González Suárez">González Suárez</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.75rem', marginBottom: '3rem' }}>
        {projectList.map((project) => {
          const details = project.projectDetails || {
            developerName: 'Premier Constructores',
            stage: 'CONSTRUCCION',
            deliveryDate: '2026',
            progressPercent: 50,
            minDownPaymentPct: 10,
            installmentsCount: 24,
            brochurePdfUrl: '#'
          };

          return (
            <div
              key={project.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              {/* Project Image & Badges */}
              <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                  onClick={() => onSelectProperty(project)}
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{
                    background: '#FEA004',
                    color: '#FFFFFF',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                  }}>
                    {details.stage === 'PLANOS' ? 'En Planos' : details.stage === 'CONSTRUCCION' ? 'En Construcción' : 'Entrega Inmediata'}
                  </span>
                  <span style={{
                    background: 'rgba(33, 49, 69, 0.9)',
                    color: '#FFFFFF',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontWeight: 700
                  }}>
                    Entrega: {details.deliveryDate}
                  </span>
                </div>
              </div>

              {/* Project Body */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#64748B', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <MapPin size={15} color="#FEA004" />
                  <span>{project.microzone}</span>
                </div>

                <h3
                  onClick={() => onSelectProperty(project)}
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#213145',
                    margin: '0 0 0.5rem',
                    cursor: 'pointer',
                    lineHeight: 1.3
                  }}
                >
                  {project.title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 1rem' }}>
                  Desarrollado por <strong style={{ color: '#213145' }}>{details.developerName}</strong>. {project.description.slice(0, 110)}...
                </p>

                {/* Construction Progress Bar */}
                <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '10px', marginBottom: '1rem', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    <span style={{ color: '#475569' }}>Avance de obra auditado:</span>
                    <span style={{ color: '#FEA004' }}>{details.progressPercent}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${details.progressPercent}%`, height: '100%', background: '#FEA004', borderRadius: '4px' }} />
                  </div>
                </div>

                {/* Pricing & Financing Structure */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #F1F5F9' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>Precios desde:</span>
                    <strong style={{ fontSize: '1.45rem', color: '#213145', fontWeight: 800 }}>
                      ${project.price.toLocaleString()} USD
                    </strong>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>
                      Plan 10% Reserva · 30% en Cuotas · 60% Entrega
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <button
                      onClick={() => onContactWhatsApp(project)}
                      title="Contactar desarrollador por WhatsApp"
                      style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '0.6rem', cursor: 'pointer', color: '#166534', display: 'flex', alignItems: 'center' }}
                    >
                      <MessageSquare size={16} />
                    </button>
                    <button
                      onClick={() => onShare(project)}
                      title="Compartir ficha del proyecto"
                      style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '0.6rem', cursor: 'pointer', color: '#475569', display: 'flex', alignItems: 'center' }}
                    >
                      <Share2 size={16} />
                    </button>
                    <button
                      onClick={() => onSelectProperty(project)}
                      style={{
                        background: '#FEA004',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '0.65rem 1rem',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <span>Ver Proyecto</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Off-Plan Payment Simulator */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '2rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#FFF8EE', padding: '0.6rem', borderRadius: '12px', color: '#FEA004' }}>
            <DollarSign size={24} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: '#213145' }}>
              Simulador de Plan de Pagos en Preventa (10 - 30 - 60)
            </h3>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B' }}>
              Calcula tus cuotas mensuales sin intereses durante el periodo de construcción del proyecto
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {/* Controls */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.88rem', fontWeight: 700, color: '#334155' }}>
                <span>Valor del Inmueble en Preventa:</span>
                <span style={{ color: '#213145', fontWeight: 800 }}>${simulationPrice.toLocaleString()} USD</span>
              </div>
              <input
                type="range"
                min="100000"
                max="800000"
                step="10000"
                value={simulationPrice}
                onChange={(e) => setSimulationPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#FEA004' }}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.88rem', fontWeight: 700, color: '#334155' }}>
                <span>Meses de Construcción (Plazo de Cuotas):</span>
                <span style={{ color: '#213145', fontWeight: 800 }}>{constructionMonths} meses</span>
              </div>
              <input
                type="range"
                min="12"
                max="36"
                step="6"
                value={constructionMonths}
                onChange={(e) => setConstructionMonths(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#FEA004' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>
                  % Reserva:
                </label>
                <select
                  value={reservePct}
                  onChange={(e) => setReservePct(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                >
                  <option value={5}>5% Reserva</option>
                  <option value={10}>10% Reserva</option>
                  <option value={15}>15% Reserva</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>
                  % Durante Obra:
                </label>
                <select
                  value={constructionPct}
                  onChange={(e) => setConstructionPct(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                >
                  <option value={20}>20% en Cuotas</option>
                  <option value={30}>30% en Cuotas</option>
                  <option value={40}>40% en Cuotas</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div style={{
            background: '#F8FAFC',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.88rem', color: '#64748B' }}>1. Reserva inicial (10%):</span>
                <strong style={{ fontSize: '1rem', color: '#213145' }}>${reserveAmount.toLocaleString()} USD</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0', marginBottom: '0.75rem' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.88rem', color: '#64748B' }}>2. Durante obra (30% en cuotas):</span>
                  <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>0% interés directo de constructora</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <strong style={{ fontSize: '1.15rem', color: '#FEA004' }}>${monthlyInstallment.toLocaleString()}</strong>
                  <span style={{ fontSize: '0.78rem', color: '#64748B' }}> / mes ({constructionMonths} cuotas)</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.88rem', color: '#64748B' }}>3. Saldo contra entrega (60%):</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Financiable con Crédito Hipotecario / BIESS</span>
                </div>
                <strong style={{ fontSize: '1rem', color: '#213145' }}>${deliveryBalance.toLocaleString()} USD</strong>
              </div>
            </div>

            <button
              onClick={() => onOpenSchedule(projectList[0])}
              style={{
                marginTop: '1.25rem',
                background: '#213145',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              Agendar Cita en Sala de Ventas con Asesor VIP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};