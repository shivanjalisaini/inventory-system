export default function LowStockAlert({ products }) {
  if (products.length === 0) return null;

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded mb-8">
      <h3 className="text-lg font-semibold text-yellow-800 mb-4">⚠️ Low Stock Alerts</h3>
      <ul className="space-y-2">
        {products.map(p => (
          <li key={p.id} className="text-yellow-700">
            <strong>{p.name}</strong> (SKU: {p.sku}) – only <strong>{p.stock}</strong> left
            (threshold: {p.minStockThreshold})
          </li>
        ))}
      </ul>
    </div>
  );
}