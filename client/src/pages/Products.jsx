import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/api';
import ProductForm from '../components/ProductForm';
import ProductTableRow from '../components/ProductTableRow';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || 'all';
  const sortBy = searchParams.get('sort') || 'name';
  const sortDir = searchParams.get('dir') || 'asc';

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products
    .filter(p => {
      if (search) {
        const term = search.toLowerCase();
        return p.name.toLowerCase().includes(term) || p.sku.toLowerCase().includes(term);
      }
      if (statusFilter !== 'all') {
        if (statusFilter === 'low') return p.stock > 0 && p.stock <= p.minStockThreshold;
        if (statusFilter === 'out') return p.stock === 0;
        if (statusFilter === 'in') return p.stock > p.minStockThreshold;
      }
      return true;
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortBy === 'price') cmp = a.price - b.price;
      else if (sortBy === 'stock') cmp = a.stock - b.stock;
      else if (sortBy === 'sku') cmp = a.sku.localeCompare(b.sku);

      return sortDir === 'desc' ? -cmp : cmp;
    });

  const handleSearchChange = (e) => {
    setSearchParams(prev => {
      prev.set('search', e.target.value);
      return prev;
    });
  };

  const handleFilterChange = (e) => {
    setSearchParams(prev => {
      prev.set('status', e.target.value);
      return prev;
    });
  };

  const handleSortChange = (e) => {
    const [field, direction] = e.target.value.split('-');
    setSearchParams(prev => {
      prev.set('sort', field);
      prev.set('dir', direction);
      return prev;
    });
  };

  const handleCreateOrUpdate = async (data) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, data);
      } else {
        await createProduct(data);
      }
      setShowForm(false);
      setEditingProduct(null);
      loadProducts();
    } catch (err) {
      alert(err.response?.data?.error || 'Something went wrong');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        {!showForm && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
          >
            + Add Product
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-12">
          <ProductForm
            product={editingProduct}
            onSubmit={handleCreateOrUpdate}
            onCancel={cancelForm}
          />
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={search}
            onChange={handleSearchChange}
            className="flex-1 border rounded px-4 py-2"
          />

          <select
            value={statusFilter}
            onChange={handleFilterChange}
            className="border rounded px-4 py-2"
          >
            <option value="all">All Products</option>
            <option value="in">In Stock</option>
            <option value="low">Low Stock</option>
            <option value="out">Out of Stock</option>
          </select>

          <select
            value={`${sortBy}-${sortDir}`}
            onChange={handleSortChange}
            className="border rounded px-4 py-2"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low → High)</option>
            <option value="price-desc">Price (High → Low)</option>
            <option value="stock-asc">Stock (Low → High)</option>
            <option value="stock-desc">Stock (High → Low)</option>
          </select>
        </div>
      </div>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No products found matching your criteria.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4 font-semibold">Name</th>
                <th className="text-left p-4 font-semibold">SKU</th>
                <th className="text-left p-4 font-semibold">Price</th>
                <th className="text-left p-4 font-semibold">Stock Status</th>
                <th className="text-right p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <ProductTableRow
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}