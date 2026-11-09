import React, { useState, useMemo } from 'react';
import { Sector, PropertyType } from '../types/property';
import { valuationService, ValuationParams, SECTOR_BENCHMARKS } from '../services/valuationService';
import { X, Sparkles, TrendingUp, Home, CheckCircle2, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

interface PropertyValuatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishWithValue?: (prefill: {
    sector: Sector;
    propertyType: PropertyType;
    price: number;
    areaBuild: number;
    bedrooms: number;
    bathrooms: number;
    hasGenerator: boolean;
    hasMetro: boolean;
  }) => void;
  onBookAppraisal?: () => void;
}

export const PropertyValuatorModal: React.FC<PropertyValuatorModalProps> = ({
  isOpen,
  onClose,
  onPublishWithValue,
  onBookAppraisal
}) => {
  const [sector, setSector] = useState<Sector>('Cumbayá');
  const [propertyType, setPropertyType] = useState<PropertyType>('Departamento');
  const [areaBuild, setAreaBuild] = useState<number>(140);
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(2.5);
  const [parking, setParking] = useState<number>(2);
  const [condition, setCondition] = useState<'NUEVO' | 'BUENO' | 'REMODELAR'>('BUENO');
  const [hasGenerator, setHasGenerator] = useState<boolean>(true);
  const [hasMetro, setHasMetro] = useState<boolean>(false);
  const [hasDoubleGate, setHasDoubleGate] = useState<boolean>(true);
  const [isValleyClimate, setIsValleyClimate] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Sync isValleyClimate when sector changes
  const handleSectorChange = (newSector: Sector) => {
    setSector(newSector);
    if (['Cumbayá', 'Puembo', 'Tumbaco', 'Nayón'].includes(newSector)) {
      setIsValleyClimate(true);
      setHasMetro(false);
    } else {
      setIsValleyClimate(false);
      setHasMetro(true);
    }
  };

  const params: ValuationParams = useMemo(() => ({
    sector,
    propertyType,
    areaBuild,
    bedrooms,
    bathrooms,
    parking,
    hasGenerator,
    hasMetro,
    hasDoubleGate,
    isValleyClimate,
    condition
  }), [sector, propertyType, areaBuild, bedrooms, bathrooms, parking, hasGenerator, hasMetro, hasDoubleGate, isValleyClimate, condition]);

  const valuation = useMemo(() => {
    return valuationService.calculateValuation(params);
  }, [params]);

  const benchmark = SECTOR_BENCHMARKS[sector];

  if (!isOpen) return null;

  const handleCopySummary = () => {
    const text = `PROPIEDADES PREMIER - Avalúo IA
Sector: ${sector} | Tipo: ${propertyType} (${areaBuild} m²)
Valor Venta Estimado: $${valuation.estimatedPrice.toLocaleString()} (Rango: $${valuation.priceRangeMin.toLocaleString()} - $${valuation.priceRangeMax.toLocaleString()})
Precio $/m²: $${valuation.estimatedPricePerM2.toLocaleString()}/m² (Promedio ${sector}: $${benchmark.avgPriceM2.toLocaleString()}/m²)
Canon Renta Estimado: $${valuation.estimatedMonthlyRent.toLocaleString()}/mes | Cap Rate: ${valuation.grossYieldAnnualPct}%`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="valuator-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '960px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #213145 0%, #172435 100%)',
          color: '#FFFFFF'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#FEA004',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <Sparkles size={22} />
            </div>
            <div>
              <h2 id="valuator-title" style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF' }}>
                Tasador Inteligente IA & Valuador DMQ
              </h2>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#94A3B8' }}>
                Inspirado en los índices inmobiliarios de Quito, Cumbayá y Valles · Precisión certificada ±7%
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem',
              color: '#FFFFFF',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{
          padding: '1.5rem 1.75rem',
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '1.75rem'
        }}>
          {/* Left Column: Form Controls */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#213145', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Home size={18} color="#FEA004" />
              <span>1. Características del Inmueble</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              {/* Sector */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
                  Sector / Parroquia
                </label>
                <select
                  value={sector}
                  onChange={(e) => handleSectorChange(e.target.value as Sector)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.88rem',
                    background: '#FFFFFF',
                    fontWeight: 600,
                    color: '#213145'
                  }}
                >
                  <option value="Cumbayá">Cumbayá</option>
                  <option value="Puembo">Puembo</option>
                  <option value="González Suárez">González Suárez</option>
                  <option value="La Carolina">La Carolina</option>
                  <option value="Tumbaco">Tumbaco</option>
                  <option value="Nayón">Nayón</option>
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
                  Tipo de Propiedad
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.88rem',
                    background: '#FFFFFF',
                    fontWeight: 600,
                    color: '#213145'
                  }}
                >
                  <option value="Departamento">Departamento</option>
                  <option value="Casa">Casa</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Suite">Suite</option>
                  <option value="Oficina">Oficina</option>
                  <option value="Terreno">Terreno</option>
                </select>
              </div>
            </div>

            {/* Metraje slider */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>
                  Área de Construcción Cubierta
                </label>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FEA004' }}>
                  {areaBuild} m²
                </span>
              </div>
              <input
                type="range"
                min="35"
                max="800"
                step="5"
                value={areaBuild}
                onChange={(e) => setAreaBuild(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#FEA004' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8' }}>
                <span>35 m² (Suite)</span>
                <span>250 m² (Casa estándar)</span>
                <span>800 m² (Mansión)</span>
              </div>
            </div>

            {/* Bedrooms, Bathrooms, Parking */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem' }}>
                  Dormitorios
                </label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                >
                  <option value={1}>1 Dormitorio</option>
                  <option value={2}>2 Dormitorios</option>
                  <option value={3}>3 Dormitorios</option>
                  <option value={4}>4 Dormitorios</option>
                  <option value={5}>5+ Dormitorios</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem' }}>
                  Baños
                </label>
                <select
                  value={bathrooms}
                  onChange={(e) => setBathrooms(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                >
                  <option value={1}>1 Baño</option>
                  <option value={2}>2 Baños</option>
                  <option value={2.5}>2.5 Baños</option>
                  <option value={3}>3 Baños</option>
                  <option value={4}>4+ Baños</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem' }}>
                  Parqueaderos
                </label>
                <select
                  value={parking}
                  onChange={(e) => setParking(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                >
                  <option value={1}>1 Parqueadero</option>
                  <option value={2}>2 Parqueaderos</option>
                  <option value={3}>3 Parqueaderos</option>
                  <option value={4}>4+ Parqueaderos</option>
                </select>
              </div>
            </div>

            {/* Condition */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
                Estado de Conservación
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                {[
                  { id: 'NUEVO', label: 'A estrenar (+8%)' },
                  { id: 'BUENO', label: 'Buen estado' },
                  { id: 'REMODELAR', label: 'A remodelar (-18%)' }
                ].map(cond => (
                  <button
                    key={cond.id}
                    type="button"
                    onClick={() => setCondition(cond.id as any)}
                    style={{
                      padding: '0.5rem 0.25rem',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      border: condition === cond.id ? '2px solid #FEA004' : '1px solid #CBD5E1',
                      background: condition === cond.id ? '#FFF7ED' : '#F8FAFC',
                      color: condition === cond.id ? '#D97706' : '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    {cond.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quito High-Impact Features */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>
                Equipamiento Crítico en Quito (+Plusvalía)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  background: hasGenerator ? '#EFF6FF' : '#F8FAFC',
                  border: `1px solid ${hasGenerator ? '#93C5FD' : '#E2E8F0'}`,
                  cursor: 'pointer',
                  fontSize: '0.78rem'
                }}>
                  <input
                    type="checkbox"
                    checked={hasGenerator}
                    onChange={(e) => setHasGenerator(e.target.checked)}
                    style={{ accentColor: '#FEA004' }}
                  />
                  <span>⚡ Generador 100% (+6%)</span>
                </label>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  background: hasMetro ? '#EFF6FF' : '#F8FAFC',
                  border: `1px solid ${hasMetro ? '#93C5FD' : '#E2E8F0'}`,
                  cursor: 'pointer',
                  fontSize: '0.78rem'
                }}>
                  <input
                    type="checkbox"
                    checked={hasMetro}
                    onChange={(e) => setHasMetro(e.target.checked)}
                    style={{ accentColor: '#FEA004' }}
                  />
                  <span>🚇 Metro &lt;5 min (+7%)</span>
                </label>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  background: hasDoubleGate ? '#EFF6FF' : '#F8FAFC',
                  border: `1px solid ${hasDoubleGate ? '#93C5FD' : '#E2E8F0'}`,
                  cursor: 'pointer',
                  fontSize: '0.78rem'
                }}>
                  <input
                    type="checkbox"
                    checked={hasDoubleGate}
                    onChange={(e) => setHasDoubleGate(e.target.checked)}
                    style={{ accentColor: '#FEA004' }}
                  />
                  <span>🛡️ Doble Garita (+5%)</span>
                </label>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  background: isValleyClimate ? '#EFF6FF' : '#F8FAFC',
                  border: `1px solid ${isValleyClimate ? '#93C5FD' : '#E2E8F0'}`,
                  cursor: 'pointer',
                  fontSize: '0.78rem'
                }}>
                  <input
                    type="checkbox"
                    checked={isValleyClimate}
                    onChange={(e) => setIsValleyClimate(e.target.checked)}
                    style={{ accentColor: '#FEA004' }}
                  />
                  <span>☀️ Clima de Valle</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Valuation Results Card */}
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#64748B'
                }}>
                  Estimación de Mercado IA
                </span>
                <span style={{
                  fontSize: '0.75rem',
                  color: '#16A34A',
                  fontWeight: 700,
                  background: '#DCFCE7',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.2rem'
                }}>
                  <ShieldCheck size={12} /> Confianza {valuation.confidenceScore}%
                </span>
              </div>

              {/* Main Estimated Sale Price */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '0.2rem' }}>
                  Valor Comercial Estimado de Venta
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#213145', lineHeight: 1.1 }}>
                  ${valuation.estimatedPrice.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '0.25rem' }}>
                  Rango de negociación: <strong>${valuation.priceRangeMin.toLocaleString()}</strong> - <strong>${valuation.priceRangeMax.toLocaleString()}</strong>
                </div>
              </div>

              {/* Key Indicators Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ background: '#FFFFFF', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase' }}>Precio por m²</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#213145' }}>
                    ${valuation.estimatedPricePerM2.toLocaleString()}/m²
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                    Promedio {sector}: ${benchmark.avgPriceM2}/m²
                  </div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase' }}>Canon Renta / Mes</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#16A34A' }}>
                    ${valuation.estimatedMonthlyRent.toLocaleString()}/m
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                    Cap Rate: {valuation.grossYieldAnnualPct}% anual
                  </div>
                </div>
              </div>

              {/* Benchmark comparison banner */}
              <div style={{
                background: '#EFF6FF',
                border: '1px solid #BFDBFE',
                borderRadius: '8px',
                padding: '0.75rem',
                fontSize: '0.78rem',
                color: '#1E40AF',
                lineHeight: 1.5,
                marginBottom: '1rem'
              }}>
                <strong>Índice Inmobiliario Premier:</strong> El sector {sector} registra una plusvalía anual promedio de <strong>+{benchmark.annualAppreciationPct}%</strong> y una velocidad media de venta de 65 días.
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <button
                onClick={() => {
                  onPublishWithValue?.({
                    sector,
                    propertyType,
                    price: valuation.estimatedPrice,
                    areaBuild,
                    bedrooms,
                    bathrooms,
                    hasGenerator,
                    hasMetro
                  });
                  onClose();
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  background: '#FEA004',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 4px 12px rgba(254, 160, 4, 0.3)'
                }}
              >
                <span>Publicar Anuncio con este Valor</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button
                  onClick={onBookAppraisal}
                  style={{
                    padding: '0.55rem',
                    borderRadius: '8px',
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    color: '#213145',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <FileText size={14} color="#FEA004" />
                  <span>Avalúo Notarial DMQ</span>
                </button>

                <button
                  onClick={handleCopySummary}
                  style={{
                    padding: '0.55rem',
                    borderRadius: '8px',
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    color: '#213145',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.3rem'
                  }}
                >
                  {copied ? <CheckCircle2 size={14} color="#16A34A" /> : <TrendingUp size={14} color="#2563EB" />}
                  <span>{copied ? '¡Copiado!' : 'Copiar Resumen'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
