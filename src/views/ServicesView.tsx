import React, { useState } from 'react';
import { ShieldCheck, Scale, FileCheck, Camera, TrendingUp, Landmark, CheckCircle2, Phone, ArrowRight, Clock, Award } from 'lucide-react';

interface ServicesViewProps {
  onOpenWhatsApp: (message?: string) => void;
  onOpenResources: (tab?: 'calculators' | 'blog' | 'documents') => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  onOpenWhatsApp,
  onOpenResources
}) => {
  const [selectedService, setSelectedService] = useState<string>('notarial');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [propertySector, setPropertySector] = useState<string>('Cumbayá');
  const [serviceNotes, setServiceNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const servicesList = [
    {
      id: 'notarial',
      title: 'Saneamiento Notarial y Legal DMQ',
      icon: Scale,
      tag: 'Seguridad Jurídica 100%',
      shortDesc: 'Levantamiento de gravámenes, certificado de expensas, pago de alcabalas e inscripción en el Registro de la Propiedad.',
      features: [
        'Estudio de títulos de 15 años de historial registral',
        'Cálculo exacto de Alcabala (1%) y Tasa Provincial (0.11%)',
        'Minutas notariales redactadas por abogados especializados',
        'Inscripción ágil en el Registro de la Propiedad del DMQ'
      ],
      timeframe: '3 a 7 días hábiles'
    },
    {
      id: 'hipotecario',
      title: 'Precalificación Hipotecaria BIESS y Banca',
      icon: Landmark,
      tag: 'Tasa desde 5.99%',
      shortDesc: 'Gestión integral de tu crédito con el BIESS (tasa preferencial) o bancos privados (Banco Pichincha, Produbanco).',
      features: [
        'Análisis de capacidad de endeudamiento familiar',
        'Validación de requisitos técnicos del inmueble ante el BIESS',
        'Coordinación directa con peritos avaluadores bancarios',
        'Acompañamiento hasta el desembolso final'
      ],
      timeframe: 'Precalificación en 24 horas'
    },
    {
      id: 'avaluo',
      title: 'Avalúo Comercial Certificado',
      icon: FileCheck,
      tag: 'Peritos Acreditados',
      shortDesc: 'Peritaje técnico del valor real de mercado sustentado en método de costo de reposición y comparables de zona.',
      features: [
        'Informe técnico con firma de perito calificado por la SuperBancos',
        'Inspección in situ de acabados, instalaciones y estado estructural',
        'Análisis de plusvalía y proyección del sector',
        'Validez para trámites bancarios, notariales y sucesiones'
      ],
      timeframe: '48 a 72 horas'
    },
    {
      id: 'multimedia',
      title: 'Tour Virtual 3D Matterport y Dron 4K',
      icon: Camera,
      tag: 'Marketing de Alto Impacto',
      shortDesc: 'Escaneo tridimensional Matterport Pro 3, planos esquemáticos y video aéreo en 4K para ventas rápidas.',
      features: [
        'Gemelo digital interactivo accesible 24/7 desde cualquier país',
        'Plano de planta acotado en PDF de alta precisión',
        'Tomas de vuelo con dron certificado para parcelas y vistas',
        'Edición vertical 9:16 optimizada para TikTok e Instagram Reels'
      ],
      timeframe: '24 a 48 horas tras rodaje'
    },
    {
      id: 'inversion',
      title: 'Asesoría en Rentabilidad y Renta Corta',
      icon: TrendingUp,
      tag: 'Cap Rate Optimizado',
      shortDesc: 'Estrategias de inversión inmobiliaria para maximizar retornos por alquiler tradicional y plataformas tipo Airbnb.',
      features: [
        'Modelado financiero de flujo de caja y Cap Rate neto',
        'Auditoría de reglamentos de propiedad horizontal para Airbnb',
        'Proyección de ocupación turística en La Carolina y Centro Histórico',
        'Administración y gestión de inquilinos premium'
      ],
      timeframe: 'Asesoría personalizada inmediata'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;
    setIsSubmitted(true);
  };

  return (
    <div className="services-view-container" style={{ padding: '2rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Hero Header */}
      <div style={{
        background: 'linear-gradient(135deg, #213145 0%, #152232 100%)',
        color: '#FFFFFF',
        borderRadius: '16px',
        padding: '2.75rem 2.5rem',
        marginBottom: '2.5rem',
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
            <ShieldCheck size={16} />
            <span>Servicios Profesionales con Respaldo Notarial DMQ</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.85rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Servicios Inmobiliarios y Notariales Integrales
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#CBD5E1', margin: 0, lineHeight: 1.6 }}>
            Desde el estudio exhaustivo de gravámenes y minutas de compraventa hasta la precalificación de tu crédito BIESS 
            y levantamiento 3D Matterport. Tu patrimonio protegido por expertos con más de 14 años en Quito y sus valles.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {servicesList.map((svc) => {
          const Icon = svc.icon;
          const isSelected = selectedService === svc.id;

          return (
            <div
              key={svc.id}
              onClick={() => setSelectedService(svc.id)}
              style={{
                background: '#FFFFFF',
                borderRadius: '14px',
                padding: '1.75rem',
                border: isSelected ? '2px solid #FEA004' : '1px solid #E2E8F0',
                boxShadow: isSelected ? '0 8px 25px rgba(254, 160, 4, 0.12)' : '0 2px 10px rgba(0,0,0,0.03)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{
                  background: isSelected ? '#FFF8EE' : '#F8FAFC',
                  color: isSelected ? '#FEA004' : '#213145',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  display: 'inline-flex'
                }}>
                  <Icon size={26} />
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  background: '#EEF2FF',
                  color: '#4F46E5',
                  padding: '0.3rem 0.65rem',
                  borderRadius: '20px'
                }}>
                  {svc.tag}
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#213145', margin: '0 0 0.5rem' }}>
                {svc.title}
              </h3>

              <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 1.25rem' }}>
                {svc.shortDesc}
              </p>

              <div style={{ marginTop: 'auto' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem' }}>
                  {svc.features.map((feat, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#334155', marginBottom: '0.45rem' }}>
                      <CheckCircle2 size={15} color="#10B981" style={{ flexShrink: 0 }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #F1F5F9', fontSize: '0.8rem' }}>
                  <span style={{ color: '#64748B', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Clock size={14} />
                    <span>{svc.timeframe}</span>
                  </span>
                  <span style={{ color: '#FEA004', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span>Solicitar</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Booking / Consultation Request Form */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '2.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem',
        alignItems: 'center'
      }}>
        <div>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FEA004', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Atención Inmediata
          </span>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#213145', margin: '0.4rem 0 1rem', lineHeight: 1.25 }}>
            Solicita tu Asesoría o Peritaje Notarial
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Un especialista de nuestro equipo legal y notarial se comunicará contigo en menos de 2 horas hábiles 
            para coordinar la revisión de documentos o visita técnica.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Award size={20} color="#FEA004" />
              <span style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 600 }}>
                Respaldado por abogados ex-notarios del DMQ
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShieldCheck size={20} color="#10B981" />
              <span style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 600 }}>
                Certificados con validez oficial ante notarías y juzgados
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Phone size={20} color="#3B82F6" />
              <span style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 600 }}>
                Línea directa WhatsApp: +593 99 876 5432
              </span>
            </div>
          </div>

          <button
            onClick={() => onOpenResources('calculators')}
            style={{
              background: '#F1F5F9',
              color: '#213145',
              border: '1px solid #CBD5E1',
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span>Abrir Calculadora Hipotecaria BIESS</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div>
          {isSubmitted ? (
            <div style={{
              background: '#ECFDF5',
              border: '2px solid #10B981',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <CheckCircle2 size={48} color="#10B981" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ margin: '0 0 0.5rem', color: '#065F46', fontSize: '1.3rem', fontWeight: 800 }}>
                ¡Solicitud Registrada con Éxito!
              </h3>
              <p style={{ margin: '0 0 1.25rem', color: '#047857', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Gracias, <strong>{clientName}</strong>. Hemos recibido tu requerimiento de <strong>{servicesList.find(s => s.id === selectedService)?.title}</strong> para {propertySector}. Nos comunicaremos al {clientPhone}.
              </p>
              <button
                onClick={() => {
                  onOpenWhatsApp(`Hola Propiedades Premier, solicité el servicio de ${servicesList.find(s => s.id === selectedService)?.title} para ${propertySector}.`);
                }}
                style={{
                  background: '#10B981',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>Abrir WhatsApp Ahora</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                  Servicio requerido
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    background: '#FFFFFF',
                    boxSizing: 'border-box'
                  }}
                >
                  {servicesList.map((svc) => (
                    <option key={svc.id} value={svc.id}>{svc.title}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                    Nombre y Apellido *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ej. Carlos Morales"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.75rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                    Teléfono celular *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+593 99..."
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.75rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.75rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                    Sector del inmueble
                  </label>
                  <select
                    value={propertySector}
                    onChange={(e) => setPropertySector(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.75rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                      background: '#FFFFFF',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Cumbayá">Cumbayá</option>
                    <option value="Puembo">Puembo</option>
                    <option value="La Carolina">La Carolina</option>
                    <option value="González Suárez">González Suárez</option>
                    <option value="Tumbaco">Tumbaco</option>
                    <option value="Nayón">Nayón</option>
                    <option value="Quito Norte">Quito Norte</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                  Detalles adicionales de la consulta
                </label>
                <textarea
                  rows={3}
                  value={serviceNotes}
                  onChange={(e) => setServiceNotes(e.target.value)}
                  placeholder="Ej. Necesito revisar si la propiedad tiene gravámenes pendientes o hipotecas antes de firmar promesa..."
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: '#FEA004',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.85rem',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(254, 160, 4, 0.25)',
                  transition: 'background 0.15s ease'
                }}
              >
                Enviar Solicitud de Servicio
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};