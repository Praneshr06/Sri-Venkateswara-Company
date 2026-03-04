const express = require('express');
const router = express.Router();
const {
  getStockItems,
  getStockSummary,
  getStockItem,
  createStockItem,
  updateStockItem,
  updateStockQuantity,
  deleteStockItem,
  getLowStockAlerts,
  exportStockData,
  getStockMovements
} = require('../controllers/stockController');

// GET /api/stock - Get all stock items with filtering and pagination
router.get('/', getStockItems);

// GET /api/stock/summary - Get stock summary statistics
router.get('/summary', getStockSummary);

// GET /api/stock/alerts - Get low stock and out of stock alerts
router.get('/alerts', getLowStockAlerts);

// GET /api/stock/export - Export stock data to CSV
router.get('/export', exportStockData);

// GET /api/stock/movements - Get stock movements/history
router.get('/movements', getStockMovements);

// GET /api/stock/:id - Get single stock item
router.get('/:id', getStockItem);

// POST /api/stock - Create new stock item
router.post('/', createStockItem);

// PUT /api/stock/:id - Update stock item
router.put('/:id', updateStockItem);

// PATCH /api/stock/:id/quantity - Update stock quantity
router.patch('/:id/quantity', updateStockQuantity);

// DELETE /api/stock/:id - Delete stock item
router.delete('/:id', deleteStockItem);

module.exports = router;
