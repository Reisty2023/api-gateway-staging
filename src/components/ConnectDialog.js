import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LiquidGlass } from '@specy/liquid-glass-react';
import logo from '../assets/logo.svg'
import arrow from '../assets/arrow.svg'
import { confirmRestaurantLink } from '../services/api';
import { extractRestaurantLinkParams, hasRequiredLinkParams } from '../utils/urlParams';

function ConnectDialog() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [linkParams, setLinkParams] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract and validate URL parameters
    const params = extractRestaurantLinkParams();
    if (!params) {
      setError('Missing required parameters in URL');
      return;
    }
    setLinkParams(params);
  }, []);

  const handleAllowAccess = async () => {
    if (!linkParams) {
      setError('Missing required parameters');
      return;
    }

    setIsProcessing(true);
    setError(null);
    
    try {
      // Make API call to confirm restaurant link
      await confirmRestaurantLink(linkParams);
      
      // Navigate to connecting page on success with URL parameters preserved
      navigate(`/connecting${location.search}`, { state: { linkParams, success: true } });
    } catch (err) {
      setError('Failed to connect restaurant. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    navigate(`/${location.search}`);
  };

  const handleHowItWorks = () => {
    // This could open a modal or navigate to an info page
    alert('How it works: ReistyOS integrates with your restaurant systems to provide comprehensive analytics and management tools.');
  };

  return (
    <div className="welcome-container">
      <LiquidGlass 
        className="connect-dialog-glass"
        blur={25}
        opacity={0.08}
        borderRadius={16}
        saturation={1.2}
      >
        <div className="connect-dialog">
        <div className="connect-header">
          <div className="connect-icons">
            <div className="">
              <img src={logo} width={40}/>
            </div>
            {/* <div className="arrow-icon">→</div> */}
            <div className="">
                 <img src={arrow} width={40}/>
            </div>
          </div>
          <h2 className="connect-title">Connect Restaurant to Reisty</h2>
          <p className="connect-subtitle">
            Connect your Restaurant to Reisty to easily manage reservations
          </p>
        </div>

        <div className="divider"></div>

        <div className="permissions-section">
          <h3 className="permissions-title">Reisty would like to:</h3>
          <div className="permissions-list">
            <div className="permission-item">
              <div className="check-icon">✓</div>
              <span>Access sales data to track transactions and analyze revenue trends.</span>
            </div>
            <div className="permission-item">
              <div className="check-icon">✓</div>
              <span>Integrate payment processing systems for seamless transactions.</span>
            </div>
            <div className="permission-item">
              <div className="check-icon">✓</div>
              <span>Generate detailed reports and analytics to support data-driven decisions.</span>
            </div>
            <div className="permission-item">
              <div className="check-icon">✓</div>
              <span>Update discounts, offers, and promotions across multiple channels.</span>
            </div>
          </div>
        </div>

        <div className="divider"></div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠</span>
            {error}
          </div>
        )}

        <div className="connect-actions">
          <button className="info-button" onClick={handleHowItWorks}>
            <span className="info-icon">ℹ</span>
            How it works
          </button>
          <div className="action-buttons">
            <button 
              className="cancel-button" 
              onClick={handleCancel}
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button 
              className={`allow-button ${isProcessing ? 'processing' : ''}`}
              onClick={handleAllowAccess}
              disabled={isProcessing || !linkParams}
            >
              {isProcessing ? (
                <>
                  <div className="spinner-small"></div>
                  Processing...
                </>
              ) : (
                'Allow Access'
              )}
            </button>
          </div>
        </div>
        </div>
      </LiquidGlass>
    </div>
  );
}

export default ConnectDialog;