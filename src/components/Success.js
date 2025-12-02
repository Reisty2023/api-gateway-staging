import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Success() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleContinue = () => {
    // In a real app, this would navigate to the main dashboard
    // For now, clear the parameters since connection is complete
    navigate('/');
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="success-icon">✓</div>
        <h1 className="welcome-title">Connected Successfully!</h1>
        <p className="welcome-subtitle">
          Your ReistyOS system is now ready to use.
        </p>
        <button className="connect-button" onClick={handleContinue}>
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Success;