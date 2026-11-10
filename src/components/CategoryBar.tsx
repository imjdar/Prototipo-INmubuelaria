import React from 'react';
import { 
  Building2, 
  Home, 
  Briefcase, 
  Store, 
  MapPin, 
  Warehouse, 
  Building, 
  HardHat 
} from 'lucide-react';
import { PropertyType } from '../types/property';

interface CategoryItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  typeMapping: PropertyType | 'ALL';
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
      icon: <Building2 size={26} color="#FEA004" strokeWidth={1.8} />,
      typeMapping: 'Suite'
    },
    {
      id: 'casas',
      name: 'Casas',
      icon: <Home size={26} color="#FEA004" strokeWidth={1.8} />,
      typeMapping: 'Casa'
    },
    {
      id: 'oficinas',
      name: 'Oficinas',
      icon: <Briefcase size={26} color="#FEA004" strokeWidth={1.8} />,
      typeMapping: 'Penthouse'
    },
    {
      id: 'locales',
      name: 'Locales',
      icon: <Store size={26} color="#FEA004" strokeWidth={1.8} />,
      typeMapping: 'ALL'
    },
    {
      id: 'terrenos',
      name: 'Terrenos',
      icon: <MapPin size={26} color="#FEA004" strokeWidth={1.8} />,
      typeMapping: 'Terreno'
    },
    {
      id: 'bodegas',
      name: 'Bodegas / Galpones',
      icon: <Warehouse size={26} color="#FEA004" strokeWidth={1.8} />,
      typeMapping: 'ALL'
    },
    {
      id: 'edificios',
      name: 'Edificios',
      icon: <Building size={26} color="#FEA004" strokeWidth={1.8} />,
      typeMapping: 'ALL'
    },
    {
      id: 'proyectos',
      name: 'Proyectos',
      icon: <HardHat size={26} color="#FEA004" strokeWidth={1.8} />,
      typeMapping: 'ALL'
    }
  ];

  return (
    <section className="category-bar-section">
      <div className="category-bar-inner">
        <div className="category-cards-grid">
          {categories.map((cat) => {
            const isActive = cat.typeMapping === selectedType && selectedType !== 'ALL';
            return (
              <button
                key={cat.id}
                type="button"
                className={`category-item-card ${isActive ? 'is-active' : ''}`}
                onClick={() => {
                  if (isActive) {
                    onSelectCategory('ALL');
                  } else {
                    onSelectCategory(cat.typeMapping);
                  }
                }}
                aria-pressed={isActive}
              >
                <div className="category-icon-wrapper">
                  {cat.icon}
                </div>
                <span className="category-card-label">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
