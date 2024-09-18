import { useMemo } from 'react';
import countries from '../../data/countries.json';

export function useChartData(users) {
  return useMemo(() => {
    const countryData = countries.reduce((acc, country) => {
      acc[country] = users.filter((user) => user.country === country).length;
      return acc;
    }, {});

    const labels = Object.keys(countryData);
    const data = Object.values(countryData);

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#808080',
            '#FFC0CB',
          ],
        },
      ],
    };
  }, [users]);
}
