let products = [
  {
    id: '1',
    name: 'Wireless Mouse',
    sku: 'WM-001',
    price: 29.99,
    stock: 45,
    minStockThreshold: 10,
  },
  {
    id: '2',
    name: 'Mechanical Keyboard',
    sku: 'MK-101',
    price: 89.99,
    stock: 8,
    minStockThreshold: 15,
  },
  {
    id: '3',
    name: 'USB-C Cable 2m',
    sku: 'UC-202',
    price: 12.49,
    stock: 0,
    minStockThreshold: 20,
  },
];

let nextId = 4;

const getAllProducts = () => products;

const getProductById = (id) => products.find(p => p.id === id);

const createProduct = (data) => {
  const newProduct = {
    id: String(nextId++),
    name: data.name.trim(),
    sku: data.sku.trim().toUpperCase(),
    price: Number(data.price),
    stock: Number(data.stock),
    minStockThreshold: Number(data.minStockThreshold || 5),
  };

  // Basic validation
  if (!newProduct.name) throw new Error('Name is required');
  if (!newProduct.sku) throw new Error('SKU is required');
  if (products.some(p => p.sku === newProduct.sku)) throw new Error('SKU already exists');
  if (newProduct.price < 0) throw new Error('Price cannot be negative');
  if (newProduct.stock < 0) throw new Error('Stock cannot be negative');
  if (newProduct.minStockThreshold < 0) throw new Error('Minimum threshold cannot be negative');

  products.push(newProduct);
  return newProduct;
};

const updateProduct = (id, data) => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Product not found');

  const updated = { ...products[index] };

  if ('name' in data) updated.name = data.name.trim();
  if ('sku' in data) {
    const newSku = data.sku.trim().toUpperCase();
    if (products.some(p => p.sku === newSku && p.id !== id)) {
      throw new Error('SKU already exists');
    }
    updated.sku = newSku;
  }
  if ('price' in data) {
    const price = Number(data.price);
    if (price < 0) throw new Error('Price cannot be negative');
    updated.price = price;
  }
  if ('stock' in data) {
    const stock = Number(data.stock);
    if (stock < 0) throw new Error('Stock cannot be negative');
    updated.stock = stock;
  }
  if ('minStockThreshold' in data) {
    const threshold = Number(data.minStockThreshold);
    if (threshold < 0) throw new Error('Threshold cannot be negative');
    updated.minStockThreshold = threshold;
  }

  products[index] = updated;
  return updated;
};

const deleteProduct = (id) => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Product not found');
  products.splice(index, 1);
  return true;
};

const getAnalytics = () => {
  const totalProducts = products.length;
  const totalInventoryValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= p.minStockThreshold).length;
  const outOfStock = products.filter(p => p.stock === 0).length;

  return {
    totalProducts,
    totalInventoryValue: Number(totalInventoryValue.toFixed(2)),
    lowStockItems: lowStock,
    outOfStockItems: outOfStock,
  };
};

const getLowStockProducts = () => {
  return products.filter(p => p.stock > 0 && p.stock <= p.minStockThreshold);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAnalytics,
  getLowStockProducts,
};