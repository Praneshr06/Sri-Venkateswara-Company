import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

function Admin() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      navigate('/admin-login');
      return;
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    try {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      setUsers(storedUsers);
    } catch {
      setUsers([]);
    }

    try {
      const storedMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      setMessages(storedMessages.reverse()); // newest first
    } catch {
      setMessages([]);
    }
  }, [navigate]);

  const downloadMessagesCsv = () => {
    if (!messages.length) return;

    const headers = ['Date', 'Name', 'Email', 'Company', 'Phone', 'Subject', 'Message'];
    const rows = messages.map((m) => [
      m.createdAt || '',
      m.name || '',
      m.email || '',
      m.company || '',
      m.phone || '',
      m.subject || '',
      (m.message || '').replace(/\r?\n/g, ' '),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `contact_messages_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="admin-page">
      <div className="admin-hero">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <p>View user login details and contact messages</p>
        </div>
      </div>

      <div className="admin-content">
        <div className="container">
          {currentUser && (
            <section className="admin-section">
              <h2>Current Logged-in User</h2>
              <div className="admin-card">
                <p><strong>Name:</strong> {currentUser.name || '-'}</p>
                <p><strong>Email:</strong> {currentUser.email || '-'}</p>
                <p><strong>Company:</strong> {currentUser.company || '-'}</p>
                <p><strong>Phone:</strong> {currentUser.phone || '-'}</p>
              </div>
            </section>
          )}

          <section className="admin-section">
            <h2>Registered Users</h2>
            {users.length === 0 ? (
              <p className="admin-empty">No users recorded yet.</p>
            ) : (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Company</th>
                      <th>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, index) => (
                      <tr key={index}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.company || '-'}</td>
                        <td>{u.phone || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="admin-section">
            <div className="admin-section-header">
              <h2>Contact Messages</h2>
              {messages.length > 0 && (
                <button className="admin-download-btn" onClick={downloadMessagesCsv}>
                  Download CSV
                </button>
              )}
            </div>
            {messages.length === 0 ? (
              <p className="admin-empty">No contact messages recorded yet.</p>
            ) : (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Subject</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((m, index) => (
                      <tr key={index}>
                        <td>{m.createdAt || '-'}</td>
                        <td>{m.name}</td>
                        <td>{m.email}</td>
                        <td>{m.subject}</td>
                        <td className="admin-message-cell">{m.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Admin;


