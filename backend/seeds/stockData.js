const mongoose = require('mongoose');
const StockItem = require('../models/Stock');

const stockItems = [
  {
    name: 'Industrial Pump Model A-100',
    sku: 'PUMP-A100',
    category: 'Pumps',
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    unitPrice: 15000,
    supplier: 'ABC Manufacturing Co.',
    location: 'Warehouse A',
    reorderLevel: 25,
    description: 'High-efficiency centrifugal pump for industrial applications',
    specifications: {
      weight: 125,
      dimensions: '450x300x400 mm',
      material: 'Cast Iron',
      warranty: '2 years'
    },
    batchNumber: 'BATCH-2024-001'
  },
  {
    name: 'Industrial Valve V-200',
    sku: 'VALVE-V200',
    category: 'Valves',
    currentStock: 12,
    minStock: 15,
    maxStock: 50,
    unitPrice: 8500,
    supplier: 'XYZ Industrial Parts',
    location: 'Warehouse B',
    reorderLevel: 20,
    description: 'Heavy-duty gate valve for high-pressure applications',
    specifications: {
      weight: 45,
      dimensions: '200x150x250 mm',
      material: 'Stainless Steel',
      warranty: '3 years'
    },
    batchNumber: 'BATCH-2024-002'
  },
  {
    name: 'Steel Pipe Fittings Set',
    sku: 'FIT-PIPE-SET',
    category: 'Fittings',
    currentStock: 0,
    minStock: 10,
    maxStock: 100,
    unitPrice: 2500,
    supplier: 'Steel Components Ltd',
    location: 'Warehouse A',
    reorderLevel: 15,
    description: 'Complete set of steel pipe fittings for industrial plumbing',
    specifications: {
      weight: 8,
      dimensions: 'Various sizes',
      material: 'Carbon Steel',
      warranty: '1 year'
    },
    batchNumber: 'BATCH-2023-045'
  },
  {
    name: 'Hydraulic Cylinder H-500',
    sku: 'HYD-H500',
    category: 'Hydraulics',
    currentStock: 78,
    minStock: 25,
    maxStock: 150,
    unitPrice: 22000,
    supplier: 'HydroTech Systems',
    location: 'Warehouse C',
    reorderLevel: 30,
    description: 'Double-acting hydraulic cylinder with high pressure rating',
    specifications: {
      weight: 280,
      dimensions: '800x200x200 mm',
      material: 'Hardened Steel',
      warranty: '2 years'
    },
    batchNumber: 'BATCH-2024-003'
  },
  {
    name: 'Industrial Bearing B-300',
    sku: 'BEAR-B300',
    category: 'Bearings',
    currentStock: 156,
    minStock: 50,
    maxStock: 200,
    unitPrice: 1200,
    supplier: 'Precision Bearings Co',
    location: 'Warehouse A',
    reorderLevel: 60,
    description: 'High-precision ball bearing for industrial machinery',
    specifications: {
      weight: 2.5,
      dimensions: '300x150x100 mm',
      material: 'Chrome Steel',
      warranty: '1 year'
    },
    batchNumber: 'BATCH-2024-004'
  },
  {
    name: 'Electric Motor EM-750',
    sku: 'MOTOR-EM750',
    category: 'Motors',
    currentStock: 23,
    minStock: 15,
    maxStock: 60,
    unitPrice: 18000,
    supplier: 'Power Motors Inc',
    location: 'Warehouse B',
    reorderLevel: 20,
    description: 'Three-phase electric motor for industrial applications',
    specifications: {
      weight: 180,
      dimensions: '600x400x500 mm',
      material: 'Aluminum Alloy',
      warranty: '3 years'
    },
    batchNumber: 'BATCH-2024-005'
  },
  {
    name: 'Pressure Sensor PS-100',
    sku: 'SENS-PS100',
    category: 'Sensors',
    currentStock: 89,
    minStock: 30,
    maxStock: 150,
    unitPrice: 3500,
    supplier: 'SensorTech Solutions',
    location: 'Warehouse C',
    reorderLevel: 40,
    description: 'Digital pressure sensor with high accuracy',
    specifications: {
      weight: 0.5,
      dimensions: '100x80x60 mm',
      material: 'Stainless Steel',
      warranty: '2 years'
    },
    batchNumber: 'BATCH-2024-006'
  },
  {
    name: 'Industrial Filter IF-200',
    sku: 'FILT-IF200',
    category: 'Other',
    currentStock: 34,
    minStock: 20,
    maxStock: 80,
    unitPrice: 4200,
    supplier: 'Filter Systems Ltd',
    location: 'Warehouse A',
    reorderLevel: 25,
    description: 'Multi-stage industrial filtration system',
    specifications: {
      weight: 65,
      dimensions: '350x350x600 mm',
      material: 'Stainless Steel',
      warranty: '2 years'
    },
    batchNumber: 'BATCH-2024-007'
  },
  {
    name: 'Submersible Pump S-150',
    sku: 'PUMP-S150',
    category: 'Pumps',
    currentStock: 8,
    minStock: 10,
    maxStock: 40,
    unitPrice: 28000,
    supplier: 'ABC Manufacturing Co.',
    location: 'Warehouse B',
    reorderLevel: 15,
    description: 'Submersible pump for deep well applications',
    specifications: {
      weight: 95,
      dimensions: '300x300x800 mm',
      material: 'Cast Iron',
      warranty: '2 years'
    },
    batchNumber: 'BATCH-2024-008'
  },
  {
    name: 'Control Valve CV-300',
    sku: 'VALVE-CV300',
    category: 'Valves',
    currentStock: 67,
    minStock: 25,
    maxStock: 100,
    unitPrice: 12500,
    supplier: 'XYZ Industrial Parts',
    location: 'Warehouse C',
    reorderLevel: 30,
    description: 'Automated control valve with pneumatic actuator',
    specifications: {
      weight: 78,
      dimensions: '250x250x400 mm',
      material: 'Brass',
      warranty: '3 years'
    },
    batchNumber: 'BATCH-2024-009'
  },
  {
    name: 'Hydraulic Hose HH-50',
    sku: 'HOSE-HH50',
    category: 'Hydraulics',
    currentStock: 234,
    minStock: 100,
    maxStock: 300,
    unitPrice: 850,
    supplier: 'HydroTech Systems',
    location: 'Warehouse A',
    reorderLevel: 120,
    description: 'High-pressure hydraulic hose with steel reinforcement',
    specifications: {
      weight: 2.8,
      dimensions: '50mm diameter, 10m length',
      material: 'Synthetic Rubber',
      warranty: '1 year'
    },
    batchNumber: 'BATCH-2024-010'
  },
  {
    name: 'Linear Bearing LB-25',
    sku: 'BEAR-LB25',
    category: 'Bearings',
    currentStock: 145,
    minStock: 60,
    maxStock: 200,
    unitPrice: 2800,
    supplier: 'Precision Bearings Co',
    location: 'Warehouse B',
    reorderLevel: 80,
    description: 'Linear motion bearing for precision applications',
    specifications: {
      weight: 1.2,
      dimensions: '250x80x50 mm',
      material: 'Chrome Steel',
      warranty: '2 years'
    },
    batchNumber: 'BATCH-2024-011'
  },
  {
    name: 'Temperature Sensor TS-200',
    sku: 'SENS-TS200',
    category: 'Sensors',
    currentStock: 5,
    minStock: 15,
    maxStock: 50,
    unitPrice: 4200,
    supplier: 'SensorTech Solutions',
    location: 'Warehouse C',
    reorderLevel: 20,
    description: 'High-precision temperature sensor with digital output',
    specifications: {
      weight: 0.3,
      dimensions: '80x60x40 mm',
      material: 'Stainless Steel',
      warranty: '2 years'
    },
    batchNumber: 'BATCH-2023-089'
  },
  {
    name: 'Gear Motor GM-600',
    sku: 'MOTOR-GM600',
    category: 'Motors',
    currentStock: 19,
    minStock: 10,
    maxStock: 40,
    unitPrice: 32000,
    supplier: 'Power Motors Inc',
    location: 'Warehouse A',
    reorderLevel: 15,
    description: 'Gear motor with integrated gearbox for industrial applications',
    specifications: {
      weight: 220,
      dimensions: '500x400x450 mm',
      material: 'Cast Iron',
      warranty: '3 years'
    },
    batchNumber: 'BATCH-2024-012'
  },
  {
    name: 'Flow Sensor FS-100',
    sku: 'SENS-FS100',
    category: 'Sensors',
    currentStock: 112,
    minStock: 40,
    maxStock: 150,
    unitPrice: 5800,
    supplier: 'SensorTech Solutions',
    location: 'Warehouse B',
    reorderLevel: 50,
    description: 'Ultrasonic flow sensor for liquid measurement',
    specifications: {
      weight: 1.8,
      dimensions: '120x100x90 mm',
      material: 'PVC Housing',
      warranty: '2 years'
    },
    batchNumber: 'BATCH-2024-013'
  }
];

async function seedStockData() {
  try {
    // Clear existing stock data
    await StockItem.deleteMany({});
    
    // Insert new stock items
    await StockItem.insertMany(stockItems);
    
    console.log('Stock data seeded successfully');
    console.log(`Created ${stockItems.length} stock items`);
    
    // Display summary
    const summary = await StockItem.getStockSummary();
    console.log('Stock Summary:', summary[0]);
    
  } catch (error) {
    console.error('Error seeding stock data:', error);
  }
}

module.exports = seedStockData;

// Run if called directly
if (require.main === module) {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sri-venkateswara')
    .then(() => {
      console.log('Connected to MongoDB');
      return seedStockData();
    })
    .then(() => {
      console.log('Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Error:', error);
      process.exit(1);
    });
}
