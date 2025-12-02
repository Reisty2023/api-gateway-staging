// API service for restaurant linking functionality

const API_BASE_URL = process.env.REACT_APP_BASE_URL || 'https://localhost:3000';
const apiKey = process.env.REACT_APP_API_KEY;

/**
 * Confirms the restaurant link with partner
 * @param {Object} params - The parameters for linking
 * @param {string} params.restaurantId - The restaurant ID
 * @param {string} params.partnerId - The partner ID  
 * @param {string} params.partnerVendorId - The partner vendor ID
 * @returns {Promise} - Promise that resolves to the API response
 */
export const confirmRestaurantLink = async ({ restaurantId, partnerId, partnerVendorId }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/partner/restaurants/link/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apiKey':apiKey
      },
      body: JSON.stringify({
        restaurantId,
        partnerId,
        partnerVendorId,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to confirm restaurant link:', error);
    throw error;
  }
};