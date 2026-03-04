import './Services.css';
import { Link } from 'react-router-dom';

function Services() {
  const services = [
    {
      id: 1,
      name: 'Annealing',
      description: 'Heat treatment process that improves the ductility and reduces the hardness of metal rivets. Our annealing service ensures optimal material properties for better formability and performance.',
      benefits: [
        'Improved ductility and workability',
        'Reduced internal stresses',
        'Enhanced material properties',
        'Better machinability'
      ],
      icon: '🔥'
    },
    {
      id: 2,
      name: 'Ultra-Sonic Cleaning',
      description: 'Advanced ultrasonic cleaning technology that removes contaminants, oils, and debris from rivets using high-frequency sound waves. Ensures pristine surface quality for superior finishing.',
      benefits: [
        'Thorough cleaning of complex geometries',
        'Removal of microscopic contaminants',
        'Environmentally friendly process',
        'Consistent quality results'
      ],
      icon: '🌊'
    },
    {
      id: 3,
      name: 'Plating',
      description: 'Professional plating services that apply protective and decorative coatings to rivets. Our plating services enhance corrosion resistance, improve appearance, and extend product lifespan.',
      benefits: [
        'Enhanced corrosion resistance',
        'Improved aesthetic appearance',
        'Extended product lifespan',
        'Customizable finish options'
      ],
      icon: '✨'
    }
  ];

  return (
    <div className="services">
      <div className="services-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p className="services-subtitle">Comprehensive Manufacturing & Finishing Solutions</p>
        </div>
      </div>

      <div className="services-content">
        <div className="container">
          <p className="services-intro">
            In addition to manufacturing high-quality rivets using cold forging techniques, we offer 
            comprehensive finishing and treatment services to meet your specific requirements. Our 
            state-of-the-art facilities ensure that every rivet receives the perfect treatment for 
            optimal performance.
          </p>

          <div className="services-grid">
            {services.map(service => (
              <div key={service.id} className="service-card">
                <div className="service-header">
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.name}</h3>
                </div>
                <div className="service-body">
                  <p className="service-description">{service.description}</p>
                  <div className="service-benefits">
                    <h4>Key Benefits:</h4>
                    <ul>
                      {service.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="service-footer">
                  <Link to="/contact" className="btn-service">Request Service</Link>
                </div>
              </div>
            ))}
          </div>

          <div className="services-cta">
            <h2>Need Custom Services?</h2>
            <p>
              Our team of experts can work with you to develop custom solutions tailored to your 
              specific requirements. Contact us to discuss how we can help with your project.
            </p>
            <Link to="/contact" className="btn-cta">Contact Us Today</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;

