import React, { useState } from 'react';
import { X, Phone, Mail, MapPin, MessageSquare, ChevronDown, ChevronUp, Send, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWhatsApp: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onOpenWhatsApp
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sector, setSector] = useState('Cumbayá');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  if (!isOpen) return null;

  const faqs = [
    {
      q: '¿Cómo garantizan que las propiedades tengan saneamiento legal en Quito?',
      a: 'Cada inmueble publicado pasa por un proceso de revisión catastral y verificación con el Registro de la Propiedad del DMQ para asegurar la inexistencia de gravámenes, hipotecas no informadas o prohibiciones de enajenar.'
    },
    {
      q: '¿Cómo funciona la precalificación con crédito hipotecario BIESS?',
      a: 'Nuestros asesores te ayudan a recopilar el IRM municipal, avalúo y cédula catastral para que el trámite ante el BIESS se resuelva en el menor tiempo posible a la tasa preferencial del 5.99% anual.'
    },
    {
      q: '¿Qué costo tiene publicar si soy propietario directo?',
      a: 'Contamos con el Plan Esencial de $29 USD que incluye publicación completa por 3 meses, hasta 40 fotos HD, pin en mapa interactivo y contacto directo con compradores sin comisiones ocultas.'
    },
    {
      q: '¿Puedo agendar una visita virtual guiada o presencial?',
      a: 'Sí. A través de nuestro botón de WhatsApp o el botón "Agendar Visita" en la ficha de cada propiedad, coordinamos citas personalizadas tanto presenciales como videollamadas con el agente asignado.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        onClose();
      }, 2000);
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="contact-title">
      <div
        className="contact-modal-card"
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
          aria-label="Cerrar contacto"
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
            <MessageSquare size={13} color="#FEA004" />
            <span>CONTACTO & SOPORTE · PROPIEDADES PREMIER</span>
          </div>
          <h2 id="contact-title" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#213145', margin: '0 0 0.5rem 0' }}>
            Estamos Listos para Asesorarte en Quito y sus Valles
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.88rem', margin: 0 }}>
            Déjanos tu requerimiento o comunícate al instante por WhatsApp con nuestro equipo de conserjería inmobiliaria.
          </p>
        </div>

        {/* 2 Column Layout: Form & Info */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
          {/* Form */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 800, color: '#213145' }}>
              Envíanos un Mensaje
            </h3>

            {isSent ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle2 size={48} color="#16A34A" style={{ margin: '0 auto 0.75rem auto' }} />
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: '#213145' }}>
                  ¡Mensaje Enviado con Éxito!
                </h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748B' }}>
                  Un asesor de Propiedades Premier te contactará en menos de 15 minutos.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                    Nombre y Apellido *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Carlos Morales"
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="carlos@correo.com"
                      style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                      Teléfono / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+593 99..."
                      style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                    Sector de Interés
                  </label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', background: '#FFF' }}
                  >
                    <option value="Cumbayá">Cumbayá</option>
                    <option value="Puembo">Puembo</option>
                    <option value="González Suárez">González Suárez</option>
                    <option value="La Carolina">La Carolina</option>
                    <option value="Tumbaco">Tumbaco</option>
                    <option value="Nayón">Nayón</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                    Mensaje o Requerimiento Específico
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Busco una casa con generador eléctrico en urbanización con doble garita..."
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    background: '#FEA004',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.7rem',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: isSubmitting ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    boxShadow: '0 4px 12px rgba(254, 160, 4, 0.4)'
                  }}
                >
                  <Send size={15} />
                  <span>{isSubmitting ? 'Enviando...' : 'Enviar Mensaje a Asesoría'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Quick Contact & FAQs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Quick Contact Box */}
            <div style={{ background: '#213145', color: '#FFFFFF', borderRadius: '16px', padding: '1.25rem' }}>
              <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', color: '#FEA004' }}>
                Atención Directa & Oficinas
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.8rem', color: '#E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} color="#FEA004" />
                  <span>Av. Interoceánica Km 11.5, Edificio Scala Business, Cumbayá</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={16} color="#FEA004" />
                  <span>+593 2 389 4000 · PBX Quito</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={16} color="#FEA004" />
                  <span>contacto@propiedadespremier.ec</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenWhatsApp();
                }}
                style={{
                  width: '100%',
                  marginTop: '1rem',
                  background: '#25D366',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.65rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <MessageSquare size={16} />
                <span>Abrir Chat WhatsApp Inmediato</span>
              </button>
            </div>

            {/* Accordion FAQs */}
            <div style={{ border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1rem', background: '#FFFFFF' }}>
              <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem', color: '#213145', fontWeight: 800 }}>
                Preguntas Frecuentes (FAQ)
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {faqs.map((faq, idx) => (
                  <div key={idx} style={{ borderBottom: idx < faqs.length - 1 ? '1px solid #F1F3F5' : 'none', paddingBottom: '0.4rem' }}>
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        padding: '0.4rem 0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: '#213145',
                        cursor: 'pointer'
                      }}
                    >
                      <span>{faq.q}</span>
                      {expandedFaq === idx ? <ChevronUp size={16} color="#FEA004" /> : <ChevronDown size={16} color="#94A3B8" />}
                    </button>
                    {expandedFaq === idx && (
                      <p style={{ margin: '0.2rem 0 0.5rem 0', fontSize: '0.75rem', color: '#64748B', lineHeight: 1.4 }}>
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
