import React from 'react';
import { UserCheck, Briefcase, ShieldCheck, FileText, Award } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const trustItems = [
    {
      icon: <UserCheck size={22} color="#FEA004" />,
      title: 'Asesoría personalizada'
    },
    {
      icon: <Briefcase size={22} color="#FEA004" />,
      title: 'Amplia cartera de propiedades'
    },
    {
      icon: <ShieldCheck size={22} color="#FEA004" />,
      title: 'Seguridad en todo el proceso'
    },
    {
      icon: <FileText size={22} color="#FEA004" />,
      title: 'Soporte legal y comercial'
    },
    {
      icon: <Award size={22} color="#FEA004" />,
      title: 'Experiencia en el mercado'
    }
  ];

  return (
    <section className="premier-trust-bar-section">
      <div className="trust-bar-inner-container">
        <div className="trust-items-grid">
          {trustItems.map((item, idx) => (
            <div key={idx} className="trust-item-card">
              <div className="trust-icon-circle">
                {item.icon}
              </div>
              <span className="trust-item-title">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
