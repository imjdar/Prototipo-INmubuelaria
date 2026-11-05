import React, { useState } from 'react';
import { Property } from '../types/property';
import { X, CheckCircle } from 'lucide-react';

interface ScheduleModalProps {
  isOpen: boolean;
  property: Property | null;
  onClose: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  property,
  onClose
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [mode, setMode] = useState('Presencial en la Propiedad');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Cerrar">
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle size={48} style={{ color: 'var(--color-success)', margin: '0 auto 1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              ¡Visita Agendada con Éxito!
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              El Asesor Patrimonial asignado ({property?.agent.name}) se contactará vía WhatsApp para confirmar los permisos de acceso y el pase de garita.
            </p>
          </div>
        ) : (
          <>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '0.4rem' }}>
              Agendar Visita Notarial Privada
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Coordinación de pase vehicular para garita y entrega de dossier notarial impreso.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Nombre Completo
                </label>
                <input
                  type="text"
                  className="filter-select"
                  style={{ background: '#fff' }}
                  required
                  placeholder="Ej. Dr. Carlos Mantilla"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Número de WhatsApp
                </label>
                <input
                  type="tel"
                  className="filter-select"
                  style={{ background: '#fff' }}
                  required
                  placeholder="+593 99 ..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Fecha Sugerida
                  </label>
                  <input
                    type="date"
                    className="filter-select"
                    style={{ background: '#fff' }}
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Modalidad
                  </label>
                  <select
                    className="filter-select"
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                  >
                    <option>Presencial en la Propiedad</option>
                    <option>Videollamada con Tour 3D</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="btn-search-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Confirmar Agendamiento
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
