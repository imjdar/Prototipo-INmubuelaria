import React, { useState } from 'react';
import { X, Calculator, BookOpen, FileText, Download, TrendingUp, CheckCircle, Percent } from 'lucide-react';
import { mortgageService } from '../services/mortgageService';
import { resourcesService, LegalTemplate } from '../services/resourcesService';

interface ResourcesCalculatorsModalProps {
  isOpen: boolean;
  initialTab?: 'calculators' | 'blog' | 'documents';
  onClose: () => void;
  onDownloadTemplate?: (template: LegalTemplate) => void;
}

export const ResourcesCalculatorsModal: React.FC<ResourcesCalculatorsModalProps> = ({
  isOpen,
  initialTab = 'calculators',
  onClose,
  onDownloadTemplate
}) => {
  const [activeTab, setActiveTab] = useState<'calculators' | 'blog' | 'documents'>(initialTab);

  // Mortgage Calculator Interactive State
  const [propertyPrice, setPropertyPrice] = useState<number>(250000);
  const [downPaymentPct, setDownPaymentPct] = useState<number>(20);
  const [termYears, setTermYears] = useState<number>(20);
  const [bankType, setBankType] = useState<'BIESS' | 'PRIVATE'>('BIESS');

  // ROI / Cap Rate Calculator State
  const [purchasePrice, setPurchasePrice] = useState<number>(180000);
  const [monthlyRent, setMonthlyRent] = useState<number>(1200);
  const [annualExpenses, setAnnualExpenses] = useState<number>(1800);

  // Download Feedback State
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const mortgageResult = mortgageService.computeFullCalculation(
    propertyPrice,
    downPaymentPct,
    termYears,
    bankType
  );

  const closingCosts = mortgageResult.closingCosts;

  const roiResult = resourcesService.calculateRoi(purchasePrice, monthlyRent, annualExpenses);

  const handleDownload = (tmpl: LegalTemplate) => {
    setDownloadedId(tmpl.id);
    if (onDownloadTemplate) {
      onDownloadTemplate(tmpl);
    }
    setTimeout(() => {
      setDownloadedId(null);
    }, 2500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="resources-title">
      <div
        className="resources-modal-card"
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
          aria-label="Cerrar recursos"
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

        {/* Modal Header */}
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
            <Calculator size={13} color="#FEA004" />
            <span>Centro de Recursos & Inteligencia Inmobiliaria</span>
          </div>
          <h2 id="resources-title" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#213145', margin: 0 }}>
            Herramientas Financieras, Blog y Documentos Notariales
          </h2>
        </div>

        {/* Tab Buttons */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '2px solid #F1F3F5',
          paddingBottom: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          <button
            onClick={() => setActiveTab('calculators')}
            style={{
              padding: '0.55rem 1.15rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'calculators' ? '#FEA004' : 'none',
              color: activeTab === 'calculators' ? '#FFFFFF' : '#64748B',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Calculator size={16} />
            <span>Calculadoras Financieras</span>
          </button>

          <button
            onClick={() => setActiveTab('blog')}
            style={{
              padding: '0.55rem 1.15rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'blog' ? '#FEA004' : 'none',
              color: activeTab === 'blog' ? '#FFFFFF' : '#64748B',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <BookOpen size={16} />
            <span>Blog Inmobiliario</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            style={{
              padding: '0.55rem 1.15rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'documents' ? '#FEA004' : 'none',
              color: activeTab === 'documents' ? '#FFFFFF' : '#64748B',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <FileText size={16} />
            <span>Documentos Notariales DMQ</span>
          </button>
        </div>

        {/* TAB 1: CALCULATORS */}
        {activeTab === 'calculators' && (
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {/* Simulador Hipotecario */}
              <div style={{ background: '#F8F9FA', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#213145', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Percent size={18} color="#FEA004" />
                  <span>Simulador Crédito Hipotecario Quito</span>
                </h3>

                {/* Bank Toggle */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <button
                    onClick={() => setBankType('BIESS')}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: bankType === 'BIESS' ? '#213145' : '#E2E8F0',
                      color: bankType === 'BIESS' ? '#FFFFFF' : '#64748B',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    BIESS (5.99% VIP/VIS)
                  </button>
                  <button
                    onClick={() => setBankType('PRIVATE')}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: bankType === 'PRIVATE' ? '#213145' : '#E2E8F0',
                      color: bankType === 'PRIVATE' ? '#FFFFFF' : '#64748B',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    Banca Privada (~8.45%)
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.25rem' }}>
                      Precio del Inmueble (USD): <strong>${propertyPrice.toLocaleString()}</strong>
                    </label>
                    <input
                      type="range"
                      min={60000}
                      max={1000000}
                      step={5000}
                      value={propertyPrice}
                      onChange={(e) => setPropertyPrice(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#FEA004' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.25rem' }}>
                        Entrada (%): {downPaymentPct}% (${(propertyPrice * (downPaymentPct / 100)).toLocaleString()})
                      </label>
                      <select
                        value={downPaymentPct}
                        onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                        style={{ width: '100%', padding: '0.45rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.8rem' }}
                      >
                        <option value={10}>10% (Crédito VIS)</option>
                        <option value={20}>20% (Estándar)</option>
                        <option value={30}>30% (Recomendado)</option>
                        <option value={40}>40%</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.25rem' }}>
                        Plazo del Préstamo
                      </label>
                      <select
                        value={termYears}
                        onChange={(e) => setTermYears(Number(e.target.value))}
                        style={{ width: '100%', padding: '0.45rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.8rem' }}
                      >
                        <option value={10}>10 años</option>
                        <option value={15}>15 años</option>
                        <option value={20}>20 años (Más común)</option>
                        <option value={25}>25 años (BIESS)</option>
                      </select>
                    </div>
                  </div>

                  {/* Calculated Results Box */}
                  <div style={{ background: '#FFFFFF', border: '1.5px solid #FED7AA', borderRadius: '12px', padding: '1rem', marginTop: '0.5rem' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Cuota Mensual Estimada</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FEA004' }}>
                      ${mortgageResult.monthlyPayment.toLocaleString()} <span style={{ fontSize: '0.85rem', color: '#64748B' }}>/ mes</span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: '0.25rem' }}>
                      Monto a financiar: ${mortgageResult.loanAmount.toLocaleString()} USD a {termYears} años ({bankType === 'BIESS' ? '5.99%' : '8.45%'} anual).
                    </div>
                  </div>
                </div>
              </div>

              {/* Gastos de Cierre Notariales DMQ & Plusvalía */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Desglose Notarial */}
                <div style={{ background: '#F8F9FA', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.25rem' }}>
                  <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem', fontWeight: 800, color: '#213145' }}>
                    Gastos Notariales y Aranceles DMQ
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.78rem', color: '#475569' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Impuesto de Alcabala DMQ (1.00%):</span>
                      <strong>${closingCosts.alcabalaFee.toLocaleString()} USD</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Consejo Provincial Pichincha (0.11%):</span>
                      <strong>${closingCosts.provincialFee.toLocaleString()} USD</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Registro de la Propiedad Quito:</span>
                      <strong>${closingCosts.registryFee.toLocaleString()} USD</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Honorarios Notariales y Minutas:</span>
                      <strong>${closingCosts.notaryFee.toLocaleString()} USD</strong>
                    </div>
                    <div style={{ height: '1px', background: '#E2E8F0', margin: '0.25rem 0' }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#213145', fontWeight: 800 }}>
                      <span>Total Gastos de Cierre Estimados:</span>
                      <strong style={{ color: '#FEA004' }}>${closingCosts.totalClosingCosts.toLocaleString()} USD</strong>
                    </div>
                  </div>
                </div>

                {/* Calculadora de Cap Rate / Rentabilidad */}
                <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '16px', padding: '1.25rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem', fontWeight: 800, color: '#213145', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <TrendingUp size={16} color="#FEA004" />
                    <span>Calculadora de Rentabilidad (Cap Rate)</span>
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '0.65rem' }}>
                    <div>
                      <label style={{ fontSize: '0.7rem', color: '#64748B', display: 'block' }}>Arriendo mensual</label>
                      <input
                        type="number"
                        value={monthlyRent}
                        onChange={(e) => setMonthlyRent(Number(e.target.value))}
                        style={{ width: '100%', padding: '0.35rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.7rem', color: '#64748B', display: 'block' }}>Gastos/año</label>
                      <input
                        type="number"
                        value={annualExpenses}
                        onChange={(e) => setAnnualExpenses(Number(e.target.value))}
                        style={{ width: '100%', padding: '0.35rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.7rem', color: '#64748B', display: 'block' }}>Valor Compra</label>
                      <input
                        type="number"
                        value={purchasePrice}
                        onChange={(e) => setPurchasePrice(Number(e.target.value))}
                        style={{ width: '100%', padding: '0.35rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', padding: '0.5rem 0.75rem', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#213145' }}>Cap Rate Neto Anual:</span>
                    <strong style={{ fontSize: '1.1rem', color: '#16A34A' }}>{roiResult.capRateNet}% / año</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BLOG INMOBILIARIO */}
        {activeTab === 'blog' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {resourcesService.getBlogPosts().map((post) => (
              <article
                key={post.id}
                style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  background: '#FFFFFF',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ height: '140px', overflow: 'hidden' }}>
                  <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#FEA004', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    <span>{post.category}</span>
                    <span style={{ color: '#64748B' }}>{post.readTime}</span>
                  </div>
                  <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '0.92rem', color: '#213145', lineHeight: 1.3 }}>
                    {post.title}
                  </h4>
                  <p style={{ margin: '0 0 0.85rem 0', fontSize: '0.78rem', color: '#64748B', lineHeight: 1.4, flex: 1 }}>
                    {post.excerpt}
                  </p>
                  <div style={{ fontSize: '0.7rem', color: '#94A3B8', borderTop: '1px solid #F1F3F5', paddingTop: '0.5rem' }}>
                    Por {post.author} · {post.date}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* TAB 3: DOCUMENTOS NOTARIALES */}
        {activeTab === 'documents' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {resourcesService.getTemplates().map((tmpl) => (
              <div
                key={tmpl.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.25rem',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  background: '#F8FAFC'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: '#FFF7ED',
                    border: '1px solid #FED7AA',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FEA004'
                  }}>
                    <FileText size={22} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.92rem', color: '#213145', display: 'block' }}>{tmpl.title}</strong>
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{tmpl.description} · {tmpl.pages} páginas ({tmpl.format})</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(tmpl)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: downloadedId === tmpl.id ? '#16A34A' : '#FEA004',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.55rem 1rem',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {downloadedId === tmpl.id ? <CheckCircle size={15} /> : <Download size={15} />}
                  <span>{downloadedId === tmpl.id ? 'Descargado' : 'Descargar Plantilla'}</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
