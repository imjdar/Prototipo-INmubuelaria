import React, { useState } from 'react';
import { Phone, MapPin, Clock, MessageSquare, CheckCircle2, ChevronDown, ChevronUp, Send, HelpCircle } from 'lucide-react';

interface ContactViewProps {
  onOpenWhatsApp: (message?: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onOpenWhatsApp }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'COMPRA',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const offices = [
    {
      name: 'Sede Valles (Cumbayá)',
      address: 'Scala Shopping Business Center, Torre B, Piso 4, Of. 402',
      sector: 'Cumbayá, Quito - Ecuador',
      phone: '+593 2 389 4500',
      whatsapp: '+593 99 876 5432',
      hours: 'Lunes a Viernes: 08:30 - 18:30 · Sábados: 09:00 - 14:00'
    },
    {
      name: 'Sede Urbana (Quito Norte)',
      address: 'Av. República del Salvador y Shirys, Edificio Premier Plaza, Piso 12',
      sector: 'La Carolina, Quito - Ecuador',
      phone: '+593 2 389 4501',
      whatsapp: '+593 99 876 5433',
      hours: 'Lunes a Viernes: 08:30 - 18:30'
    }
  ];

  const faqs = [
    {
      question: '¿Qué documentos exige la Notaría para comprar o vender un inmueble en Quito?',
      answer: 'Se requiere el Certificado de Gravámenes actualizado del Registro de la Propiedad del DMQ (vigencia 30 días), pago del impuesto predial del año en curso, comprobante de pago de la Alcabala (1%) y Tasa Provincial (0.11%), copia de cédulas y certificados de votación de las partes, y el acta de expensas de la administración si está bajo régimen de Propiedad Horizontal.'
    },
    {
      question: '¿Cómo funciona la precalificación de crédito hipotecario con el BIESS?',
      answer: 'El afiliado o jubilado debe contar con al menos 36 aportaciones (las últimas 12 consecutivas). El BIESS financia hasta el 100% en viviendas de hasta $90.000 (tasa 5.99%) y hasta el 80%-90% en viviendas de mayor valor hasta $460.000 con plazos de hasta 25 años. En Propiedades Premier precalificamos tu cupo en 24 horas hábiles.'
    },
    {
      question: '¿Cómo se custodia y devuelve el depósito de garantía en contratos de arriendo?',
      answer: 'Conforme a la Ley de Inquilinato ecuatoriana, el canon de garantía corresponde habitualmente a dos meses de renta. Se deposita al inicio y se reintegra al finalizar el contrato previa inspección del inventario y verificación de pago de servicios básicos (agua, luz, alícuotas).'
    },
    {
      question: '¿Cuál es la comisión estándar por intermediación inmobiliaria en Quito?',
      answer: 'En ventas, la comisión estándar de mercado en Pichincha es del 3% al 4% + IVA sobre el valor final de cierre, pagada exclusivamente por el vendedor al momento de la firma de la escritura notarial. En arriendos, corresponde a un mes de canon.'
    },
    {
      question: '¿Cómo publico mi propiedad si soy dueño directo sin pagar comisiones altas?',
      answer: 'Puedes publicar de inmediato usando nuestro botón "Publicar propiedad" seleccionando el Plan Esencial ($29 por 3 meses) o el Plan Profesional ($49 con video 9:16 estilo TikTok y tour virtual). Sin comisiones sobre la venta.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitted(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="contact-view-container" style={{ padding: '2rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Hero Banner */}
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
            <MessageSquare size={16} />
            <span>Atención al Cliente, Soporte Notarial y Sedes Físicas</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.85rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Estamos Aquí para Asesorarte en Todo Momento
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#CBD5E1', margin: 0, lineHeight: 1.6 }}>
            Visítanos en nuestras oficinas en Cumbayá y Quito Norte o contáctanos por WhatsApp, teléfono o formulario. 
            Te brindamos atención personalizada para compra, venta, renta o trámites notariales.
          </p>
        </div>
      </div>

      {/* Main Grid: Form & Physical Offices */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', marginBottom: '3.5rem' }}>
        {/* Contact Form */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '2rem',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#213145', margin: '0 0 0.5rem' }}>
            Envíanos un Mensaje Directo
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748B', margin: '0 0 1.5rem' }}>
            Completa tus datos y un asesor patrimonial te contactará de inmediato.
          </p>

          {isSubmitted ? (
            <div style={{
              background: '#ECFDF5',
              border: '2px solid #10B981',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <CheckCircle2 size={44} color="#10B981" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ margin: '0 0 0.5rem', color: '#065F46', fontSize: '1.25rem', fontWeight: 800 }}>
                ¡Mensaje Enviado con Éxito!
              </h3>
              <p style={{ margin: '0 0 1.25rem', color: '#047857', fontSize: '0.88rem', lineHeight: 1.5 }}>
                Gracias, <strong>{formData.name}</strong>. Hemos recibido tu consulta sobre <strong>{formData.subject}</strong>. Te contactaremos a la brevedad posible.
              </p>
              <button
                onClick={() => {
                  onOpenWhatsApp(`Hola Propiedades Premier, envié una consulta por la web sobre ${formData.subject}. Mi nombre es ${formData.name}.`);
                }}
                style={{
                  background: '#10B981',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                Abrir en WhatsApp Directo
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                  Nombre completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej. Andrés Maldonado"
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                    Teléfono celular *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tu@email.com"
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

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                  Motivo de contacto
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
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
                  <option value="COMPRA">Quiero comprar una propiedad en Quito / Valles</option>
                  <option value="RENTA">Estoy buscando una propiedad en arriendo</option>
                  <option value="PUBLICAR">Deseo publicar y vender mi inmueble</option>
                  <option value="SERVICIOS_NOTARIALES">Necesito saneamiento legal o avalúo</option>
                  <option value="PROYECTOS">Interés en proyectos en preventa</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                  Mensaje o consulta
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe qué tipo de propiedad o trámite necesitas..."
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
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 12px rgba(254, 160, 4, 0.25)'
                }}
              >
                <Send size={16} />
                <span>Enviar Consulta Ahora</span>
              </button>
            </form>
          )}
        </div>

        {/* Physical Offices & Quick Contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {offices.map((off, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '1.75rem',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{ background: '#FFF8EE', color: '#FEA004', padding: '0.5rem', borderRadius: '10px' }}>
                  <MapPin size={20} />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#213145' }}>
                  {off.name}
                </h3>
              </div>

              <p style={{ fontSize: '0.9rem', color: '#475569', margin: '0 0 0.25rem', fontWeight: 600 }}>
                {off.address}
              </p>
              <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'block', marginBottom: '1rem' }}>
                {off.sector}
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.85rem', color: '#334155', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={15} color="#FEA004" />
                  <span>{off.phone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={15} color="#64748B" />
                  <span>{off.hours}</span>
                </div>
              </div>

              <button
                onClick={() => onOpenWhatsApp(`Hola Propiedades Premier, deseo comunicarme con la ${off.name}.`)}
                style={{
                  width: '100%',
                  background: '#213145',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.65rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <MessageSquare size={15} />
                <span>Chatear con esta Sede</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Accordion FAQ Section */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '2.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ background: '#FFF8EE', padding: '0.6rem', borderRadius: '12px', color: '#FEA004' }}>
            <HelpCircle size={24} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#213145' }}>
              Preguntas Frecuentes (FAQ) Inmobiliarias y Notariales
            </h2>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B' }}>
              Respuestas oficiales a las dudas más comunes sobre compra, venta, financiamiento y arriendo en Quito
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: isOpen ? '#F8FAFC' : '#FFFFFF',
                  transition: 'background 0.15s ease'
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: '100%',
                    padding: '1.1rem 1.25rem',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    cursor: 'pointer',
                    gap: '1rem'
                  }}
                >
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#213145' }}>
                    {faq.question}
                  </span>
                  {isOpen ? <ChevronUp size={18} color="#FEA004" /> : <ChevronDown size={18} color="#94A3B8" />}
                </button>

                {isOpen && (
                  <div style={{ padding: '0 1.25rem 1.25rem', fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, borderTop: '1px solid #F1F5F9' }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};