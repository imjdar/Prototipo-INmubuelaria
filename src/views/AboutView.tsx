import React from 'react';
import { ShieldCheck, Award, CheckCircle2, Building, HeartHandshake, ArrowRight, Briefcase, MessageSquare, Compass } from 'lucide-react';

interface AboutViewProps {
  onOpenContact: () => void;
  onOpenWhatsApp: () => void;
  onNavigateToCatalog: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onOpenContact,
  onOpenWhatsApp,
  onNavigateToCatalog
}) => {
  const teamMembers = [
    {
      name: 'Ing. Mateo Serrano',
      role: 'Director General & Especialista Patrimonial',
      license: 'Lic. Registro Notarial DMQ #0492',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
      bio: 'Especialista en estructuración de patrimonios inmobiliarios en los Valles de Cumbayá y Puembo con más de 12 años liderando transacciones de alto nivel.'
    },
    {
      name: 'Abg. Carlos Vintimilla',
      role: 'Director del Departamento Notarial & Legal',
      license: 'Lic. Notarial DMQ #1084 · Foro de Abogados Pichincha',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      bio: 'Ex-consultor notarial del Distrito Metropolitano de Quito. Máxima autoridad en saneamiento de títulos, levantamiento de hipotecas y fideicomisos.'
    },
    {
      name: 'Arq. Valentina Morales',
      role: 'Directora de Arquitectura y Avalúos Comerciales',
      license: 'Perito Acreditada SuperBancos Ecuador #PE-789',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
      bio: 'Perito avaluadora con maestría en Valuación Inmobiliaria. Ha tasado más de 800 inmuebles en el DMQ y Valles con rigurosidad técnica.'
    },
    {
      name: 'Lic. Sofía Paredes',
      role: 'Coordinadora de Experiencia y Atención al Cliente',
      license: 'Certificación Internacional CRM Inmobiliario',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
      bio: 'Dedicada al acompañamiento personalizado de familias y extranjeros en su proceso de reubicación y compra en Ecuador.'
    }
  ];

  const milestones = [
    { number: '+1.200', label: 'Transacciones Notariadas con Éxito' },
    { number: '$180M+', label: 'Volumen Transaccionado en Quito y Valles' },
    { number: '100%', label: 'Inmuebles con Títulos Auditados y Saneados' },
    { number: '4.9 / 5', label: 'Calificación Promedio en Google Reviews' }
  ];

  const testimonials = [
    {
      quote: 'Gracias a Propiedades Premier logramos comprar nuestra casa en Cumbayá con crédito BIESS en tiempo récord. El saneamiento notarial fue impecable.',
      author: 'Dr. Fernando Salazar & Familia',
      sector: 'San Juan Alto, Cumbayá'
    },
    {
      quote: 'Como inversionista en La Carolina, la asesoría en Cap Rate y reglamentos de Airbnb me dio la certeza que necesitaba para rentabilizar mi suite.',
      author: 'Ing. Esteban Carrión',
      sector: 'República del Salvador, Quito'
    },
    {
      quote: 'Vendí mi departamento en El Bosque en menos de 45 días usando el Plan Profesional con video 9:16 y tour virtual. Atención de primer nivel.',
      author: 'Econ. Mariana Echeverría',
      sector: 'El Bosque, Quito Norte'
    }
  ];

  return (
    <div className="about-view-container" style={{ padding: '2rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #213145 0%, #152232 100%)',
        color: '#FFFFFF',
        borderRadius: '16px',
        padding: '3rem 2.5rem',
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
            <span>Quiénes Somos · Trayectoria y Respaldo Institucional</span>
          </div>
          <h1 style={{ fontSize: '2.6rem', fontWeight: 800, margin: '0 0 1rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Transformando el Mercado Inmobiliario de Quito y sus Valles
          </h1>
          <p style={{ fontSize: '1.08rem', color: '#CBD5E1', margin: '0 0 1.5rem', lineHeight: 1.6 }}>
            Desde 2012, Propiedades Premier se ha consolidado como la plataforma líder en corretaje, valuación y saneamiento legal 
            de bienes raíces en Pichincha. Unimos tecnología interactiva de vanguardia con la más rigurosa seguridad jurídica.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={onNavigateToCatalog}
              style={{
                background: '#FEA004',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.75rem 1.4rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}
            >
              <Compass size={16} />
              <span>Explorar Propiedades en Venta</span>
            </button>
            <button
              onClick={onOpenWhatsApp}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '0.75rem 1.4rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}
            >
              <MessageSquare size={16} color="#22C55E" />
              <span>Contactar por WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Numerical Milestones */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '3rem'
      }}>
        {milestones.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              padding: '1.75rem 1.5rem',
              border: '1px solid #E2E8F0',
              textAlign: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
            }}
          >
            <span style={{ display: 'block', fontSize: '2.2rem', fontWeight: 900, color: '#FEA004', marginBottom: '0.35rem', letterSpacing: '-0.02em' }}>
              {item.number}
            </span>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#334155' }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Misión, Visión y Valores */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
        <div style={{ background: '#FFFFFF', borderRadius: '14px', padding: '2rem', border: '1px solid #E2E8F0' }}>
          <div style={{ background: '#FFF8EE', color: '#FEA004', padding: '0.6rem', borderRadius: '10px', display: 'inline-flex', marginBottom: '1rem' }}>
            <Award size={24} />
          </div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#213145', margin: '0 0 0.75rem' }}>
            Nuestra Misión
          </h3>
          <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
            Proporcionar a compradores, vendedores e inversionistas una experiencia transparente, segura y eficiente, 
            eliminando la incertidumbre jurídica mediante auditorías notariales rigurosas y herramientas digitales interactivas.
          </p>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: '14px', padding: '2rem', border: '1px solid #E2E8F0' }}>
          <div style={{ background: '#EEF2FF', color: '#4F46E5', padding: '0.6rem', borderRadius: '10px', display: 'inline-flex', marginBottom: '1rem' }}>
            <Building size={24} />
          </div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#213145', margin: '0 0 0.75rem' }}>
            Nuestra Visión
          </h3>
          <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
            Ser el ecosistema inmobiliario de referencia en el Ecuador, reconocido por democratizar el acceso a información 
            patrimonial verídica, convalidada por el Registro de la Propiedad del DMQ y respaldada por los mejores desarrolladores.
          </p>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: '14px', padding: '2rem', border: '1px solid #E2E8F0' }}>
          <div style={{ background: '#ECFDF5', color: '#10B981', padding: '0.6rem', borderRadius: '10px', display: 'inline-flex', marginBottom: '1rem' }}>
            <HeartHandshake size={24} />
          </div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#213145', margin: '0 0 0.75rem' }}>
            Nuestros Valores
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              'Verdad Notarial: Cero publicaciones sin verificación previa de títulos',
              'Transparencia Total: Precios claros sin sobreprecios ocultos',
              'Innovación Tecnológica: Gemelos 3D, videos 9:16 y mapas de microzonas',
              'Ética Profesional: Acreditación y licencias registradas en Pichincha'
            ].map((val, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#334155', marginBottom: '0.5rem' }}>
                <CheckCircle2 size={16} color="#10B981" style={{ flexShrink: 0 }} />
                <span>{val}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Equipo Directivo */}
      <div style={{ marginBottom: '3.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FEA004', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Liderazgo Técnico y Notarial
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#213145', margin: '0.35rem 0 0.5rem' }}>
            Conoce a Nuestro Equipo Directivo
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
            Profesionales colegiados con licencias oficiales y amplia trayectoria en el mercado inmobiliario ecuatoriano.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
              }}
            >
              <img
                src={member.avatar}
                alt={member.name}
                style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem', border: '3px solid #FEA004' }}
              />
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#213145', margin: '0 0 0.25rem' }}>
                {member.name}
              </h4>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FEA004', marginBottom: '0.35rem' }}>
                {member.role}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#64748B', background: '#F1F5F9', padding: '0.25rem 0.5rem', borderRadius: '6px', marginBottom: '0.75rem' }}>
                {member.license}
              </span>
              <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '2.5rem', border: '1px solid #E2E8F0', marginBottom: '3.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#213145', textAlign: 'center', margin: '0 0 2rem' }}>
          Lo que dicen nuestros clientes en Quito y Valles
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {testimonials.map((t, idx) => (
            <div key={idx} style={{ background: '#FFFFFF', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E2E8F0' }}>
              <div style={{ color: '#FEA004', fontSize: '1.25rem', marginBottom: '0.5rem' }}>★★★★★</div>
              <p style={{ fontSize: '0.9rem', color: '#334155', fontStyle: 'italic', lineHeight: 1.5, margin: '0 0 1rem' }}>
                "{t.quote}"
              </p>
              <div>
                <strong style={{ display: 'block', fontSize: '0.88rem', color: '#213145' }}>{t.author}</strong>
                <span style={{ fontSize: '0.78rem', color: '#64748B' }}>{t.sector}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trabaja con Nosotros Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #FFF8EE 0%, #FFF3DC 100%)',
        borderRadius: '16px',
        padding: '2.5rem',
        border: '1px solid #FED7AA',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem'
      }}>
        <div style={{ maxWidth: '600px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#C2410C', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            <Briefcase size={16} />
            <span>Bolsa de Empleo y Red de Agentes</span>
          </div>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#7C2D12', margin: '0 0 0.5rem' }}>
            ¿Eres un Corredor Inmobiliario Colegiado?
          </h3>
          <p style={{ fontSize: '0.95rem', color: '#9A3412', margin: 0, lineHeight: 1.5 }}>
            Únete a la red inmobiliaria más exclusiva de Quito. Ofrecemos herramientas de IA, tours Matterport 3D 
            subvencionados y comisiones competitivas.
          </p>
        </div>

        <button
          onClick={onOpenContact}
          style={{
            background: '#FEA004',
            color: '#FFFFFF',
            border: 'none',
            padding: '0.85rem 1.75rem',
            borderRadius: '10px',
            fontWeight: 800,
            fontSize: '0.95rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 15px rgba(254, 160, 4, 0.3)'
          }}
        >
          <span>Postular como Agente</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};