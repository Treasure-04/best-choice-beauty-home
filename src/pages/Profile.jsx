import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import './Profile.css';

export default function Profile() {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setBookings(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div>
            <h1>My Bookings</h1>
            <p>{user?.displayName || user?.email}</p>
          </div>
          <button className="profile-logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            Log Out
          </button>
        </div>

        {loading ? (
          <p className="profile-loading">Loading your bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="profile-empty">
            You haven't made any bookings yet. Explore our services and book
            your first appointment!
          </p>
        ) : (
          <div className="profile-bookings-list">
            {bookings.map((booking) => (
              <div className="profile-booking-card" key={booking.id}>
                <div className="profile-booking-header">
                  <span className="profile-booking-service">{booking.service}</span>
                  <span className={`profile-booking-status status-${booking.status}`}>
                    {booking.status}
                  </span>
                </div>
                <p className="profile-booking-type">{booking.type}</p>
                <div className="profile-booking-details">
                  <p><strong>Date:</strong> {booking.date} at {booking.time}</p>
                  <p><strong>Location:</strong> {booking.location}</p>
                  {booking.price && (
                    <p><strong>Price:</strong> ₦{Number(booking.price).toLocaleString()}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}