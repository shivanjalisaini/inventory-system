export default function DashboardCards({ analytics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">Total Products</h3>
        <p className="text-3xl font-bold mt-2">{analytics.totalProducts}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">Inventory Value</h3>
        <p className="text-3xl font-bold mt-2">₹{analytics.totalInventoryValue.toLocaleString()}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-400">
        <h3 className="text-gray-500 text-sm">Low Stock Items</h3>
        <p className="text-3xl font-bold mt-2 text-yellow-600">{analytics.lowStockItems}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
        <h3 className="text-gray-500 text-sm">Out of Stock</h3>
        <p className="text-3xl font-bold mt-2 text-red-600">{analytics.outOfStockItems}</p>
      </div>
    </div>
  );
}