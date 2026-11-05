import React from 'react';
import { Property } from '../types/property';
import { MessageSquare, X } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  property: Property | null;
  onClose: () => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  property,
  onClose
}) => {
  if (!isOpen) return null;

  const agentName = property ? property.agent.name : 'Concierge Patrimonial';
  const agentPhone = property ? property.agent.phone : '+593998765432';
  const propertyTitle = property
    ? `${property.title} (${property.sector}) - $${property.price.toLocaleString()} USD [Ref: ${property.id}]`
    : 'Consultoría Inmobiliaria General en Quito & Valles';

  const message = `Hola ${agentName}, le escribo a través de VALLE & URBE. Deseo recibir el dossier notarial y coordinar una visita para: ${propertyTitle}.`;
  const cleanPhone = agentPhone.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Cerrar">
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{
            width: '44px',
            height: '44px',
            background: '#25D366',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <MessageSquare size={22} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 600 }}>
              Asesoría Inmediata por WhatsApp
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Línea Privada Directa: {agentPhone}
            </div>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-surface-subtle)',
          padding: '1rem',
          borderRadius: '3px',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          marginBottom: '1.5rem',
          borderLeft: '3px solid #25D366'
        }}>
          <div style={{
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            fontWeight: 700,
            marginBottom: '0.25rem'
          }}>
            Mensaje Preformateado con ID Notarial:
          </div>
          <div style={{ fontStyle: 'italic' }}>"{message}"</div>
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Al hacer clic abajo, se abrirá tu aplicación de WhatsApp con el mensaje estructurado listo para enviar al asesor asignado.
        </p>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp-agent"
          style={{ textDecoration: 'none', padding: '0.85rem 1rem' }}
        >
          <span>Abrir WhatsApp Ahora</span>
        </a>
      </div>
    </div>
  );
};
