// Utility functions for URL parameter extraction

/**
 * Extracts restaurant linking parameters from the current URL
 * @returns {Object|null} - Object containing restaurantId, partnerId, partnerVendorId or null if missing
 */
export const extractRestaurantLinkParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  
  const restaurantId = urlParams.get('restaurantId');
  const partnerId = urlParams.get('partnerId');
  const partnerVendorId = urlParams.get('partnerVendorId');

  // Check if all required parameters are present
  if (!restaurantId || !partnerId || !partnerVendorId) {
    console.warn('Missing required URL parameters:', {
      restaurantId: !!restaurantId,
      partnerId: !!partnerId,
      partnerVendorId: !!partnerVendorId
    });
    return null;
  }

  return {
    restaurantId,
    partnerId,
    partnerVendorId
  };
};

/**
 * Validates if the current URL contains all required parameters for restaurant linking
 * @returns {boolean} - True if all parameters are present
 */
export const hasRequiredLinkParams = () => {
  const params = extractRestaurantLinkParams();
  return params !== null;
};