import React, { useState } from 'react';
import { resourcesService, BlogPost, LegalTemplate } from '../services/resourcesService';
import { BookOpen, Download, ArrowRight, Search, FileText, X } from 'lucide-react';

interface BlogViewProps {
  onDownloadTemplate?: (template: LegalTemplate) => void;
  onOpenWhatsApp?: (topic?: string) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  onDownloadTemplate,
  onOpenWhatsApp
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);

  const allPosts = resourcesService.getBlogPosts();
  const allTemplates = resourcesService.getTemplates();

  const filteredPosts = allPosts.filter((post) => {
    if (selectedCategory !== 'ALL' && post.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = post.title.toLowerCase().includes(q);
      const matchesExcerpt = post.excerpt.toLowerCase().includes(q);
      if (!matchesTitle && !matchesExcerpt) return false;
    }
    return true;
  });

  const categories = [
    { id: 'ALL', label: 'Todos los artículos' },
    { id: 'GUIA_COMPRA', label: 'Guías de Compra' },
    { id: 'PLUSVALIA', label: 'Plusvalía & Metro' },
    { id: 'TRAMITES_NOTARIALES', label: 'Trámites Notariales' }
  ];

  const handleDownload = (template: LegalTemplate) => {
    if (onDownloadTemplate) {
      onDownloadTemplate(template);
    } else {
      const dummyContent = `MODELO OFICIAL: ${template.title}\nFormato: ${template.format}\nPropiedades Premier Ecuador.`;
      const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = template.downloadFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="blog-view-container" style={{ padding: '2rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #152232 0%, #213145 100%)',
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
            <BookOpen size={16} />
            <span>Centro de Conocimiento Inmobiliario de Quito y Valles</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.85rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Blog Inmobiliario, Análisis de Mercado y Guías Notariales
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#CBD5E1', margin: 0, lineHeight: 1.6 }}>
            Estrategias de inversión patrimonial, impacto de obras de infraestructura pública, normativa notarial del DMQ 
            y plantillas legales oficiales para asegurar tus transacciones de compra y arriendo.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        background: '#FFFFFF',
        padding: '1.25rem 1.5rem',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        marginBottom: '2rem'
      }}>
        {/* Category Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: selectedCategory === cat.id ? '2px solid #FEA004' : '1px solid #E2E8F0',
                background: selectedCategory === cat.id ? '#FFF8EE' : '#F8FAFC',
                color: selectedCategory === cat.id ? '#FEA004' : '#475569',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por tema o título..."
            style={{
              width: '100%',
              padding: '0.55rem 0.75rem 0.55rem 2.25rem',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '0.88rem',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.75rem', marginBottom: '3.5rem' }}>
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => setReadingPost(post)}
            style={{
              background: '#FFFFFF',
              borderRadius: '14px',
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease'
            }}
          >
            <div style={{ height: '200px', overflow: 'hidden' }}>
              <img
                src={post.imageUrl}
                alt={post.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{
                  background: '#FFF8EE',
                  color: '#FEA004',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  padding: '0.25rem 0.65rem',
                  borderRadius: '12px'
                }}>
                  {post.category === 'GUIA_COMPRA' ? 'Guía de Compra' : post.category === 'PLUSVALIA' ? 'Plusvalía' : 'Trámites Notariales'}
                </span>
                <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>{post.readTime} de lectura</span>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#213145', margin: '0 0 0.65rem', lineHeight: 1.35 }}>
                {post.title}
              </h3>

              <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 1.25rem' }}>
                {post.excerpt}
              </p>

              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                  {post.author}
                </span>
                <span style={{ color: '#FEA004', fontWeight: 700, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span>Leer artículo</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Downloadable Legal Templates Section */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '2.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#FFF8EE', padding: '0.6rem', borderRadius: '12px', color: '#FEA004' }}>
            <FileText size={24} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#213145' }}>
              Centro de Descarga de Documentos y Plantillas Notariales
            </h2>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B' }}>
              Modelos jurídicos actualizados según el Código Civil y la Ley de Inquilinato de Pichincha
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {allTemplates.map((tpl) => (
            <div
              key={tpl.id}
              style={{
                background: '#F8FAFC',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#4F46E5', background: '#EEF2FF', padding: '0.2rem 0.6rem', borderRadius: '10px' }}>
                    {tpl.type}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{tpl.format} · {tpl.pages} págs.</span>
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#213145', margin: '0 0 0.5rem' }}>
                  {tpl.title}
                </h4>
                <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: 1.45, margin: '0 0 1rem' }}>
                  {tpl.description}
                </p>
              </div>

              <button
                onClick={() => handleDownload(tpl)}
                style={{
                  background: '#213145',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.65rem 1rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <Download size={15} />
                <span>Descargar {tpl.downloadFileName}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {readingPost && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(33, 49, 69, 0.75)',
          backdropFilter: 'blur(4px)',
          zIndex: 110,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2.5rem',
            position: 'relative',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
          }}>
            <button
              onClick={() => setReadingPost(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#F1F5F9',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={20} color="#475569" />
            </button>

            <span style={{ background: '#FFF8EE', color: '#FEA004', fontSize: '0.8rem', fontWeight: 800, padding: '0.3rem 0.7rem', borderRadius: '12px' }}>
              {readingPost.category}
            </span>

            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#213145', margin: '0.75rem 0' }}>
              {readingPost.title}
            </h2>

            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.82rem', color: '#64748B', marginBottom: '1.5rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
              <span>Por {readingPost.author}</span>
              <span>Fecha: {readingPost.date}</span>
              <span>{readingPost.readTime}</span>
            </div>

            <div style={{ marginBottom: '1.5rem', borderRadius: '12px', overflow: 'hidden', height: '260px' }}>
              <img src={readingPost.imageUrl} alt={readingPost.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.8 }}>
              <p>{readingPost.excerpt}</p>
              <p>
                En el mercado inmobiliario de Quito y sus valles (Cumbayá, Puembo, Tumbaco y Nayón), 
                contar con la debida asesoría notarial y financiera garantiza que la plusvalía esperada 
                sea respaldada por títulos jurídicamente inexpugnables. 
                Los créditos preferenciales del BIESS al 5.99% y las tasas bancarias al 8.45% representan oportunidades 
                clave para maximizar el patrimonio familiar.
              </p>
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748B' }}>¿Deseas asesoría personalizada sobre este tema?</span>
              <button
                onClick={() => {
                  setReadingPost(null);
                  if (onOpenWhatsApp) onOpenWhatsApp(readingPost.title);
                }}
                style={{
                  background: '#FEA004',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                Consultar con Asesor Legal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};