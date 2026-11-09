import React from 'react';
import { UserCheck, Briefcase, ShieldCheck, FileText, Award } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const trustItems = [
    {
      icon: <UserCheck size={20} color="#FEA004" />,
      title: 'Asesoría personalizada'
    },
    {
      icon: <Briefcase size={20} color="#FEA004" />,
      title: 'Amplia cartera de propiedades'
    },
    {
      icon: <ShieldCheck size={20} color="#FEA004" />,
      title: 'Seguridad en todo el proceso'
    },
    {
      icon: <FileText size={20} color="#FEA004" />,
      title: 'Soporte legal y comercial'
    },
    {
      icon: <Award size={20} color="#FEA004" />,
      title: 'Experiencia en el mercado'
    }
  ];

  return (
    <section className="trust-bar-section" style={{
      background: '#FFFFFF',
      borderTop: '1px solid #E2E8F0',
      borderBottom: '1px solid #E2E8F0',
      padding: '2.5rem 1.5rem',
      margin: '3rem 0 0'
    }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        alignItems: 'center'
      }}>
        {trustItems.map((item, idx) => (
          <div key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.5rem'
          }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: '#FFF7ED',
              border: '1px solid #FED7AA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {item.icon}
            </div>
            <span style={{
              fontSize: '0.88rem',
              fontWeight: 700,
              color: '#213145',
              lineHeight: 1.3
            }}>
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
