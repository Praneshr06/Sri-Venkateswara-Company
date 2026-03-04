import { useState, useEffect } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Test backend connection on component mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch('/api/contact/test');
        if (response.ok) {
          console.log('✓ Backend connection successful');
        } else {
          console.warn('⚠ Backend responded but with error status');
        }
      } catch (err) {
        console.warn('⚠ Backend connection test failed - make sure backend is running');
      }
    };
    testConnection();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill in all required fields (Name, Email, Subject, Message)');
      setLoading(false);
      return;
    }

    if (formData.message.length < 10) {
      setError('Message must be at least 10 characters long');
      setLoading(false);
      return;
    }
    
    try {
      // Use proxy URL (Vite will forward to backend)
      const apiUrl = '/api/contact';
      
      console.log('Submitting contact form to:', apiUrl);
      console.log('Form data:', formData);
      
      // Create AbortController for timeout (more compatible)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      // Check if response is ok before parsing
      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText || `Server error: ${response.status}` };
        }
        // Handle validation errors
        if (errorData.errors && Array.isArray(errorData.errors)) {
          setError(errorData.errors.join(', '));
        } else {
          setError(errorData.message || errorData.error || 'Failed to send message. Please try again.');
        }
        return;
      }

      let data;
      try {
        data = await response.json();
        console.log('Response data:', data);
      } catch (jsonError) {
        console.error('Error parsing JSON response:', jsonError);
        const text = await response.text();
        console.error('Response text:', text);
        throw new Error('Invalid response from server');
      }

      // Persist message locally for the admin page
      try {
        const existing = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        existing.push({
          ...formData,
          createdAt: new Date().toLocaleString()
        });
        localStorage.setItem('contactMessages', JSON.stringify(existing));
      } catch (e) {
        console.warn('Failed to save contact message to localStorage:', e);
      }

      // If we get here, response was ok
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: ''
      });
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      if (error.name === 'AbortError' || error.name === 'TimeoutError') {
        setError('Request timed out. Please check if the backend server is running on http://localhost:5000');
      } else if (error.name === 'TypeError' && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
        setError('Cannot connect to server. Please make sure the backend server is running. Open terminal in the backend folder and run: npm run dev');
      } else if (error.message) {
        setError(`Error: ${error.message}`);
      } else {
        setError('Network error. Please check if the backend server is running and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact">
      <div className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p className="contact-subtitle">Get in Touch with Our Team</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Contact Information</h2>
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div>
                  <h3>Address</h3>
                  <p>S.F No: 626/1-2, Idikarai Road,<br />Periyanaickenpalayam,<br />Coimbatore, Tamil Nadu, 641022<br />India</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">📞</div>
                <div>
                  <h3>Phone</h3>
                  <p>+91 (904) 707-7874</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">✉️</div>
                <div>
                  <h3>Email</h3>
                  <p>marketing@srivenkateswaracompany.in</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">🕒</div>
                <div>
                  <h3>Business Hours</h3>
                  <p>Monday - Friday: 8:00 AM - 6:00 PM<br />Saturday: 9:00 AM - 2:00 PM<br />Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              <h2>Send Us a Message</h2>
              {submitted && (
                <div className="success-message">
                  ✓ Thank you! Your message has been sent. We'll get back to you soon.
                </div>
              )}
              {error && (
                <div className="error-message">
                  ✗ {error}
                </div>
              )}
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

