const mongoose = require('mongoose');

const stockItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Pumps', 'Valves', 'Fittings', 'Hydraulics', 'Bearings', 'Motors', 'Sensors', 'Other']
  },
  currentStock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  minStock: {
    type: Number,
    required: true,
    min: 0
  },
  maxStock: {
    type: Number,
    required: true,
    min: 0
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0
  },
  totalValue: {
    type: Number,
    default: function() {
      return this.currentStock * this.unitPrice;
    }
  },
  status: {
    type: String,
    enum: ['in-stock', 'low-stock', 'out-of-stock', 'overstock'],
    default: function() {
      if (this.currentStock === 0) return 'out-of-stock';
      if (this.currentStock <= this.minStock) return 'low-stock';
      if (this.currentStock >= this.maxStock) return 'overstock';
      return 'in-stock';
    }
  },
  supplier: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  reorderLevel: {
    type: Number,
    required: true,
    min: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    trim: true
  },
  specifications: {
    weight: Number,
    dimensions: String,
    material: String,
    warranty: String
  },
  batchNumber: {
    type: String,
    trim: true
  },
  expiryDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes for better performance
stockItemSchema.index({ sku: 1 });
stockItemSchema.index({ category: 1 });
stockItemSchema.index({ status: 1 });
stockItemSchema.index({ name: 'text', sku: 'text', supplier: 'text' });

// Virtual for stock level percentage
stockItemSchema.virtual('stockLevel').get(function() {
  if (this.maxStock === 0) return 0;
  return Math.round((this.currentStock / this.maxStock) * 100);
});

// Virtual for stock value
stockItemSchema.virtual('stockValue').get(function() {
  return this.currentStock * this.unitPrice;
});

// Pre-save middleware to update status and total value
stockItemSchema.pre('save', function(next) {
  // Update status based on stock levels
  if (this.currentStock === 0) {
    this.status = 'out-of-stock';
  } else if (this.currentStock <= this.minStock) {
    this.status = 'low-stock';
  } else if (this.currentStock >= this.maxStock) {
    this.status = 'overstock';
  } else {
    this.status = 'in-stock';
  }
  
  // Update total value
  this.totalValue = this.currentStock * this.unitPrice;
  
  // Update last updated timestamp
  this.lastUpdated = new Date();
  
  next();
});

// Static methods
stockItemSchema.statics.getLowStockItems = function() {
  return this.find({ status: 'low-stock' }).sort({ currentStock: 1 });
};

stockItemSchema.statics.getOutOfStockItems = function() {
  return this.find({ status: 'out-of-stock' }).sort({ lastUpdated: -1 });
};

stockItemSchema.statics.getOverstockItems = function() {
  return this.find({ status: 'overstock' }).sort({ currentStock: -1 });
};

stockItemSchema.statics.getStockByCategory = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$category',
        totalItems: { $sum: 1 },
        totalStock: { $sum: '$currentStock' },
        totalValue: { $sum: '$totalValue' },
        avgStock: { $avg: '$currentStock' }
      }
    },
    { $sort: { totalValue: -1 } }
  ]);
};

stockItemSchema.statics.getStockSummary = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalValue: { $sum: '$totalValue' },
        totalStock: { $sum: '$currentStock' }
      }
    },
    {
      $group: {
        _id: null,
        totalProducts: { $sum: '$count' },
        totalValue: { $sum: '$totalValue' },
        totalStock: { $sum: '$totalStock' },
        statusBreakdown: {
          $push: {
            status: '$_id',
            count: '$count',
            totalValue: '$totalValue'
          }
        }
      }
    }
  ]);
};

// Instance methods
stockItemSchema.methods.needsReorder = function() {
  return this.currentStock <= this.reorderLevel;
};

stockItemSchema.methods.updateStock = function(quantity, operation = 'add') {
  if (operation === 'add') {
    this.currentStock += quantity;
  } else if (operation === 'subtract') {
    this.currentStock = Math.max(0, this.currentStock - quantity);
  } else if (operation === 'set') {
    this.currentStock = Math.max(0, quantity);
  }
  
  return this.save();
};

const StockItem = mongoose.model('StockItem', stockItemSchema);

module.exports = StockItem;
