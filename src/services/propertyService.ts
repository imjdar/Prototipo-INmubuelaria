/**
 * DOMAIN SERVICE: Property Search, Filtering & Ranking Engine
 * Follows Open/Closed Principle (OCP) and Single Responsibility Principle (SRP).
 */

import { Property, FilterState } from '../types/property';
import { SortOption } from '../components/ActiveFilterChips';

export class PropertyService {
  /**
   * Applies multicriteria filter rules to a property dataset
   */
  public filterProperties(
    properties: Property[],
    filters: FilterState,
    searchQuery: string = ''
  ): Property[] {
    const trimmedQuery = searchQuery.trim().toLowerCase();

    return properties.filter((p) => {
      // 1. Text search matching
      if (trimmedQuery) {
        const matchesTitle = p.title.toLowerCase().includes(trimmedQuery);
        const matchesSector = p.sector.toLowerCase().includes(trimmedQuery);
        const matchesMicrozone = p.microzone.toLowerCase().includes(trimmedQuery);
        const matchesDesc = p.description.toLowerCase().includes(trimmedQuery);
        const matchesType = p.type.toLowerCase().includes(trimmedQuery);
        const matchesId = p.id.toLowerCase().includes(trimmedQuery);

        if (!matchesTitle && !matchesSector && !matchesMicrozone && !matchesDesc && !matchesType && !matchesId) {
          return false;
        }
      }

      // 2. Dropdown filters
      if (filters.sector !== 'ALL' && p.sector !== filters.sector) return false;
      if (filters.type !== 'ALL' && p.type !== filters.type) return false;
      if (p.price > filters.maxPrice) return false;

      // 3. Quito 2026 Hyperlocal criteria
      if (filters.hasGenerator && !p.features.hasGenerator) return false;
      if (filters.hasMetro && !p.features.hasMetro) return false;
      if (filters.hasDoubleGate && !p.features.hasDoubleGate) return false;
      if (filters.isValleyClimate && !p.features.isValleyClimate) return false;
      if (filters.biessEligible && !p.features.biessEligible) return false;
      if (filters.isAirbnb && !p.features.isAirbnb) return false;

      return true;
    });
  }

  /**
   * Sorts properties according to investor / buyer criteria
   */
  public sortProperties(properties: Property[], sortOption: SortOption): Property[] {
    switch (sortOption) {
      case 'price-asc':
        return [...properties].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...properties].sort((a, b) => b.price - a.price);
      case 'area-desc':
        return [...properties].sort((a, b) => b.areaBuild - a.areaBuild);
      case 'efficiency':
        return [...properties].sort((a, b) => (a.price / a.areaBuild) - (b.price / b.areaBuild));
      case 'featured':
      default:
        return [...properties];
    }
  }

  /**
   * Helper: calculates $/m² efficiency
   */
  public getPricePerSqm(property: Property): number {
    return property.areaBuild > 0 ? Math.round(property.price / property.areaBuild) : 0;
  }
}

export const propertyService = new PropertyService();
