const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAnalytics,
  getLowStockProducts,
} = require('../data/products');

exports.getProducts = (req, res) => {
  try {
    const products = getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProduct = (req, res) => {
  try {
    const product = getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = (req, res) => {
  try {
    const product = createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateProduct = (req, res) => {
  try {
    const product = updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (err) {
    res.status(err.message.includes('not found') ? 404 : 400).json({ error: err.message });
  }
};

exports.deleteProduct = (req, res) => {
  try {
    deleteProduct(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(err.message.includes('not found') ? 404 : 500).json({ error: err.message });
  }
};

exports.getAnalytics = (req, res) => {
  try {
    const analytics = getAnalytics();
    res.json(analytics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLowStock = (req, res) => {
  try {
    const lowStock = getLowStockProducts();
    res.json(lowStock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};