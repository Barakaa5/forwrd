import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './statistics.module.css';
import { useUserStore } from '../../store/userStore';
import { useChartData } from './useChartData';

ChartJS.register(ArcElement, Tooltip, Legend);

function StatisticsPage() {
  const { users, isLoading } = useUserStore();
  const chartData = useChartData(users);

  return (
    <div className={styles.pageRoot}>
      <h1>User Statistics by Country</h1>
      {!isLoading ? (
        <div className={styles.chartContainer}>
          <Pie data={chartData} />
        </div>
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
}

export default StatisticsPage;
