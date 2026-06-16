import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';

import styles from './country-list.module.css';

import { useMemo } from 'react';

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

export const CountryList = ({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) => {
  const filteredCountries = useMemo(() => {
    const preparedCountries = countries
      .filter((country) => {
        const matchesSearch = country.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRegion = !selectedRegion || country.data.some((d) => d.region === selectedRegion);
        return matchesSearch && matchesRegion;
      })
      .map((country) => ({
        country,
        population: getPopulationForYear(createYearDataMap(country.data), selectedYear) ?? 0,
      }));

      preparedCountries.sort((a, b) => {
        if (sortField === 'name') {
          return sortOrder === 'asc' ? a.country.id.localeCompare(b.country.id) : b.country.id.localeCompare(a.country.id);
        } 
          return sortOrder === 'asc' ? a.population - b.population : b.population - a.population;
      });

      return preparedCountries.map((item) => item.country);
  }, [
    countries,
    searchQuery,
    selectedRegion,
    selectedYear,
    sortField,
    sortOrder,
  ]);
    

  return (
    <div className={styles.countryList}>
      {filteredCountries.map((country) => (
        <CountryCard
          key={country.id}
          country={country}
          selectedYear={selectedYear}
          selectedColumns={selectedColumns}
        />
      ))}
    </div>
  );
};
