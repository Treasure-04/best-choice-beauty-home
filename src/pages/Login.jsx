import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config';
import './ClientAuth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const [resetSending, setResetSending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError('Invalid email or password.');
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email above first, then tap "Forgot Password."');
      return;
    }

    setResetSending(true);
    setResetMessage('');
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage('Password reset link sent! Check your email inbox.');
    } catch (err) {
      console.error(err);
      setError('Could not send reset email. Please check the address and try again.');
    } finally {
      setResetSending(false);
    }
  };

  return (
    <div className="client-auth-page">
      <form className="client-auth-form" onSubmit={handleSubmit}>
        <h1>Welcome Back</h1>
        <p className="client-auth-subtitle">Log in to book and manage your appointments</p>

        <label className="booking-field">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="booking-field">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {error && <p className="booking-error">{error}</p>}
        {resetMessage && <p className="client-auth-success">{resetMessage}</p>}

        <button className="btn-gold" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>

        <button
          type="button"
          className="client-auth-forgot-btn"
          onClick={handleForgotPassword}
          disabled={resetSending}
        >
          {resetSending ? 'Sending...' : 'Forgot Password?'}
        </button>

        <p className="client-auth-switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>

        <p className="client-auth-admin-link">
          <Link to="/admin/login">Login as Admin</Link>
        </p>
      </form>
    </div>
  );
}