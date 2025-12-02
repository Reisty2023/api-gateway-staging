import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LiquidGlass } from '@specy/liquid-glass-react';

function Connecting() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if we have the success state from the previous API call
    const { success } = location.state || {};
    
    if (success) {
      // API call was successful, show connecting animation and then navigate to success
      const timer = setTimeout(() => {
        navigate('/success');
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      // No success state means we shouldn't be here, redirect to connect with URL parameters
      navigate(`/connect${location.search}`);
    }
  }, [navigate, location.state]);

  return (
    <div className="welcome-container">
      <LiquidGlass 
        className="connecting-dialog-glass"
        blur={25}
        opacity={0.08}
        borderRadius={16}
        saturation={1.2}
      >
        <div className="connecting-dialog">
          <div className="connecting-content">
            <div className="connecting-icon">
              <div className="spinner-large"></div>
            </div>
            <h2 className="connecting-title">Connecting Restaurant to Reisty</h2>
            <p className="connecting-subtitle">
              Connect your Restaurant POS to Reisty to easily manage tables
            </p>
          </div>
        </div>
      </LiquidGlass>
    </div>
  );
}

export default Connecting;