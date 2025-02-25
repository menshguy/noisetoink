import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
    }
  }, [navigate]);

  return (
    <div className="welcome-container">
      <h1>Welcome to Noise2Ink</h1>
      <div className="welcome-content">
        <p>Thank you for joining our community! We're excited to have you here.</p>
        <p>Start exploring our platform to discover amazing AI-generated art and create your own unique pieces.</p>
      </div>
    </div>
  );
};

export default Welcome;
