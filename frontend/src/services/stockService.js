import axios from 'axios';

// In Vite, environment variables are accessed via import.meta.env and must be
// prefixed with VITE_. Fallback to local backend when not configured.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// LocalStorage key for persisting stock items on the client
const STORAGE_KEY = 'stockItems';

// Default data for when backend is not available or storage is empty
const mockStockItems = [
  {
    id: '1',
    name: 'Industrial Pump Model A-100',
    sku: 'PUMP-A100',
    category: 'Pumps',
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    unitPrice: 15000,
    totalValue: 675000,
    status: 'in-stock',
    lastUpdated: '2024-03-04',
    supplier: 'ABC Manufacturing Co.',
    location: 'Warehouse A',
    reorderLevel: 25
  },
  {
    id: '2',
    name: 'Industrial Valve V-200',
    sku: 'VALVE-V200',
    category: 'Valves',
    currentStock: 12,
    minStock: 15,
    maxStock: 50,
    unitPrice: 8500,
    totalValue: 102000,
    status: 'low-stock',
    lastUpdated: '2024-03-04',
    supplier: 'XYZ Industrial Parts',
    location: 'Warehouse B',
    reorderLevel: 20
  },
  {
    id: '3',
    name: 'Steel Pipe Fittings Set',
    sku: 'FIT-PIPE-SET',
    category: 'Fittings',
    currentStock: 0,
    minStock: 10,
    maxStock: 100,
    unitPrice: 2500,
    totalValue: 0,
    status: 'out-of-stock',
    lastUpdated: '2024-03-03',
    supplier: 'Steel Components Ltd',
    location: 'Warehouse A',
    reorderLevel: 15
  },
  {
    id: '4',
    name: 'Hydraulic Cylinder H-500',
    sku: 'HYD-H500',
    category: 'Hydraulics',
    currentStock: 78,
    minStock: 25,
    maxStock: 150,
    unitPrice: 22000,
    totalValue: 1716000,
    status: 'in-stock',
    lastUpdated: '2024-03-04',
    supplier: 'HydroTech Systems',
    location: 'Warehouse C',
    reorderLevel: 30
  },
  {
    id: '5',
    name: 'Industrial Bearing B-300',
    sku: 'BEAR-B300',
    category: 'Bearings',
    currentStock: 156,
    minStock: 50,
    maxStock: 200,
    unitPrice: 1200,
    totalValue: 187200,
    status: 'in-stock',
    lastUpdated: '2024-03-04',
    supplier: 'Precision Bearings Co',
    location: 'Warehouse A',
    reorderLevel: 60
  }
];

// Helpers to read/write stock data in the browser
const loadStockItems = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Failed to read stock items from localStorage, using mock data:', e);
  }
  return mockStockItems;
};

const saveStockItems = (items) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn('Failed to save stock items to localStorage:', e);
  }
};

const stockService = {
  // Get all stock items with filtering and pagination
  getStockItems: async (filters = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stock`, { params: filters });
      return response.data;
    } catch (error) {
      console.warn('Backend not available, using local/mock data:', error.message);
      
      // Return locally stored data (seeded with mock data) when backend is not available
      let filteredItems = loadStockItems();
      
      // Apply filters
      if (filters.category && filters.category !== 'all') {
        filteredItems = filteredItems.filter(item => item.category === filters.category);
      }
      
      if (filters.status && filters.status !== 'all') {
        filteredItems = filteredItems.filter(item => item.status === filters.status);
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredItems = filteredItems.filter(item => 
          item.name.toLowerCase().includes(searchLower) ||
          item.sku.toLowerCase().includes(searchLower) ||
          item.supplier.toLowerCase().includes(searchLower)
        );
      }
      
      // Apply sorting
      if (filters.sortBy) {
        filteredItems.sort((a, b) => {
          let aValue = a[filters.sortBy];
          let bValue = b[filters.sortBy];
          
          if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
          }
          
          if (filters.sortOrder === 'desc') {
            return aValue < bValue ? 1 : -1;
          }
          return aValue > bValue ? 1 : -1;
        });
      }
      
      return {
        items: filteredItems,
        categories: ['all', 'Pumps', 'Valves', 'Fittings', 'Hydraulics', 'Bearings'],
        pagination: {
          page: 1,
          limit: 100,
          total: filteredItems.length,
          pages: 1
        }
      };
    }
  },

  // Get stock summary statistics
  getStockSummary: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stock/summary`);
      return response.data;
    } catch (error) {
      console.warn('Backend not available, using mock summary:', error.message);
      
      const items = loadStockItems();
      const summary = {
        totalProducts: items.length,
        totalValue: items.reduce((sum, item) => sum + item.totalValue, 0),
        totalStock: items.reduce((sum, item) => sum + item.currentStock, 0),
        statusBreakdown: [
          { status: 'in-stock', count: 3, totalValue: 2582800 },
          { status: 'low-stock', count: 1, totalValue: 102000 },
          { status: 'out-of-stock', count: 1, totalValue: 0 }
        ]
      };
      
      return {
        summary,
        categoryBreakdown: [
          { _id: 'Pumps', totalItems: 1, totalStock: 45, totalValue: 675000, avgStock: 45 },
          { _id: 'Valves', totalItems: 1, totalStock: 12, totalValue: 102000, avgStock: 12 },
          { _id: 'Fittings', totalItems: 1, totalStock: 0, totalValue: 0, avgStock: 0 },
          { _id: 'Hydraulics', totalItems: 1, totalStock: 78, totalValue: 1716000, avgStock: 78 },
          { _id: 'Bearings', totalItems: 1, totalStock: 156, totalValue: 187200, avgStock: 156 }
        ],
        alerts: {
          lowStock: 1,
          outOfStock: 1,
          lowStockItems: [mockStockItems[1]],
          outOfStockItems: [mockStockItems[2]]
        }
      };
    }
  },

  // Get low stock and out of stock alerts
  getStockAlerts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stock/alerts`);
      return response.data;
    } catch (error) {
      console.warn('Backend not available, using mock alerts:', error.message);
      
      const items = loadStockItems();
      const lowStockItems = items.filter(item => item.status === 'low-stock');
      const outOfStockItems = items.filter(item => item.status === 'out-of-stock');

      return {
        lowStock: lowStockItems,
        outOfStock: outOfStockItems,
        totalAlerts: lowStockItems.length + outOfStockItems.length
      };
    }
  },

  // Get single stock item
  getStockItem: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stock/${id}`);
      return response.data;
    } catch (error) {
      console.warn('Backend not available, using local/mock item:', error.message);
      const items = loadStockItems();
      const item = items.find(item => item.id === id);
      if (!item) {
        throw new Error('Stock item not found');
      }
      return item;
    }
  },

  // Create new stock item
  createStockItem: async (itemData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/stock`, itemData);
      return response.data;
    } catch (error) {
      console.warn('Backend not available, creating item locally:', error.message);
      const items = loadStockItems();
      const newItem = {
        ...itemData,
        id: Date.now().toString(),
        totalValue: itemData.currentStock * itemData.unitPrice,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      const updatedItems = [...items, newItem];
      saveStockItems(updatedItems);
      return {
        message: 'Stock item created successfully (local)',
        item: newItem
      };
    }
  },

  // Update stock item
  updateStockItem: async (id, itemData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/stock/${id}`, itemData);
      return response.data;
    } catch (error) {
      console.warn('Backend not available, updating item locally:', error.message);
      const items = loadStockItems();
      const updatedItems = items.map(item =>
        item.id === id
          ? {
              ...item,
              ...itemData,
              totalValue: itemData.currentStock * itemData.unitPrice
            }
          : item
      );
      saveStockItems(updatedItems);
      const updated = updatedItems.find(item => item.id === id);
      return {
        message: 'Stock item updated successfully (local)',
        item: updated
      };
    }
  },

  // Update stock quantity
  updateStockQuantity: async (id, quantity, operation = 'add') => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/stock/${id}/quantity`, {
        quantity,
        operation
      });
      return response.data;
    } catch (error) {
      console.warn('Backend not available, updating quantity locally:', error.message);
      const items = loadStockItems();
      const updatedItems = items.map(item => {
        if (item.id !== id) return item;

        let newStock = item.currentStock;
        if (operation === 'add') {
          newStock = item.currentStock + quantity;
        } else if (operation === 'subtract') {
          newStock = Math.max(0, item.currentStock - quantity);
        } else {
          newStock = quantity;
        }

        return {
          ...item,
          currentStock: newStock,
          totalValue: newStock * item.unitPrice,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      });
      saveStockItems(updatedItems);
      const updated = updatedItems.find(item => item.id === id);
      return {
        message: 'Stock quantity updated successfully (local)',
        item: updated
      };
    }
  },

  // Delete stock item
  deleteStockItem: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/stock/${id}`);
      return response.data;
    } catch (error) {
      console.warn('Backend not available, deleting item locally:', error.message);
      const items = loadStockItems();
      const remainingItems = items.filter(item => item.id !== id);
      saveStockItems(remainingItems);
      return {
        message: 'Stock item deleted successfully (local)',
        item: { id: id }
      };
    }
  },

  // Export stock data to CSV
  exportStockData: async (filters = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stock/export`, {
        params: filters,
        responseType: 'blob'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `stock_report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return response.data;
    } catch (error) {
      console.warn('Backend not available, generating mock CSV:', error.message);
      
      // Generate mock CSV
      const headers = [
        'Name', 'SKU', 'Category', 'Current Stock', 'Min Stock', 'Max Stock',
        'Unit Price', 'Total Value', 'Status', 'Supplier', 'Location',
        'Reorder Level', 'Last Updated'
      ];

      const csvData = loadStockItems().map(item => [
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
        item.lastUpdated
      ]);

      const csvContent = [
        headers.join(','),
        ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `stock_report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return { data: blob };
    }
  },

  // Get stock movements/history
  getStockMovements: async (itemId) => {
    try {
      const url = itemId 
        ? `${API_BASE_URL}/stock/movements?itemId=${itemId}`
        : `${API_BASE_URL}/stock/movements`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.warn('Backend not available, returning mock movements:', error.message);
      return {
        message: 'Stock movements feature coming soon (mock)',
        movements: []
      };
    }
  }
};

export default stockService;
