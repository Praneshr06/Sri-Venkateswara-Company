import './Gallery.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'All Products', icon: '🔩' },
    { id: 'solid', name: 'Solid Rivets', icon: '🔩' },
    { id: 'semi-tubular', name: 'Semi-Tubular', icon: '⚙️' },
    { id: 'tubular', name: 'Tubular', icon: '🔧' },
    { id: 'manufacturing', name: 'Manufacturing', icon: '🏭' }
  ];

  const galleryItems = [
    // Solid rivets (from Products page)
    {
      id: 1,
      category: 'solid',
      title: 'Brass Round Head',
      description: 'Precision round head rivets for general applications',
      image: '/images/gallery/Brass Round head.jpg'
    },
    {
      id: 2,
      category: 'solid',
      title: 'Copper Mushroom Head',
      description: 'Durable mushroom head rivets with excellent conductivity',
      image: '/images/gallery/Copper Mushroom Head.jpg'
    },
    {
      id: 3,
      category: 'solid',
      title: 'MS Dimple Head',
      description: 'Strong dimple head rivets for structural applications',
      image: '/images/gallery/MS Dimple head.jpg'
    },
    {
      id: 4,
      category: 'solid',
      title: 'MS Knurled Shank',
      description: 'Knurled shank for enhanced grip and stability',
      image: '/images/gallery/MS Knurled Shank.jpg'
    },
    {
      id: 5,
      category: 'solid',
      title: 'MS Step Head',
      description: 'Step head design for specialized applications',
      image: '/images/gallery/MS Step Head.jpg'
    },
    {
      id: 6,
      category: 'solid',
      title: 'MS Step Shank',
      description: 'Step shank rivets for precise positioning',
      image: '/images/gallery/MS Step Shank.jpg'
    },

    // Semi-tubular rivets
    {
      id: 7,
      category: 'semi-tubular',
      title: 'Brass Mushroom Head',
      description: 'Lightweight mushroom head with semi-tubular design',
      image: '/images/gallery/Brass Mushroom Head.jpg'
    },
    {
      id: 8,
      category: 'semi-tubular',
      title: 'Copper Flat Head',
      description: 'Flat head semi-tubular rivets for smooth finishes',
      image: '/images/gallery/Copper Flat Head.jpg'
    },
    {
      id: 9,
      category: 'semi-tubular',
      title: 'MS Double Shank',
      description: 'Double shank design for extra strength',
      image: '/images/gallery/MS Double Shank.jpg'
    },
    {
      id: 10,
      category: 'semi-tubular',
      title: 'MS Flat Head',
      description: 'Standard flat head semi-tubular rivets',
      image: '/images/gallery/MS Flat Head.jpg'
    },
    {
      id: 11,
      category: 'semi-tubular',
      title: 'MS Hexagonal Head',
      description: 'Hexagonal head for tool engagement',
      image: '/images/gallery/MS Hexgonal Head.jpg'
    },
    {
      id: 12,
      category: 'semi-tubular',
      title: 'SS Flat Head',
      description: 'Corrosion resistant flat head rivets',
      image: '/images/gallery/SS Flat Head.jpg'
    },

    // Tubular rivets
    {
      id: 13,
      category: 'tubular',
      title: 'Brass Flat Head',
      description: 'Lightweight flat head tubular rivets',
      image: '/images/gallery/Brass Flat Head.jpg'
    },
    {
      id: 14,
      category: 'tubular',
      title: 'Brass Tubular',
      description: 'Standard brass tubular rivets',
      image: '/images/gallery/Brass Tubular.jpg'
    },
    {
      id: 15,
      category: 'tubular',
      title: 'MS Button Rivet',
      description: 'Decorative button head tubular rivets',
      image: '/images/gallery/MS Button Rivet.jpg'
    },
    {
      id: 16,
      category: 'tubular',
      title: 'MS Counter Sink',
      description: 'Counter sink tubular rivets for flush mounting',
      image: '/images/gallery/MS Counter Sink.jpg'
    },
    {
      id: 17,
      category: 'tubular',
      title: 'MS Head Knurled',
      description: 'Knurled head tubular rivets for grip',
      image: '/images/gallery/MS Head Knurled .jpg'
    },
    {
      id: 18,
      category: 'tubular',
      title: 'MS Step Rivet',
      description: 'Step design tubular rivets',
      image: '/images/gallery/MS Step Rivet.jpg'
    },

    // Manufacturing images (optional extra section)
    {
      id: 19,
      category: 'manufacturing',
      title: 'Cold Forging Process',
      description: 'Advanced cold forging manufacturing line',
      image: '/images/manufacturing/manufacturing-1.jpg'
    },
    {
      id: 20,
      category: 'manufacturing',
      title: 'Quality Control',
      description: 'Rigorous quality testing and inspection',
      image: '/images/manufacturing/manufacturing-2.jpg'
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="gallery">
      <div className="gallery-hero">
        <div className="container">
          <h1>Product Gallery</h1>
          <p className="gallery-subtitle">Showcasing Our Premium Rivet Manufacturing Excellence</p>
        </div>
      </div>

      <div className="gallery-content">
        <div className="container">
          <div className="gallery-filters">
            <div className="filter-tabs">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`filter-tab ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="filter-icon">{category.icon}</span>
                  <span className="filter-name">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="gallery-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="gallery-item">
                <div className="gallery-image">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="gallery-img"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
