import { useEffect, useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Trash2 } from 'lucide-react';
import './AdminDashboard.css';
import { updateDoc } from 'firebase/firestore';
import { collection, onSnapshot, deleteDoc, updateDoc, doc, orderBy, query } from 'firebase/firestore';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setBookings(data);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this booking permanently?');
    if (!confirmed) return;

    const handleStatusChange = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'bookings', id), { status: newStatus });
    } catch (error) {
      console.error('Status update failed:', error);
      alert('Failed to update status. Please try again.');
    }
  };

    try {
      await deleteDoc(doc(db, 'bookings', id));
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete booking. Please try again.');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const services = ['All', 'Makeup', 'Nails', 'Gele Styling', 'Braiding'];
  const filteredBookings =
    filter === 'All' ? bookings : bookings.filter((b) => b.service === filter);

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1>Bookings</h1>
          <p>{bookings.length} total bookings</p>
        </div>
        <button className="admin-logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          Log Out
        </button>
      </div>

      <div className="admin-filters">
        {services.map((service) => (
          <button
            key={service}
            className={`admin-filter-btn ${filter === service ? 'active' : ''}`}
            onClick={() => setFilter(service)}
          >
            {service}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="admin-loading">Loading bookings...</p>
      ) : filteredBookings.length === 0 ? (
        <p className="admin-empty">No bookings yet.</p>
      ) : (
        <div className="admin-bookings-list">
          {filteredBookings.map((booking) => (
            <div className="admin-booking-card" key={booking.id}>
              <div className="admin-booking-header">
                <span className="admin-booking-service">{booking.service}</span>
                <button
                  className="admin-delete-btn"
                  onClick={() => handleDelete(booking.id)}
                  aria-label="Delete booking"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <select
                className={`admin-status-select status-${booking.status}`}
                value={booking.status}
                onChange={(e) => handleStatusChange(booking.id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <p className="admin-booking-type">{booking.type}</p>

              <div className="admin-booking-details">
                <p><strong>Client:</strong> {booking.name}</p>
                <p><strong>Phone:</strong> {booking.phone}</p>
                <p><strong>Email:</strong> {booking.email}</p>
                <p><strong>Date:</strong> {booking.date} at {booking.time}</p>
                <p><strong>Location:</strong> {booking.location}</p>
                {booking.address && (
                  <p><strong>Address:</strong> {booking.address}</p>
                )}
                {booking.price && (
                  <p><strong>Price:</strong> ₦{Number(booking.price).toLocaleString()}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}