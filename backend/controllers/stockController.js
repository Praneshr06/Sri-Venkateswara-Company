const StockItem = require('../models/Stock');

// Get all stock items with filtering and sorting
const getStockItems = async (req, res) => {
  try {
    const {
      category = 'all',
      status = 'all',
      search = '',
      sortBy = 'name',
      sortOrder = 'asc',
      page = 1,
      limit = 50
    } = req.query;

    // Build query
    let query = {};
    
    if (category !== 'all') {
      query.category = category;
    }
    
    if (status !== 'all') {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
        { supplier: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [items, total] = await Promise.all([
      StockItem.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      StockItem.countDocuments(query)
    ]);

    // Get categories for filter dropdown
    const categories = await StockItem.distinct('category');

    res.json({
      items,
      categories: ['all', ...categories],
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching stock items:', error);
    res.status(500).json({ message: 'Error fetching stock items', error: error.message });
  }
};

// Get stock summary statistics
const getStockSummary = async (req, res) => {
  try {
    const summary = await StockItem.getStockSummary();
    const categoryBreakdown = await StockItem.getStockByCategory();
    const lowStockItems = await StockItem.getLowStockItems();
    const outOfStockItems = await StockItem.getOutOfStockItems();

    res.json({
      summary: summary[0] || {
        totalProducts: 0,
        totalValue: 0,
        totalStock: 0,
        statusBreakdown: []
      },
      categoryBreakdown,
      alerts: {
        lowStock: lowStockItems.length,
        outOfStock: outOfStockItems.length,
        lowStockItems: lowStockItems.slice(0, 5), // Show top 5
        outOfStockItems: outOfStockItems.slice(0, 5) // Show top 5
      }
    });
  } catch (error) {
    console.error('Error fetching stock summary:', error);
    res.status(500).json({ message: 'Error fetching stock summary', error: error.message });
  }
};

// Get single stock item by ID
const getStockItem = async (req, res) => {
  try {
    const item = await StockItem.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Stock item not found' });
    }

    res.json(item);
  } catch (error) {
    console.error('Error fetching stock item:', error);
    res.status(500).json({ message: 'Error fetching stock item', error: error.message });
  }
};

// Create new stock item
const createStockItem = async (req, res) => {
  try {
    const stockItem = new StockItem(req.body);
    await stockItem.save();
    
    res.status(201).json({
      message: 'Stock item created successfully',
      item: stockItem
    });
  } catch (error) {
    console.error('Error creating stock item:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({ message: 'SKU already exists' });
    }
    
    res.status(500).json({ message: 'Error creating stock item', error: error.message });
  }
};

// Update stock item
const updateStockItem = async (req, res) => {
  try {
    const item = await StockItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ message: 'Stock item not found' });
    }

    res.json({
      message: 'Stock item updated successfully',
      item
    });
  } catch (error) {
    console.error('Error updating stock item:', error);
    res.status(500).json({ message: 'Error updating stock item', error: error.message });
  }
};

// Update stock quantity
const updateStockQuantity = async (req, res) => {
  try {
    const { quantity, operation = 'add' } = req.body;
    const item = await StockItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Stock item not found' });
    }

    await item.updateStock(quantity, operation);

    res.json({
      message: 'Stock quantity updated successfully',
      item
    });
  } catch (error) {
    console.error('Error updating stock quantity:', error);
    res.status(500).json({ message: 'Error updating stock quantity', error: error.message });
  }
};

// Delete stock item
const deleteStockItem = async (req, res) => {
  try {
    const item = await StockItem.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Stock item not found' });
    }

    res.json({
      message: 'Stock item deleted successfully',
      item
    });
  } catch (error) {
    console.error('Error deleting stock item:', error);
    res.status(500).json({ message: 'Error deleting stock item', error: error.message });
  }
};

// Get low stock alerts
const getLowStockAlerts = async (req, res) => {
  try {
    const lowStockItems = await StockItem.getLowStockItems();
    const outOfStockItems = await StockItem.getOutOfStockItems();

    res.json({
      lowStock: lowStockItems,
      outOfStock: outOfStockItems,
      totalAlerts: lowStockItems.length + outOfStockItems.length
    });
  } catch (error) {
    console.error('Error fetching stock alerts:', error);
    res.status(500).json({ message: 'Error fetching stock alerts', error: error.message });
  }
};

// Export stock data to CSV
const exportStockData = async (req, res) => {
  try {
    const { category = 'all', status = 'all' } = req.query;

    let query = {};
    if (category !== 'all') query.category = category;
    if (status !== 'all') query.status = status;

    const items = await StockItem.find(query).sort({ name: 1 });

    // Convert to CSV format
    const headers = [
      'Name', 'SKU', 'Category', 'Current Stock', 'Min Stock', 'Max Stock',
      'Unit Price', 'Total Value', 'Status', 'Supplier', 'Location',
      'Reorder Level', 'Last Updated'
    ];

    const csvData = items.map(item => [
      item.name,
      item.sku,
      item.category,
      item.currentStock,
      item.minStock,
      item.maxStock,
      item.unitPrice,
      item.totalValue,
      item.status,
      item.supplier,
      item.location,
      item.reorderLevel,
      item.lastUpdated.toISOString().split('T')[0]
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="stock_report_${new Date().toISOString().split('T')[0]}.csv"`);
    res.send(csvContent);
  } catch (error) {
    console.error('Error exporting stock data:', error);
    res.status(500).json({ message: 'Error exporting stock data', error: error.message });
  }
};

// Get stock movements/history (placeholder for future implementation)
const getStockMovements = async (req, res) => {
  try {
    // This would require a separate StockMovement model
    // For now, return a placeholder response
    res.json({
      message: 'Stock movements feature coming soon',
      movements: []
    });
  } catch (error) {
    console.error('Error fetching stock movements:', error);
    res.status(500).json({ message: 'Error fetching stock movements', error: error.message });
  }
};

module.exports = {
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
};
