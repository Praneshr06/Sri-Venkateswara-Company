import './About.css';

function About() {
  return (
    <div className="about">
      <div className="about-hero">
        <div className="container">
          <h1>About Sri Venkateswara Company</h1>
          <p className="about-tagline">Excellence in Metal Fastener Manufacturing</p>
        </div>
      </div>

      <div className="about-content">
        <div className="container">
          <section className="about-section">
            <h2>Our Story</h2>
            <div className="about-image-container">
              <img 
                src="/images/facility/facility-1.jpg" 
                alt="Sri Venkateswara Company Facility"
                className="about-image"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <p>
              Sri Venkateswara Company has been a trusted leader in the rivet manufacturing industry for around 60 years. 
              We specialize in manufacturing rivets using advanced cold forging techniques, ensuring superior quality 
              and precision in every product we create.
            </p>
            <p>
              Based in Coimbatore, India, our manufacturing plant has grown from a small operation to a recognized 
              industry leader, serving 50 customers worldwide. Our commitment to quality, innovation, and customer 
              satisfaction has been the cornerstone of our success throughout our journey.
            </p>
            <p>
              With 100 dedicated employees, we continue to push the boundaries of manufacturing excellence, delivering 
              riveting quality that meets and exceeds international standards.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              To deliver superior quality metal fasteners that exceed industry standards while 
              maintaining competitive pricing and exceptional customer service. We strive to be the 
              preferred partner for businesses that demand reliability and precision in their 
              manufacturing processes.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>Quality First</h3>
                <p>Every product undergoes rigorous testing to ensure it meets our high standards.</p>
              </div>
              <div className="value-item">
                <h3>Innovation</h3>
                <p>Continuously improving our processes and products through research and development.</p>
              </div>
              <div className="value-item">
                <h3>Integrity</h3>
                <p>Building trust through transparent business practices and honest communication.</p>
              </div>
              <div className="value-item">
                <h3>Customer Focus</h3>
                <p>Putting our clients' needs first and delivering solutions that exceed expectations.</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>IATF 16949:2016 Certification</h2>
            <p>
              As of January 2018, Sri Venkateswara Company has officially obtained its IATF 16949 Certification, 
              which demonstrates our manufacturing process provides for continual improvement, prevents defects, 
              and reduces variation waste in our supply chain.
            </p>
            <p>
              The IATF (International Automotive Task Force) is an ad hoc group of automotive manufacturers and 
              their respective trade associations that exists to continually improve the quality of products to 
              automotive customers worldwide. This group has created the requirements to attain the IATF 16949 
              Certification in an effort to ensure that any group that manufactures and assembles parts for the 
              automotive industry maintain a certain level of quality.
            </p>
            <p>
              We proudly hold the IATF 16949 Certification as a testament to the production quality of our custom 
              manufactured rivets. This certification reflects our commitment to excellence and our dedication to 
              meeting the highest international standards in the automotive industry.
            </p>
          </section>

          <section className="about-section">
            <h2>Manufacturing Excellence</h2>
            <div className="about-images-grid">
              <div className="about-image-wrapper">
                <img 
                  src="/images/manufacturing/manufacturing-1.jpg" 
                  alt="Cold Forging Manufacturing Process"
                  className="about-image"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <p className="image-caption">Cold Forging Technology</p>
              </div>
              <div className="about-image-wrapper">
                <img 
                  src="/images/manufacturing/manufacturing-2.jpg" 
                  alt="Quality Control Process"
                  className="about-image"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <p className="image-caption">Quality Control & Testing</p>
              </div>
            </div>
            <p>
              Our state-of-the-art manufacturing facilities in Coimbatore, India, are equipped with advanced cold 
              forging technology and machinery. We employ skilled technicians and engineers who ensure that every 
              rivet meets precise specifications. Our quality control processes are IATF 16949 certified, and we 
              maintain strict adherence to international automotive industry standards.
            </p>
            <p>
              From raw material selection to finished product packaging, every step of our manufacturing process 
              is carefully monitored and controlled to guarantee consistency, reliability, and 100% quality assurance. 
              Our cold forging technique ensures superior strength and durability in every rivet we produce.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;

