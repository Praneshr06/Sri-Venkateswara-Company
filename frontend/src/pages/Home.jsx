import './Home.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Around 60 Years of Travel",
      subtitle: "Manufacture rivets Using cold forging technique",
      description: "For Riveting Quality - Sri Venkateswara Company has been a trusted leader in manufacturing high-quality rivets using advanced cold forging techniques for over six decades."
    },
    {
      title: "IATF 16949:2016 Certified",
      subtitle: "International Quality Standards",
      description: "Proudly certified since 2018, demonstrating our commitment to continual improvement, defect prevention, and supply chain excellence."
    },
    {
      title: "100% Quality Assured",
      subtitle: "Precision Manufacturing Excellence",
      description: "Every rivet undergoes rigorous quality testing and inspection to ensure it meets the highest industry standards and customer expectations."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-slider">
          {slides.map((slide, index) => (
            <div 
              key={index} 
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <div className="hero-content">
                <h1>{slide.title}</h1>
                <p className="hero-subtitle">{slide.subtitle}</p>
                <p className="hero-description">
                  {slide.description}
                </p>
                <div className="hero-buttons">
                  <Link to="/products" className="btn btn-primary">View Products</Link>
                  <Link to="/contact" className="btn btn-secondary">Request a Quote</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose Sri Venkateswara Company</h2>
          <p className="features-subtitle">Six decades of excellence in rivet manufacturing</p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏭</div>
              <h3>Cold Forging Technology</h3>
              <p>Advanced cold forging techniques ensure superior strength, precision, and consistency in every rivet we manufacture.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast Delivery</h3>
              <p>Quick turnaround times and efficient logistics to keep your production lines running smoothly without delays.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>100% Quality Assured</h3>
              <p>Rigorous quality control and testing at every stage of production ensures zero-defect delivery to our customers.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>IATF 16949:2016 Certified</h3>
              <p>Internationally recognized quality certification demonstrating our commitment to automotive industry excellence.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">60</div>
              <div className="stat-label">Years</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100</div>
              <div className="stat-label">Employees</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50</div>
              <div className="stat-label">Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Quality Assured</div>
            </div>
          </div>
        </div>
      </section>

      <section className="certification">
        <div className="container">
          <div className="certification-content">
            <div className="certification-badge">
              <div className="badge-icon">🏆</div>
              <h2>IATF 16949:2016 Certified</h2>
              <p className="cert-year">Since January 2018</p>
            </div>
            <div className="certification-text">
              <h3>Global Quality Standards</h3>
              <p>
                Sri Venkateswara Company has officially obtained its IATF 16949 Certification, 
                demonstrating our manufacturing process provides for continual improvement, prevents defects, 
                and reduces variation waste in our supply chain.
              </p>
              <p>
                The IATF is an ad hoc group of automotive manufacturers and their respective trade associations that 
                exists to continually improve the quality of products to automotive customers worldwide. This certification 
                ensures that any group manufacturing and assembling parts for the automotive industry maintains the highest level of quality.
              </p>
              <div className="cert-highlights">
                <div className="highlight-item">
                  <span className="highlight-icon">✓</span>
                  <span>Continual Improvement</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">✓</span>
                  <span>Defect Prevention</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">✓</span>
                  <span>Supply Chain Excellence</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">✓</span>
                  <span>Automotive Industry Standards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Experience Quality Excellence?</h2>
            <p>Join our 50+ satisfied customers who trust us for their rivet manufacturing needs</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary btn-large">Get a Quote</Link>
              <Link to="/gallery" className="btn btn-secondary btn-large">View Our Work</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

