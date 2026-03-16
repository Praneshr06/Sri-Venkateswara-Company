import './Products.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Products() {
  const [activeCategory, setActiveCategory] = useState('solid');
  const navigate = useNavigate();

  const solidProducts = [
    { name: 'Brass Round Head', material: 'Brass', description: 'Precision round head rivets for general applications', image: '/images/gallery/Brass Round head.jpg' },
    { name: 'Copper Mushroom Head', material: 'Copper', description: 'Durable mushroom head rivets with excellent conductivity', image: '/images/gallery/Copper Mushroom Head.jpg' },
    { name: 'MS Dimple Head', material: 'Mild Steel', description: 'Strong dimple head rivets for structural applications', image: '/images/gallery/MS Dimple head.jpg' },
    { name: 'MS Knurled Shank', material: 'Mild Steel', description: 'Knurled shank for enhanced grip and stability', image: '/images/gallery/MS Knurled Shank.jpg' },
    { name: 'MS Step Head', material: 'Mild Steel', description: 'Step head design for specialized applications', image: '/images/gallery/MS Step Head.jpg' },
    { name: 'MS Step Shank', material: 'Mild Steel', description: 'Step shank rivets for precise positioning', image: '/images/gallery/MS Step Shank.jpg' }
  ];

  const semiTubularProducts = [
    { name: 'Brass Mushroom Head', material: 'Brass', description: 'Lightweight mushroom head with semi-tubular design', image: '/images/gallery/Brass Mushroom Head.jpg' },
    { name: 'Copper Flat Head', material: 'Copper', description: 'Flat head semi-tubular rivets for smooth finishes', image: '/images/gallery/Copper Flat Head.jpg' },
    { name: 'MS Double Shank', material: 'Mild Steel', description: 'Double shank design for extra strength', image: '/images/gallery/MS Double Shank.jpg' },
    { name: 'MS Flat Head', material: 'Mild Steel', description: 'Standard flat head semi-tubular rivets', image: '/images/gallery/MS Flat Head.jpg' },
    { name: 'MS Hexagonal Head', material: 'Mild Steel', description: 'Hexagonal head for tool engagement', image: '/images/gallery/MS Hexgonal Head.jpg' },
    { name: 'SS Flat Head', material: 'Stainless Steel', description: 'Corrosion resistant flat head rivets', image: '/images/gallery/SS Flat Head.jpg' }
  ];

  const tubularProducts = [
    { name: 'Brass Flat Head', material: 'Brass', description: 'Lightweight flat head tubular rivets', image: '/images/gallery/Brass Flat Head.jpg' },
    { name: 'Brass Tubular', material: 'Brass', description: 'Standard brass tubular rivets', image: '/images/gallery/Brass Tubular.jpg' },
    { name: 'MS Button Rivet', material: 'Mild Steel', description: 'Decorative button head tubular rivets', image: '/images/gallery/MS Button Rivet.jpg' },
    { name: 'MS Counter Sink', material: 'Mild Steel', description: 'Counter sink tubular rivets for flush mounting', image: '/images/gallery/MS Counter Sink.jpg' },
    { name: 'MS Head Knurled', material: 'Mild Steel', description: 'Knurled head tubular rivets for grip', image: '/images/gallery/MS Head Knurled .jpg' },
    { name: 'MS Step Rivet', material: 'Mild Steel', description: 'Step design tubular rivets', image: '/images/gallery/MS Step Rivet.jpg' }
  ];

  const categories = [
    { id: 'solid', name: 'Solid Rivets', count: 6, icon: '🔩' },
    { id: 'semi-tubular', name: 'Semi-Tubular', count: 6, icon: '⚙️' },
    { id: 'tubular', name: 'Tubular', count: 6, icon: '🔧' }
  ];

  const getCurrentProducts = () => {
    switch (activeCategory) {
      case 'solid': return solidProducts;
      case 'semi-tubular': return semiTubularProducts;
      case 'tubular': return tubularProducts;
      default: return solidProducts;
    }
  };

  return (
    <div className="products">
      <div className="products-hero">
        <div className="container">
          <h1>Our Products</h1>
          <p className="products-subtitle">Premium Metal Fasteners for Every Application</p>
        </div>
      </div>

      <div className="products-content">
        <div className="container">
          <div className="products-intro">
            <h2>Premium Rivet Manufacturing</h2>
            <p>
              We manufacture high-quality rivets using advanced cold forging techniques to meet diverse industrial needs. 
              All our products are manufactured to exact specifications and undergo rigorous quality testing to ensure 
              100% quality assurance. Our IATF 16949:2016 certification guarantees that every rivet meets 
              international automotive industry standards.
            </p>
          </div>

          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
                <span className="category-count">({category.count} products)</span>
              </button>
            ))}
          </div>

          <div className="products-grid">
            {getCurrentProducts().map((product, index) => (
              <div key={index} className="product-card">
                <div className="product-image-container">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="product-icon-fallback" style={{ display: 'none' }}>
                    <div className="product-icon">🔩</div>
                  </div>
                </div>
                <div className="product-header">
                  <h3>{product.name}</h3>
                  <span className="product-material">{product.material}</span>
                </div>
                <div className="product-body">
                  <p className="product-description">{product.description}</p>
                  <div className="product-features">
                    <div className="feature-item">
                      <span className="feature-icon">✓</span>
                      <span>Cold Forged</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">✓</span>
                      <span>Quality Tested</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">✓</span>
                      <span>IATF Certified</span>
                    </div>
                  </div>
                </div>
                <div className="product-footer">
                  <button 
                    className="btn-product btn-secondary"
                    onClick={() => navigate('/products')}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="custom-products">
            <h2>Custom Manufacturing</h2>
            <p>
              Need a specific size, material, or finish? We offer custom manufacturing services to 
              meet your exact requirements. Our engineering team works closely with you to develop 
              solutions tailored to your application.
            </p>
            <Link to="/contact" className="btn-custom">Contact Us for Custom Orders</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;

