import React, { useState } from 'react';
import { Property } from '../types/property';
import { 
  Heart, 
  Menu, 
  Search, 
  MapPin, 
  Briefcase, 
  Tag, 
  Building2, 
  Home, 
  Store, 
  Warehouse, 
  Building, 
  HardHat,
  MessageSquare,
  Play,
  X,
  Compass,
  List
} from 'lucide-react';
import { PremierLogo } from './PremierLogo';

interface MobileDeviceSimulatorProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onContactWhatsApp: (property: Property) => void;
  onCloseSimulator: () => void;
}

export const MobileDeviceSimulator: React.FC<MobileDeviceSimulatorProps> = ({
  properties,
  onSelectProperty,
  onContactWhatsApp,
  onCloseSimulator
}) => {
  const [activeTab, setActiveTab] = useState<'comprar' | 'rentar'>('comprar');
  const [activeNav, setActiveNav] = useState<'lista' | 'mapa' | 'videos'>('lista');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const categories = [
    { name: 'Departamentos', icon: <Building2 size={20} color="#FEA004" /> },
    { name: 'Casas', icon: <Home size={20} color="#FEA004" /> },
    { name: 'Oficinas', icon: <Briefcase size={20} color="#FEA004" /> },
    { name: 'Locales', icon: <Store size={20} color="#FEA004" /> },
    { name: 'Terrenos', icon: <MapPin size={20} color="#FEA004" /> },
    { name: 'Bodegas', icon: <Warehouse size={20} color="#FEA004" /> },
    { name: 'Edificios', icon: <Building size={20} color="#FEA004" /> },
    { name: 'Proyectos', icon: <HardHat size={20} color="#FEA004" /> }
  ];

  return (
    <div style={{
      padding: '2rem 1rem',
      background: '#213145',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Simulator Control Header */}
      <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
        <button
          onClick={onCloseSimulator}
          style={{
            background: '#FEA004',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '999px',
            padding: '0.65rem 1.5rem',
            fontWeight: 700,
            fontSize: '0.88rem',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(254, 160, 4, 0.4)',
            marginBottom: '0.5rem'
          }}
        >
          ← Volver a Pantalla Completa Escritorio
        </button>
        <div style={{ fontSize: '0.78rem', color: '#CBD5E1' }}>
          Simulación idéntica para Smartphone (390 × 844 px) · Propiedades Premier EC
        </div>
      </div>

      {/* Smartphone Outer Chassis matching Mockup */}
      <div style={{
        width: '390px',
        height: '844px',
        background: '#000000',
        borderRadius: '50px',
        padding: '12px',
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6), 0 0 0 4px #334155',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Phone Speaker & Dynamic Island */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120px',
          height: '30px',
          background: '#000000',
          borderRadius: '20px',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#111827',
            marginRight: '8px'
          }} />
          <div style={{
            width: '40px',
            height: '4px',
            borderRadius: '2px',
            background: '#1F2937'
          }} />
        </div>

        {/* Inner Phone Screen */}
        <div style={{
          flex: 1,
          background: '#FFFFFF',
          borderRadius: '40px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}>
          {/* iOS Status Bar */}
          <div style={{
            height: '44px',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: '#213145',
            zIndex: 90
          }}>
            <span>9:41</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.7rem' }}>📶</span>
              <span style={{ fontSize: '0.7rem' }}>ᯤ</span>
              <span style={{ fontSize: '0.75rem' }}>🔋</span>
            </div>
          </div>

          {/* Mobile App Header */}
          <div style={{
            padding: '0.5rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #F1F3F5',
            background: '#FFFFFF',
            zIndex: 80
          }}>
            <PremierLogo size="sm" variant="dark" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#213145' }}
                aria-label="Favoritos"
              >
                <Heart size={20} />
              </button>
              <button
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#213145' }}
                aria-label="Menú"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>

          {/* Scrollable Mobile Body */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}>
            {/* Mobile Hero Section with Panoramic Apartment Background */}
            <div style={{
              position: 'relative',
              padding: '1.5rem 1.25rem 2rem',
              backgroundImage: 'linear-gradient(rgba(33, 49, 69, 0.45), rgba(33, 49, 69, 0.75)), url(/images/prop-cumbaya-1.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: '#FFFFFF'
            }}>
              <h1 style={{
                fontSize: '1.55rem',
                fontWeight: 800,
                lineHeight: 1.2,
                margin: '0 0 0.5rem 0',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                Encuentra <br />
                la propiedad ideal <br />
                en <span style={{ color: '#FEA004' }}>Quito y sus valles</span>
              </h1>
              <p style={{
                fontSize: '0.78rem',
                lineHeight: 1.4,
                color: '#E2E8F0',
                margin: '0 0 1.25rem 0'
              }}>
                Casas, departamentos, oficinas, locales, terrenos y más. Compra, renta o invierte con expertos.
              </p>

              {/* Floating Mobile Search Card matching Mockup */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '1rem',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
                color: '#213145'
              }}>
                {/* Tabs Comprar / Rentar */}
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  marginBottom: '0.85rem'
                }}>
                  <button
                    onClick={() => setActiveTab('comprar')}
                    style={{
                      flex: 1,
                      padding: '0.45rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: activeTab === 'comprar' ? '#FEA004' : '#F1F3F5',
                      color: activeTab === 'comprar' ? '#FFFFFF' : '#64748B',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Comprar
                  </button>
                  <button
                    onClick={() => setActiveTab('rentar')}
                    style={{
                      flex: 1,
                      padding: '0.45rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: activeTab === 'rentar' ? '#FEA004' : '#F1F3F5',
                      color: activeTab === 'rentar' ? '#FFFFFF' : '#64748B',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Rentar
                  </button>
                </div>

                {/* Ubicación Field */}
                <div style={{
                  background: '#F8F9FA',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '0.4rem 0.65rem',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <MapPin size={16} color="#FEA004" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.6rem', color: '#64748B', fontWeight: 700 }}>Ubicación</div>
                    <div style={{ fontSize: '0.78rem', color: '#213145', fontWeight: 600 }}>Quito, Cumbayá, Valle...</div>
                  </div>
                </div>

                {/* Tipo de propiedad Field */}
                <div style={{
                  background: '#F8F9FA',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '0.4rem 0.65rem',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Briefcase size={16} color="#FEA004" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.6rem', color: '#64748B', fontWeight: 700 }}>Tipo de propiedad</div>
                    <div style={{ fontSize: '0.78rem', color: '#213145', fontWeight: 600 }}>Todos</div>
                  </div>
                </div>

                {/* Precio Field */}
                <div style={{
                  background: '#F8F9FA',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '0.4rem 0.65rem',
                  marginBottom: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Tag size={16} color="#FEA004" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.6rem', color: '#64748B', fontWeight: 700 }}>Precio</div>
                    <div style={{ fontSize: '0.78rem', color: '#213145', fontWeight: 600 }}>Desde - Hasta</div>
                  </div>
                </div>

                {/* Orange Search CTA Button */}
                <button
                  style={{
                    width: '100%',
                    background: '#FEA004',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.65rem',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 12px rgba(254, 160, 4, 0.4)'
                  }}
                >
                  <Search size={16} />
                  <span>Buscar</span>
                </button>
              </div>
            </div>

            {/* Categories 2x4 Grid matching Mockup */}
            <div style={{
              padding: '1.25rem 1rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0.85rem 0.4rem',
              background: '#FFFFFF',
              borderBottom: '1px solid #F1F3F5'
            }}>
              {categories.map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.35rem',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    border: '1.5px solid #FED7AA',
                    background: '#FFF7ED',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {c.icon}
                  </div>
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    color: '#213145',
                    textAlign: 'center',
                    lineHeight: 1.1
                  }}>
                    {c.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Section: Propiedades destacadas */}
            <div style={{ padding: '1rem 1.25rem 2rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.85rem'
              }}>
                <h2 style={{
                  fontSize: '1rem',
                  fontWeight: 800,
                  color: '#213145',
                  margin: 0
                }}>
                  Propiedades destacadas
                </h2>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#FEA004',
                  cursor: 'pointer'
                }}>
                  Ver todas →
                </span>
              </div>

              {/* Mobile Listing Cards matching Mockup */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {properties.slice(0, 3).map((p, idx) => (
                  <div
                    key={p.id}
                    onClick={() => onSelectProperty(p)}
                    style={{
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid #E2E8F0',
                      background: '#FFFFFF',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                      cursor: 'pointer'
                    }}
                  >
                    {/* Image with orange badge */}
                    <div style={{ position: 'relative', width: '100%', height: '170px' }}>
                      <img
                        src={p.image}
                        alt={p.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        background: '#FEA004',
                        color: '#FFFFFF',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '6px',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        textTransform: 'uppercase'
                      }}>
                        {idx === 1 ? 'En Renta' : 'En Venta'}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          background: 'rgba(255, 255, 255, 0.85)',
                          border: 'none',
                          borderRadius: '50%',
                          width: '28px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#213145'
                        }}
                      >
                        <Heart size={14} />
                      </button>
                    </div>

                    {/* Card Content */}
                    <div style={{ padding: '0.85rem' }}>
                      <div style={{
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        color: '#213145',
                        marginBottom: '0.15rem'
                      }}>
                        {p.type} | {p.microzone || p.sector}
                      </div>
                      <div style={{
                        fontSize: '0.72rem',
                        color: '#64748B',
                        marginBottom: '0.5rem'
                      }}>
                        {p.sector}, Quito
                      </div>

                      {/* Specs */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.85rem',
                        fontSize: '0.72rem',
                        color: '#475569',
                        marginBottom: '0.65rem'
                      }}>
                        <span>📐 {p.areaBuild} m²</span>
                        <span>🛏️ {p.bedrooms}</span>
                        <span>🚿 {p.bathrooms}</span>
                      </div>

                      {/* Price in bold */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span style={{
                          fontSize: '1.15rem',
                          fontWeight: 800,
                          color: '#FEA004'
                        }}>
                          $ {p.price.toLocaleString('es-EC')} {idx === 1 ? '/ mes' : ''}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onContactWhatsApp(p);
                          }}
                          style={{
                            background: '#25D366',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '0.35rem 0.65rem',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                          }}
                        >
                          <MessageSquare size={13} />
                          <span>WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar matching Wireframe: Mapa | Lista | Videos */}
          <div style={{
            height: '62px',
            borderTop: '1px solid #E2E8F0',
            background: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '0 0.5rem'
          }}>
            <button
              onClick={() => {
                setActiveNav('mapa');
                onCloseSimulator();
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.2rem',
                background: 'none',
                border: 'none',
                color: activeNav === 'mapa' ? '#FEA004' : '#64748B',
                cursor: 'pointer'
              }}
            >
              <Compass size={18} />
              <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>Mapa</span>
            </button>

            <button
              onClick={() => setActiveNav('lista')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.2rem',
                background: 'none',
                border: 'none',
                color: activeNav === 'lista' ? '#FEA004' : '#64748B',
                cursor: 'pointer'
              }}
            >
              <List size={18} />
              <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>Lista</span>
            </button>

            <button
              onClick={() => setIsVideoModalOpen(true)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.2rem',
                background: 'none',
                border: 'none',
                color: activeNav === 'videos' ? '#FEA004' : '#64748B',
                cursor: 'pointer'
              }}
            >
              <Play size={18} />
              <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>Videos 9:16</span>
            </button>
          </div>

          {/* iOS Home Indicator Bar */}
          <div style={{
            height: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FFFFFF'
          }}>
            <div style={{
              width: '134px',
              height: '4px',
              borderRadius: '2px',
              background: '#0F172A'
            }} />
          </div>
        </div>
      </div>

      {/* 9:16 Vertical Video Reels Modal (TikTok Style Wireframe 06) */}
      {isVideoModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.92)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            width: '360px',
            height: '640px',
            background: '#000000',
            borderRadius: '24px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)'
          }}>
            <button
              onClick={() => setIsVideoModalOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 20,
                background: 'rgba(0,0,0,0.6)',
                border: 'none',
                color: '#FFF',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            <video
              src="/videos/hero-mobile.webm"
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '1.25rem',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
              color: '#FFFFFF'
            }}>
              <span style={{
                background: '#FEA004',
                color: '#FFF',
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.65rem',
                fontWeight: 800,
                textTransform: 'uppercase'
              }}>
                Video 9:16 Vertical
              </span>
              <h3 style={{ margin: '0.5rem 0 0.2rem 0', fontSize: '1rem' }}>
                Penthouse Panorámico González Suárez
              </h3>
              <p style={{ margin: '0 0 0.85rem 0', fontSize: '0.78rem', color: '#E2E8F0' }}>
                $ 580.000 USD · 340 m² con vista directa al Pichincha
              </p>
              <button
                onClick={() => {
                  setIsVideoModalOpen(false);
                  onSelectProperty(properties[0]);
                  onCloseSimulator();
                }}
                style={{
                  width: '100%',
                  background: '#FEA004',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.65rem',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                CONTACTAR / VER FICHA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
