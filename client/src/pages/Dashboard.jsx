import { useState, useEffect } from 'react';
import { getAnalytics, getLowStock } from '../services/api';
import DashboardCards from '../components/DashboardCards';
import LowStockAlert from '../components/LowStockAlert';

export default function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([getAnalytics(), getLowStock()])
      .then(([analyticsRes, lowRes]) => {
        setAnalytics(analyticsRes.data);
        setLowStock(lowRes.data);
      })
      .catch(err => setError('Failed to load dashboard data'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-red-600 text-center py-20">{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <DashboardCards analytics={analytics} />
      <LowStockAlert products={lowStock} />

      <div className="bg-white p-6 rounded-lg shadow mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
        <p className="text-gray-600">
          You are currently managing <strong>{analytics.totalProducts}</strong> products with a total value of
          <strong> ₹{analytics.totalInventoryValue.toLocaleString()}</strong>.
        </p>
      </div>
    </div>
  );
}