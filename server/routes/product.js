const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAnalytics,
  getLowStock,
} = require('../controllers/productController');

router.get('/', getProducts);
router.get('/analytics', getAnalytics);
router.get('/low-stock', getLowStock);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;