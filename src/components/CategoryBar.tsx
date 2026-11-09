import React from 'react';
import { Building2, Home, Briefcase, Store, MapPin, Warehouse, Building, HardHat } from 'lucide-react';
import { PropertyType } from '../types/property';

interface CategoryItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  typeMapping?: PropertyType | 'ALL';
}

interface CategoryBarProps {
  selectedType: PropertyType | 'ALL';
  onSelectCategory: (type: PropertyType | 'ALL') => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({ selectedType, onSelectCategory }) => {
  const categories: CategoryItem[] = [
    {
      id: 'departamentos',
      name: 'Departamentos',
      icon: <Building2 size={24} color="#FEA004" />,
      typeMapping: 'Suite' // Mapped to apartments/suites
    },
    {
      id: 'casas',
      name: 'Casas',
      icon: <Home size={24} color="#FEA004" />,
      typeMapping: 'Casa'
    },
    {
      id: 'oficinas',
      name: 'Oficinas',
      icon: <Briefcase size={24} color="#FEA004" />,
      typeMapping: 'Penthouse'
    },
    {
      id: 'locales',
      name: 'Locales',
      icon: <Store size={24} color="#FEA004" />,
      typeMapping: 'ALL'
    },
    {
      id: 'terrenos',
      name: 'Terrenos',
      icon: <MapPin size={24} color="#FEA004" />,
      typeMapping: 'Terreno'
    },
    {
      id: 'bodegas',
      name: 'Bodegas / Galpones',
      icon: <Warehouse size={24} color="#FEA004" />,
      typeMapping: 'ALL'
    },
    {
      id: 'edificios',
      name: 'Edificios',
      icon: <Building size={24} color="#FEA004" />,
      typeMapping: 'ALL'
    },
    {
      id: 'proyectos',
      name: 'Proyectos',
      icon: <HardHat size={24} color="#FEA004" />,
      typeMapping: 'ALL'
    }
  ];

  return (
    <section className="category-bar-section" style={{
      background: '#FFFFFF',
      padding: '2rem 1.5rem 1.5rem',
      borderBottom: '1px solid #E2E8F0',
      overflowX: 'auto'
    }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        minWidth: '780px'
      }}>
        {categories.map((cat) => {
          const isActive = cat.typeMapping === selectedType && selectedType !== 'ALL';
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.typeMapping || 'ALL')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.65rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                flex: 1,
                padding: '0.75rem 0.5rem',
                borderRadius: '12px',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: isActive ? '#FEA004' : '#FFF7ED',
                border: `1.5px solid ${isActive ? '#FEA004' : '#FED7AA'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isActive ? '0 4px 12px rgba(254, 160, 4, 0.35)' : 'none',
                transition: 'all 0.2s'
              }}>
                {React.cloneElement(cat.icon as React.ReactElement<any>, {
                  color: isActive ? '#FFFFFF' : '#FEA004'
                })}
              </div>
              <span style={{
                fontSize: '0.82rem',
                fontWeight: isActive ? 700 : 600,
                color: isActive ? '#FEA004' : '#213145',
                textAlign: 'center',
                whiteSpace: 'nowrap'
              }}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
