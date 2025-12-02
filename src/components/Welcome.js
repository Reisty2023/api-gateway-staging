import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Welcome() {
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleConnect = () => {
    setIsConnecting(true);
    
    // Simulate connection process and then navigate to connection screen
    setTimeout(() => {
      setIsConnecting(false);
      // Preserve URL parameters when navigating to connect
      navigate(`/connect${location.search}`);
    }, 1000);
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">Welcome to ReistyOS,</h1>
        <h2 className="welcome-subtitle-main">
          Your missing piece to your powerful<br />
          restaurant system!
        </h2>
        <p className="welcome-description">
          To get the best experience, we recommend setting up this integration.<br />
          This is necessary for us to have a source to generate your reports for you
        </p>
        <button 
          className={`connect-button ${isConnecting ? 'connecting' : ''}`}
          onClick={handleConnect}
          disabled={isConnecting}
        >
          {isConnecting ? (
            <>
              <div className="spinner"></div>
              Connecting...
            </>
          ) : (
            'Connect'
          )}
        </button>
      </div>
    </div>
  );
}

export default Welcome;