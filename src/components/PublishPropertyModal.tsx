import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Bot, 
  Sparkles, 
  Lock, 
  FileCheck,
  Building,
  CheckCircle2,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { User, UserSubscription } from '../types/auth';
import { Sector, PropertyType } from '../types/property';

interface PublishPropertyModalProps {
  isOpen: boolean;
  user: User | null;
  subscription: UserSubscription | null;
  onClose: () => void;
  onRequireAuth: () => void;
  onPropertyPublished: (newProperty: any) => void;
}

export const PublishPropertyModal: React.FC<PublishPropertyModalProps> = ({
  isOpen,
  user,
  subscription,
  onClose,
  onRequireAuth,
  onPropertyPublished
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isAiScanning, setIsAiScanning] = useState<boolean>(false);
  const [aiScanSuccess, setAiScanSuccess] = useState<boolean>(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [sector, setSector] = useState<Sector>('Cumbayá');
  const [microzone, setMicrozone] = useState('');
  const [type, setType] = useState<PropertyType>('Casa');
  const [price, setPrice] = useState<number>(350000);
  const [areaBuild, setAreaBuild] = useState<number>(240);
  const [areaLot, setAreaLot] = useState<number>(450);
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(3.5);
  const [parking, setParking] = useState<number>(2);

  // Quito 2026 Features
  const [hasGenerator, setHasGenerator] = useState<boolean>(true);
  const [hasMetro, setHasMetro] = useState<boolean>(false);
  const [hasDoubleGate, setHasDoubleGate] = useState<boolean>(true);
  const [isValleyClimate, setIsValleyClimate] = useState<boolean>(true);
  const [biessEligible, setBiessEligible] = useState<boolean>(true);
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  // If user is not logged in, prompt authentication
  if (!user) {
    return (
      <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
        <div
          className="publish-modal-card"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '480px',
            padding: '2.5rem',
            textAlign: 'center',
            boxShadow: '0 25px 60px -15px rgba(23, 26, 28, 0.25)',
            border: '1px solid #E5E7EB',
            position: 'relative'
          }}
        >
          <button
            onClick={onClose}
            className="modal-close-btn"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: '#F3F4F6',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>

          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(212, 175, 55, 0.15)',
            color: '#B89230',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto'
          }}>
            <Lock size={32} />
          </div>

          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: '#171A1C', margin: '0 0 0.5rem 0' }}>
            Inicia Sesión para Publicar
          </h3>
          <p style={{ color: '#6B7280', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Para garantizar la autenticidad y el Sello Notarial DMQ, todas las propiedades deben estar asociadas a un agente o propietario verificado.
          </p>

          <button
            onClick={() => {
              onClose();
              onRequireAuth();
            }}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#171A1C',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <Sparkles size={16} color="#D4AF37" />
            <span>Iniciar Sesión o Crear Cuenta</span>
          </button>
        </div>
      </div>
    );
  }

  const handleSimulateAiAuditAndPublish = () => {
    setIsAiScanning(true);
    setTimeout(() => {
      setIsAiScanning(false);
      setAiScanSuccess(true);
      setTimeout(() => {
        const newProperty = {
          id: `VU-${sector.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
          title: title || `Residencia Exclusiva en ${sector}`,
          sector,
          microzone: microzone || `${sector} Central`,
          type,
          price: Number(price),
          areaBuild: Number(areaBuild),
          areaLot: Number(areaLot),
          bedrooms: Number(bedrooms),
          bathrooms: Number(bathrooms),
          parking: Number(parking),
          hoaFee: 150,
          elevation: sector === 'Cumbayá' ? 2200 : sector === 'Puembo' ? 2150 : 2850,
          temperature: sector === 'Cumbayá' || sector === 'Puembo' ? '22°C Templado' : '17°C Andino',
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          subPhotos: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
          ],
          features: {
            hasGenerator,
            hasMetro,
            hasDoubleGate,
            isValleyClimate,
            biessEligible,
            isAirbnb: false,
            hasMatterport: true
          },
          legalStatus: 'Certificado de Gravámenes DMQ al día (Auditado por Bot Guardián)',
          description: description || 'Propiedad contemporánea verificada con planta eléctrica y filtros de seguridad.',
          agent: {
            name: user.fullName,
            role: user.role === 'AGENT' ? 'Agente Inmobiliario Verificado' : 'Propietario Particular',
            license: user.licenseNumber || 'Lic. DMQ Registrada',
            phone: user.phone,
            avatar: user.avatarUrl
          },
          logistics: {
            scalaShopping: '8 min',
            usfq: '10 min',
            aeropuerto: '15 min',
            quitoCentro: '20 min'
          },
          coordinates: { x: 50, y: 50 }
        };
        onPropertyPublished(newProperty);
        onClose();
      }, 1200);
    }, 1800);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="publish-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '720px',
          padding: '2rem',
          boxShadow: '0 25px 60px -15px rgba(23, 26, 28, 0.25)',
          border: '1px solid #E5E7EB',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Cerrar publicador"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#F3F4F6',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#4B5563'
          }}
        >
          <X size={18} />
        </button>

        {/* Stepper Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(212, 175, 55, 0.12)',
            color: '#B89230',
            padding: '0.25rem 0.75rem',
            borderRadius: '999px',
            fontSize: '0.72rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            marginBottom: '0.5rem'
          }}>
            <Building size={13} />
            <span>Asistente de Publicación · 5 Pasos (PRO-022)</span>
          </div>
          <h2 style={{ margin: 0, fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', color: '#171A1C' }}>
            Publicar Inmueble con Sello Notarial DMQ
          </h2>
          {subscription && (
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#6B7280' }}>
              Publicando como <strong>{user.fullName}</strong> · Cupo disponible: {subscription.usedListings} / {subscription.plan.maxListings} inmuebles
            </p>
          )}

          {/* Stepper Progress Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                style={{
                  flex: 1,
                  height: '6px',
                  borderRadius: '999px',
                  background: s <= currentStep ? '#D4AF37' : '#E5E7EB',
                  transition: 'background 0.3s'
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#6B7280', marginTop: '0.35rem' }}>
            <span>1. Datos</span>
            <span>2. Quito Plus</span>
            <span>3. R2 Media</span>
            <span>4. Notarial</span>
            <span>5. Bot IA</span>
          </div>
        </div>

        {/* Step 1: General Info */}
        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
                Título del Inmueble
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Villa Natura Contemporánea con Vista al Ilaló"
                style={{ width: '100%', padding: '0.65rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.875rem' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
                  Sector Geográfico
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value as Sector)}
                  style={{ width: '100%', padding: '0.65rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.875rem', background: '#FFF' }}
                >
                  <option value="Cumbayá">Cumbayá (Valle)</option>
                  <option value="Puembo">Puembo (Exclusivo)</option>
                  <option value="González Suárez">González Suárez (Hipercentro)</option>
                  <option value="La Carolina">La Carolina (Metro & Inversión)</option>
                  <option value="Tumbaco">Tumbaco (Valle)</option>
                  <option value="Nayón">Nayón (Tacuani)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
                  Tipo de Propiedad
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as PropertyType)}
                  style={{ width: '100%', padding: '0.65rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.875rem', background: '#FFF' }}
                >
                  <option value="Casa">Casa</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Suite">Suite</option>
                  <option value="Terreno">Terreno</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
                  Microzona / Urbanización
                </label>
                <input
                  type="text"
                  value={microzone}
                  onChange={(e) => setMicrozone(e.target.value)}
                  placeholder="Ej. San Juan Alto · Urb. Privada"
                  style={{ width: '100%', padding: '0.65rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.875rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.6rem' }}>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
                  Precio ($ USD)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.825rem' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
                  Construcción m²
                </label>
                <input
                  type="number"
                  value={areaBuild}
                  onChange={(e) => setAreaBuild(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.825rem' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
                  Terreno m²
                </label>
                <input
                  type="number"
                  value={areaLot}
                  onChange={(e) => setAreaLot(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.825rem' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
                  Dormitorios
                </label>
                <input
                  type="number"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.825rem' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
                  Baños
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.825rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
                Estacionamientos
              </label>
              <input
                type="number"
                value={parking}
                onChange={(e) => setParking(Number(e.target.value))}
                style={{ width: '160px', padding: '0.55rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.825rem' }}
              />
            </div>
          </div>
        )}

        {/* Step 2: Quito Differentiation */}
        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: 0 }}>
              Marca los criterios de alta demanda en Quito que valorizan tu propiedad:
            </p>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={hasGenerator} onChange={(e) => setHasGenerator(e.target.checked)} style={{ width: '18px', height: '18px' }} />
              <div>
                <strong style={{ fontSize: '0.85rem', display: 'block', color: '#171A1C' }}>⚡ Generador Eléctrico 100% de Respaldo</strong>
                <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>Alimenta todo el inmueble, ascensor y bombas de agua durante cortes de luz.</span>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={hasMetro} onChange={(e) => setHasMetro(e.target.checked)} style={{ width: '18px', height: '18px' }} />
              <div>
                <strong style={{ fontSize: '0.85rem', display: 'block', color: '#171A1C' }}>🚇 Conectividad Metro de Quito (&lt; 5 min)</strong>
                <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>Acceso peatonal inmediato a estaciones de alta plusvalía.</span>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={hasDoubleGate} onChange={(e) => setHasDoubleGate(e.target.checked)} style={{ width: '18px', height: '18px' }} />
              <div>
                <strong style={{ fontSize: '0.85rem', display: 'block', color: '#171A1C' }}>🛡️ Doble Garita y Urbanización Privada</strong>
                <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>Control de acceso multicapa con guardias 24/7 en valles.</span>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={isValleyClimate} onChange={(e) => setIsValleyClimate(e.target.checked)} style={{ width: '18px', height: '18px' }} />
              <div>
                <strong style={{ fontSize: '0.85rem', display: 'block', color: '#171A1C' }}>☀️ Microclima de Valle (2,200 msnm)</strong>
                <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>Clima templado subtropical (22°C–23°C) característico de Cumbayá y Puembo.</span>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={biessEligible} onChange={(e) => setBiessEligible(e.target.checked)} style={{ width: '18px', height: '18px' }} />
              <div>
                <strong style={{ fontSize: '0.85rem', display: 'block', color: '#171A1C' }}>💵 Apto para Crédito Hipotecario BIESS (5.99%)</strong>
                <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>Papeles saneados para aprobación inmediata con la banca pública.</span>
              </div>
            </label>
          </div>
        )}

        {/* Step 3: Media Upload with R2 and Sharp */}
        {currentStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              border: '2px dashed #D4AF37',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center',
              background: '#FDFBF7'
            }}>
              <Upload size={36} color="#D4AF37" style={{ margin: '0 auto 0.75rem auto' }} />
              <h4 style={{ margin: '0 0 0.35rem 0', fontSize: '1rem', color: '#171A1C' }}>
                Arrastra hasta 40 Fotografías y Videos 9:16
              </h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#6B7280' }}>
                Almacenamiento directo en <strong>Cloudflare R2</strong> con compresión automática <strong>WebP</strong> en 3 resoluciones.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              <div style={{ height: '90px', borderRadius: '8px', background: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#6B7280', overflow: 'hidden' }}>
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80" alt="demo 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ height: '90px', borderRadius: '8px', background: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#6B7280', overflow: 'hidden' }}>
                <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=300&q=80" alt="demo 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ height: '90px', borderRadius: '8px', border: '1px dashed #D1D5DB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#9CA3AF' }}>
                + 13 fotos listas
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Notarial Audit */}
        {currentStep === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                <FileCheck size={20} color="#059669" />
                <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#171A1C' }}>
                  Declaración Jurada Notarial DMQ
                </h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#4B5563', margin: 0 }}>
                Certifico que el inmueble cuenta con certificado de gravámenes emitido en los últimos 30 días en el Registro de la Propiedad del Distrito Metropolitano de Quito y no presenta litigios pendientes ni prohibiciones de enajenar.
              </p>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
                Descripción Arquitectónica Detallada
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe los acabados, orientación solar hacia el Ilaló o Pichincha, cocina con cuarcita o detalles de diseño..."
                style={{ width: '100%', padding: '0.65rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.85rem' }}
              />
            </div>
          </div>
        )}

        {/* Step 5: AI Guardian Bot & Publish */}
        {currentStep === 5 && (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: aiScanSuccess ? '#D1FAE5' : 'rgba(212, 175, 55, 0.15)',
              color: aiScanSuccess ? '#059669' : '#B89230',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              {aiScanSuccess ? <CheckCircle2 size={36} /> : <Bot size={36} />}
            </div>

            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: '#171A1C', margin: '0 0 0.5rem 0' }}>
              {aiScanSuccess ? '¡Propiedad Auditada y Aprobada!' : 'Auditoría con Bot Guardián de IA'}
            </h3>
            <p style={{ color: '#6B7280', fontSize: '0.875rem', maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
              {aiScanSuccess
                ? 'El bot validó que no existen marcas de agua de competidores, no hay infracciones en imágenes y los datos notariales son consistentes.'
                : 'El Bot Guardián escaneará las fotografías en busca de logos de portales competidores, analizará el texto y concederá el Sello Notarial DMQ.'}
            </p>

            {isAiScanning && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#D4AF37', fontWeight: 600, fontSize: '0.85rem' }}>
                <Sparkles size={16} />
                <span>Escaneando multimedia con Visión por Computadora...</span>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #E5E7EB' }}>
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.6rem 1rem',
                background: '#F3F4F6',
                border: 'none',
                borderRadius: '8px',
                color: '#374151',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              <ChevronLeft size={16} />
              <span>Anterior</span>
            </button>
          ) : <div></div>}

          {currentStep < 5 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.65rem 1.25rem',
                background: '#171A1C',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              <span>Continuar</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSimulateAiAuditAndPublish}
              disabled={isAiScanning || aiScanSuccess}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: '#D4AF37',
                color: '#171A1C',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: isAiScanning || aiScanSuccess ? 'default' : 'pointer'
              }}
            >
              <Bot size={16} />
              <span>{isAiScanning ? 'Auditando...' : aiScanSuccess ? 'Publicada con Éxito' : 'Auditar y Publicar Inmueble'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
