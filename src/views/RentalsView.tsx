import React, { useState, useMemo } from 'react';
import { Property, Sector } from '../types/property';
import { PropertyCard } from '../components/PropertyCard';
import { KeyRound, Calculator, FileText, CheckCircle2, Search, ArrowRight, Calendar } from 'lucide-react';

interface RentalsViewProps {
  properties: Property[];
  savedPropertyIds: string[];
  comparedPropertyIds: string[];
  onToggleFavorite: (id: string) => void;
  onToggleCompare: (property: Property) => void;
  onQuickView: (property: Property) => void;
  onSelectProperty: (property: Property) => void;
  onContactWhatsApp: (property: Property) => void;
  onShare: (property: Property) => void;
  onOpenSchedule: (property: Property) => void;
}

export const RentalsView: React.FC<RentalsViewProps> = ({
  properties,
  savedPropertyIds,
  comparedPropertyIds,
  onToggleFavorite,
  onToggleCompare,
  onQuickView,
  onSelectProperty,
  onContactWhatsApp,
  onShare,
  onOpenSchedule
}) => {
  // Rental specific filters
  const [selectedSector, setSelectedSector] = useState<Sector | 'ALL'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [maxMonthlyPrice, setMaxMonthlyPrice] = useState<number>(3500);
  const [onlyPetFriendly, setOnlyPetFriendly] = useState<boolean>(false);
  const [onlyHoaIncluded, setOnlyHoaIncluded] = useState<boolean>(false);
  const [onlyFurnished, setOnlyFurnished] = useState<boolean>(false);
  const [rentalSearch, setRentalSearch] = useState<string>('');

  // Interactive Rental Qualification Calculator State
  const [householdIncome, setHouseholdIncome] = useState<number>(3500);
  const [showContractGenerator, setShowContractGenerator] = useState<boolean>(false);
  const [tenantName, setTenantName] = useState<string>('');
  const [contractGenerated, setContractGenerated] = useState<boolean>(false);

  // Maximum recommended rent (30% rule)
  const maxRecommendedRent = Math.round(householdIncome * 0.30);

  // Filter rentals
  const rentalProperties = useMemo(() => {
    return properties.filter((p) => {
      // Must be rental or under 5000 price (monthly)
      const isRental = p.operationType === 'RENTA' || p.price < 5000;
      if (!isRental) return false;

      if (selectedSector !== 'ALL' && p.sector !== selectedSector) return false;
      if (selectedCategory !== 'ALL' && p.type !== selectedCategory) return false;
      if (p.price > maxMonthlyPrice) return false;

      if (onlyPetFriendly && !p.rentalDetails?.petsAllowed) return false;
      if (onlyHoaIncluded && !p.rentalDetails?.includesHoa) return false;
      if (onlyFurnished && !p.rentalDetails?.furnished) return false;

      if (rentalSearch.trim()) {
        const query = rentalSearch.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesSector = p.sector.toLowerCase().includes(query);
        const matchesMicrozone = p.microzone.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSector && !matchesMicrozone) return false;
      }

      return true;
    });
  }, [properties, selectedSector, selectedCategory, maxMonthlyPrice, onlyPetFriendly, onlyHoaIncluded, onlyFurnished, rentalSearch]);

  const sectors: (Sector | 'ALL')[] = ['ALL', 'La Carolina', 'González Suárez', 'Cumbayá', 'Tumbaco', 'Puembo', 'Nayón'];
  const categories = [
    { id: 'ALL', label: 'Todas las propiedades' },
    { id: 'Oficina', label: 'Oficinas corporativas' },
    { id: 'Suite', label: 'Suites ejecutivas' },
    { id: 'Departamento', label: 'Departamentos' },
    { id: 'Bodega', label: 'Bodegas / Galpones' },
    { id: 'Casa', label: 'Casas en arriendo' }
  ];

  return (
    <div className="rentals-view-container" style={{ padding: '2rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Hero Banner for Rentals */}
      <div style={{
        background: 'linear-gradient(135deg, #213145 0%, #152232 100%)',
        color: '#FFFFFF',
        borderRadius: '16px',
        padding: '2.5rem',
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 12px 30px rgba(33, 49, 69, 0.15)'
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '750px' }}>
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
            <KeyRound size={16} />
            <span>Portal Oficial de Arriendos Verificados en Quito y Valles</span>
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 0.85rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Propiedades en Renta con Seguridad Notarial
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#CBD5E1', margin: 0, lineHeight: 1.6 }}>
            Oficinas prime, suites ejecutivas, residencias amobladas y bodegas industriales con contratos según la 
            Ley de Inquilinato del Ecuador y mediación legal garantizada.
          </p>
        </div>
      </div>

      {/* Main Filter Bar for Rentals */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '14px',
        padding: '1.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
        marginBottom: '2rem'
      }}>
        {/* Search Input & Sector Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
              Palabra clave o ubicación
            </label>
            <div style={{ position: 'relative' }}>
              <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                value={rentalSearch}
                onChange={(e) => setRentalSearch(e.target.value)}
                placeholder="Ej. Oficina República del Salvador, Suite La Carolina..."
                style={{
                  width: '100%',
                  padding: '0.65rem 0.75rem 0.65rem 2.5rem',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.92rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
              Sector de Quito o Valle
            </label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value as any)}
              style={{
                width: '100%',
                padding: '0.65rem 0.75rem',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '0.92rem',
                background: '#FFFFFF',
                boxSizing: 'border-box'
              }}
            >
              {sectors.map((sec) => (
                <option key={sec} value={sec}>
                  {sec === 'ALL' ? 'Todos los sectores' : sec}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
              <span>Canon máximo mensual:</span>
              <span style={{ color: '#FEA004', fontWeight: 800 }}>${maxMonthlyPrice.toLocaleString()} / mes</span>
            </label>
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={maxMonthlyPrice}
              onChange={(e) => setMaxMonthlyPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#FEA004', marginTop: '0.5rem' }}
            />
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '20px',
                border: selectedCategory === cat.id ? '2px solid #FEA004' : '1px solid #E2E8F0',
                background: selectedCategory === cat.id ? '#FFF8EE' : '#F8FAFC',
                color: selectedCategory === cat.id ? '#FEA004' : '#475569',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Toggle Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #F1F5F9' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.88rem', color: '#334155', cursor: 'pointer', fontWeight: 600 }}>
            <input
              type="checkbox"
              checked={onlyPetFriendly}
              onChange={(e) => setOnlyPetFriendly(e.target.checked)}
              style={{ accentColor: '#FEA004' }}
            />
            <span>Acepta mascotas (Pet Friendly)</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.88rem', color: '#334155', cursor: 'pointer', fontWeight: 600 }}>
            <input
              type="checkbox"
              checked={onlyHoaIncluded}
              onChange={(e) => setOnlyHoaIncluded(e.target.checked)}
              style={{ accentColor: '#FEA004' }}
            />
            <span>Alícuota incluida en el canon</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.88rem', color: '#334155', cursor: 'pointer', fontWeight: 600 }}>
            <input
              type="checkbox"
              checked={onlyFurnished}
              onChange={(e) => setOnlyFurnished(e.target.checked)}
              style={{ accentColor: '#FEA004' }}
            />
            <span>Amoblado ejecutivo</span>
          </label>
        </div>
      </div>

      {/* Interactive Tool Grid: Qualification Calculator & Tenancy Contract */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {/* Tool 1: Income Qualification Calculator */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '14px',
          padding: '1.5rem',
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
            <div style={{ background: '#FFF8EE', padding: '0.5rem', borderRadius: '10px', color: '#FEA004' }}>
              <Calculator size={22} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#213145' }}>
                Calculadora de Calificación al Arriendo
              </h3>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748B' }}>
                Regla de solvencia financiera (máx. 30% del ingreso mensual)
              </p>
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
              <span>Ingreso mensual neto del hogar:</span>
              <span style={{ color: '#213145', fontWeight: 800 }}>${householdIncome.toLocaleString()} USD</span>
            </label>
            <input
              type="range"
              min="1000"
              max="15000"
              step="250"
              value={householdIncome}
              onChange={(e) => setHouseholdIncome(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#FEA004' }}
            />
          </div>

          <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', border: '1px solid #E2E8F0' }}>
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Canon Máximo Sugerido:</span>
              <strong style={{ fontSize: '1.35rem', color: '#FEA004' }}>${maxRecommendedRent.toLocaleString()}</strong>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}> / mes</span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Garantía Requerida:</span>
              <strong style={{ fontSize: '1.35rem', color: '#213145' }}>${(maxRecommendedRent * 2).toLocaleString()}</strong>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}> (2 meses)</span>
            </div>
          </div>
        </div>

        {/* Tool 2: Tenancy Contract Accordion */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '14px',
          padding: '1.5rem',
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
            <div style={{ background: '#EEF2FF', padding: '0.5rem', borderRadius: '10px', color: '#4F46E5' }}>
              <FileText size={22} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#213145' }}>
                Contrato Notarial de Arrendamiento
              </h3>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748B' }}>
                Plantilla estandarizada según la Ley de Inquilinato DMQ
              </p>
            </div>
          </div>

          {!showContractGenerator ? (
            <div>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, marginBottom: '1rem' }}>
                Garantiza tu arrendamiento con cláusulas de mediación arbitral, depósito de garantía en custodia notarial 
                y acta de inventario de entrega.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setShowContractGenerator(true)}
                  style={{
                    background: '#213145',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>Generar Modelo de Contrato</span>
                  <ArrowRight size={16} />
                </button>
                {rentalProperties.length > 0 && (
                  <button
                    onClick={() => onOpenSchedule(rentalProperties[0])}
                    style={{
                      background: '#FFF8EE',
                      color: '#FEA004',
                      border: '1px solid #FED7AA',
                      padding: '0.65rem 1rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Calendar size={15} />
                    <span>Agendar Visita</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: '0.75rem' }}>
                <input
                  type="text"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  placeholder="Nombre completo del Inquilino / Arrendatario"
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.88rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <button
                onClick={() => setContractGenerated(true)}
                style={{
                  background: '#FEA004',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.55rem 1.15rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem'
                }}
              >
                <CheckCircle2 size={16} />
                <span>Generar Borrador Legal</span>
              </button>

              {contractGenerated && (
                <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px', fontSize: '0.82rem', color: '#065F46' }}>
                  ✓ Borrador generado con éxito para {tenantName || 'Inquilino Principal'}. Incluye cláusula de arbitraje Cámara de Comercio de Quito.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Property Results List */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#213145', margin: 0, letterSpacing: '-0.02em' }}>
            Inmuebles en Renta Disponibles
          </h2>
          <span style={{ fontSize: '0.88rem', color: '#64748B' }}>
            Mostrando {rentalProperties.length} propiedades con canon mensual en dólares
          </span>
        </div>
      </div>

      {rentalProperties.length === 0 ? (
        <div style={{
          background: '#F8FAFC',
          borderRadius: '12px',
          padding: '3rem 2rem',
          textAlign: 'center',
          border: '1px dashed #CBD5E1'
        }}>
          <h3 style={{ margin: '0 0 0.5rem', color: '#213145' }}>No encontramos arriendos con estos filtros</h3>
          <p style={{ margin: '0 0 1rem', color: '#64748B', fontSize: '0.92rem' }}>
            Prueba ajustando el canon máximo o seleccionando "Todos los sectores".
          </p>
          <button
            onClick={() => {
              setSelectedSector('ALL');
              setSelectedCategory('ALL');
              setMaxMonthlyPrice(5000);
              setRentalSearch('');
              setOnlyPetFriendly(false);
              setOnlyHoaIncluded(false);
              setOnlyFurnished(false);
            }}
            style={{
              background: '#FEA004',
              color: '#FFFFFF',
              border: 'none',
              padding: '0.65rem 1.5rem',
              borderRadius: '8px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Restablecer Filtros de Renta
          </button>
        </div>
      ) : (
        <div className="properties-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {rentalProperties.map((p) => (
            <PropertyCard
              key={p.id}
              property={p}
              isFavorite={savedPropertyIds.includes(p.id)}
              isCompared={comparedPropertyIds.includes(p.id)}
              onToggleFavorite={onToggleFavorite}
              onToggleCompare={onToggleCompare}
              onQuickView={onQuickView}
              onSelectProperty={onSelectProperty}
              onContactWhatsApp={onContactWhatsApp}
              onShare={onShare}
            />
          ))}
        </div>
      )}
    </div>
  );
};