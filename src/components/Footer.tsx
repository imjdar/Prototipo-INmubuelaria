import React from 'react';
import { Sector } from '../types/property';

interface FooterProps {
  onFilterSector: (sector: Sector) => void;
  onNavigate: (view: 'catalog' | 'split') => void;
}

export const Footer: React.FC<FooterProps> = ({ onFilterSector, onNavigate }) => {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <div className="footer-brand">VALLE & URBE</div>
          <p className="footer-desc">
            PropTech boutique de alto estándar para Quito y sus valles. Curaduría arquitectónica, transparencia de precios, 100% mandatos exclusivos y respaldo jurídico notarial.
          </p>
        </div>

        <div>
          <div className="footer-col-title">Valles & Zonas</div>
          <ul className="footer-links">
            <li>
              <button onClick={() => { onFilterSector('Cumbayá'); onNavigate('catalog'); }}>
                Cumbayá (Clima Cálido & Quintas)
              </button>
            </li>
            <li>
              <button onClick={() => { onFilterSector('Puembo'); onNavigate('catalog'); }}>
                Puembo (Club Ecuestre)
              </button>
            </li>
            <li>
              <button onClick={() => { onFilterSector('González Suárez'); onNavigate('catalog'); }}>
                González Suárez (Skyline)
              </button>
            </li>
            <li>
              <button onClick={() => { onFilterSector('La Carolina'); onNavigate('catalog'); }}>
                La Carolina (Metro & Inversión)
              </button>
            </li>
            <li>
              <button onClick={() => { onFilterSector('Tumbaco'); onNavigate('catalog'); }}>
                Tumbaco (Chaquiñán)
              </button>
            </li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Certeza Jurídica</div>
          <ul className="footer-links">
            <li><button>Registro de la Propiedad DMQ</button></li>
            <li><button>Minutas de Compraventa</button></li>
            <li><button>Aranceles Notariales Quito</button></li>
            <li><button>Crédito Hipotecario BIESS</button></li>
            <li><button>Certificado de Gravámenes</button></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Oficinas Privadas</div>
          <div style={{ fontSize: '0.8rem', color: '#A9A69E', lineHeight: 1.6 }}>
            <strong>Cumbayá:</strong> Av. Pampite & Chimborazo, Plaza Cumbayá, Suite 402.<br /><br />
            <strong>González Suárez:</strong> Av. González Suárez N27-142 y Orellana, PH.<br /><br />
            Atención: Lunes a Sábado con cita previa notariada.
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>© 2026 VALLE & URBE Real Estate Ecuador. Todos los derechos reservados.</div>
        <div>Plataforma PropTech de Nueva Generación · Diseñado en React + TypeScript con Google Stitch Design System</div>
      </div>
    </footer>
  );
};
