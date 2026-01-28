export default function ProductTableRow({ product, onEdit, onDelete }) {
  let statusColor = 'bg-green-100 text-green-800';
  let statusText = 'In Stock';

  if (product.stock === 0) {
    statusColor = 'bg-red-100 text-red-800';
    statusText = 'Out of Stock';
  } else if (product.stock <= product.minStockThreshold) {
    statusColor = 'bg-yellow-100 text-yellow-800';
    statusText = 'Low Stock';
  }

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-4 font-medium">{product.name}</td>
      <td className="p-4 text-gray-600 uppercase">{product.sku}</td>
      <td className="p-4">₹{Number(product.price).toFixed(2)}</td>
      <td className="p-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
          {product.stock} ({statusText})
        </span>
      </td>
      <td className="p-4 text-right space-x-3">
        <button
          onClick={() => onEdit(product)}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}