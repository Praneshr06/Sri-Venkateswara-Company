import React, { useState, useEffect } from 'react';
import './StockReport.css';
import stockService from '../services/stockService';

const StockReport = () => {
  const [stockData, setStockData] = useState({
    products: [],
    categories: [],
    loading: true,
    error: null
  });
  
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    dateRange: 'month'
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchStockData();
  }, [filters, searchTerm, sortBy, sortOrder]);

  const fetchStockData = async () => {
    try {
      setStockData(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await stockService.getStockItems({
        category: filters.category,
        status: filters.status,
        search: searchTerm,
        sortBy,
        sortOrder,
        page: 1,
        limit: 100
      });

      setStockData({
        products: response.items,
        categories: response.categories,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setStockData(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load stock data'
      }));
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const exportToCSV = () => {
    try {
      stockService.exportStockData({
        category: filters.category,
        status: filters.status
      });
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-stock': return '#28a745';
      case 'low-stock': return '#ffc107';
      case 'out-of-stock': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStockLevel = (current, min, max) => {
    if (current === 0) return { level: 'out-of-stock', color: '#dc3545' };
    if (current <= min) return { level: 'low-stock', color: '#ffc107' };
    if (current >= max) return { level: 'overstock', color: '#17a2b8' };
    return { level: 'optimal', color: '#28a745' };
  };

  const calculateSummary = () => {
    const totalProducts = stockData.products.length;
    const totalValue = stockData.products.reduce((sum, p) => sum + p.totalValue, 0);
    const inStock = stockData.products.filter(p => p.status === 'in-stock').length;
    const lowStock = stockData.products.filter(p => p.status === 'low-stock').length;
    const outOfStock = stockData.products.filter(p => p.status === 'out-of-stock').length;
    
    return { totalProducts, totalValue, inStock, lowStock, outOfStock };
  };

  if (stockData.loading) {
    return (
      <div className="stock-report">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading stock data...</p>
        </div>
      </div>
    );
  }

  if (stockData.error) {
    return (
      <div className="stock-report">
        <div className="error">
          <p>{stockData.error}</p>
          <button onClick={fetchStockData} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  const summary = calculateSummary();

  return (
    <div className="stock-report">
      <div className="stock-hero">
        <h1>Stock Report</h1>
        <p>Comprehensive inventory management and analysis</p>
      </div>

      <div className="stock-container">
        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card">
            <div className="card-icon">📦</div>
            <div className="card-content">
              <h3>{summary.totalProducts}</h3>
              <p>Total Products</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon">💰</div>
            <div className="card-content">
              <h3>₹{summary.totalValue.toLocaleString('en-IN')}</h3>
              <p>Total Value</p>
            </div>
          </div>
          <div className="summary-card in-stock">
            <div className="card-icon">✅</div>
            <div className="card-content">
              <h3>{summary.inStock}</h3>
              <p>In Stock</p>
            </div>
          </div>
          <div className="summary-card low-stock">
            <div className="card-icon">⚠️</div>
            <div className="card-content">
              <h3>{summary.lowStock}</h3>
              <p>Low Stock</p>
            </div>
          </div>
          <div className="summary-card out-of-stock">
            <div className="card-icon">❌</div>
            <div className="card-content">
              <h3>{summary.outOfStock}</h3>
              <p>Out of Stock</p>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="controls-section">
          <div className="filters">
            <div className="filter-group">
              <label>Category:</label>
              <select 
                value={filters.category} 
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                {stockData.categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Status:</label>
              <select 
                value={filters.status} 
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Date Range:</label>
              <select 
                value={filters.dateRange} 
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
            </div>
          </div>

          <div className="search-export">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
            
            <button onClick={exportToCSV} className="export-btn">
              📊 Export CSV
            </button>
          </div>
        </div>

        {/* Stock Table */}
        <div className="stock-table-container">
          <table className="stock-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('name')} className="sortable">
                  Product Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('sku')} className="sortable">
                  SKU {sortBy === 'sku' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('category')} className="sortable">
                  Category {sortBy === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('currentStock')} className="sortable">
                  Current Stock {sortBy === 'currentStock' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('minStock')} className="sortable">
                  Min/Max {sortBy === 'minStock' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('unitPrice')} className="sortable">
                  Unit Price {sortBy === 'unitPrice' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('totalValue')} className="sortable">
                  Total Value {sortBy === 'totalValue' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th>Status</th>
                <th>Supplier</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {stockData.products.map(product => {
                const stockLevel = getStockLevel(product.currentStock, product.minStock, product.maxStock);
                return (
                  <tr key={product.id}>
                    <td className="product-name">{product.name}</td>
                    <td className="sku">{product.sku}</td>
                    <td className="category">{product.category}</td>
                    <td className="stock-quantity">
                      <span className="stock-number">{product.currentStock}</span>
                      <div className="stock-indicator" style={{ backgroundColor: stockLevel.color }}></div>
                    </td>
                    <td className="min-max">
                      {product.minStock} / {product.maxStock}
                    </td>
                    <td className="price">₹{product.unitPrice.toLocaleString('en-IN')}</td>
                    <td className="value">₹{product.totalValue.toLocaleString('en-IN')}</td>
                    <td className="status">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(product.status) }}
                      >
                        {product.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="supplier">{product.supplier}</td>
                    <td className="location">{product.location}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockReport;
