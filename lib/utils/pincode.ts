/**
 * PIN Code to Location Conversion Utility
 * Converts Indian PIN codes to city and state information
 */

interface LocationData {
  city: string;
  state: string;
  region?: string;
}

// Comprehensive mapping of Indian PIN codes to locations
// This is a curated list of major PIN codes across India
const PIN_CODE_DATABASE: Record<string, LocationData> = {
  // Delhi
  '110001': { city: 'New Delhi', state: 'Delhi' },
  '110002': { city: 'New Delhi', state: 'Delhi' },
  '110003': { city: 'New Delhi', state: 'Delhi' },
  '110004': { city: 'New Delhi', state: 'Delhi' },
  '110005': { city: 'New Delhi', state: 'Delhi' },
  '110006': { city: 'New Delhi', state: 'Delhi' },
  '110007': { city: 'New Delhi', state: 'Delhi' },
  '110008': { city: 'New Delhi', state: 'Delhi' },
  '110009': { city: 'New Delhi', state: 'Delhi' },
  '110010': { city: 'New Delhi', state: 'Delhi' },
  '110011': { city: 'New Delhi', state: 'Delhi' },
  '110012': { city: 'New Delhi', state: 'Delhi' },
  '110013': { city: 'New Delhi', state: 'Delhi' },
  '110014': { city: 'New Delhi', state: 'Delhi' },
  '110015': { city: 'New Delhi', state: 'Delhi' },
  '110016': { city: 'New Delhi', state: 'Delhi' },
  '110017': { city: 'New Delhi', state: 'Delhi' },
  '110018': { city: 'New Delhi', state: 'Delhi' },
  '110019': { city: 'New Delhi', state: 'Delhi' },
  '110020': { city: 'New Delhi', state: 'Delhi' },
  '110021': { city: 'New Delhi', state: 'Delhi' },
  '110022': { city: 'New Delhi', state: 'Delhi' },
  '110023': { city: 'New Delhi', state: 'Delhi' },
  '110024': { city: 'New Delhi', state: 'Delhi' },
  '110025': { city: 'New Delhi', state: 'Delhi' },
  '110026': { city: 'New Delhi', state: 'Delhi' },
  '110027': { city: 'New Delhi', state: 'Delhi' },
  '110028': { city: 'New Delhi', state: 'Delhi' },
  '110029': { city: 'New Delhi', state: 'Delhi' },
  '110030': { city: 'New Delhi', state: 'Delhi' },
  '110031': { city: 'New Delhi', state: 'Delhi' },
  '110032': { city: 'New Delhi', state: 'Delhi' },
  '110033': { city: 'New Delhi', state: 'Delhi' },
  '110034': { city: 'New Delhi', state: 'Delhi' },
  '110035': { city: 'New Delhi', state: 'Delhi' },
  '110036': { city: 'New Delhi', state: 'Delhi' },
  '110037': { city: 'New Delhi', state: 'Delhi' },
  '110038': { city: 'New Delhi', state: 'Delhi' },
  '110039': { city: 'New Delhi', state: 'Delhi' },
  '110040': { city: 'New Delhi', state: 'Delhi' },
  '110041': { city: 'New Delhi', state: 'Delhi' },
  '110042': { city: 'New Delhi', state: 'Delhi' },
  '110043': { city: 'New Delhi', state: 'Delhi' },
  '110044': { city: 'New Delhi', state: 'Delhi' },
  '110045': { city: 'New Delhi', state: 'Delhi' },
  '110046': { city: 'New Delhi', state: 'Delhi' },
  '110047': { city: 'New Delhi', state: 'Delhi' },
  '110048': { city: 'New Delhi', state: 'Delhi' },
  '110049': { city: 'New Delhi', state: 'Delhi' },
  '110050': { city: 'New Delhi', state: 'Delhi' },
  '110051': { city: 'New Delhi', state: 'Delhi' },
  '110052': { city: 'New Delhi', state: 'Delhi' },
  '110053': { city: 'New Delhi', state: 'Delhi' },
  '110054': { city: 'New Delhi', state: 'Delhi' },
  '110055': { city: 'New Delhi', state: 'Delhi' },
  '110056': { city: 'New Delhi', state: 'Delhi' },
  '110057': { city: 'New Delhi', state: 'Delhi' },
  '110058': { city: 'New Delhi', state: 'Delhi' },
  '110059': { city: 'New Delhi', state: 'Delhi' },
  '110060': { city: 'New Delhi', state: 'Delhi' },
  '110061': { city: 'New Delhi', state: 'Delhi' },
  '110062': { city: 'New Delhi', state: 'Delhi' },
  '110063': { city: 'New Delhi', state: 'Delhi' },
  '110064': { city: 'New Delhi', state: 'Delhi' },
  '110065': { city: 'New Delhi', state: 'Delhi' },
  '110066': { city: 'New Delhi', state: 'Delhi' },
  '110067': { city: 'New Delhi', state: 'Delhi' },
  '110068': { city: 'New Delhi', state: 'Delhi' },
  '110069': { city: 'New Delhi', state: 'Delhi' },
  '110070': { city: 'New Delhi', state: 'Delhi' },
  '110071': { city: 'New Delhi', state: 'Delhi' },
  '110072': { city: 'New Delhi', state: 'Delhi' },
  '110073': { city: 'New Delhi', state: 'Delhi' },
  '110074': { city: 'New Delhi', state: 'Delhi' },
  '110075': { city: 'New Delhi', state: 'Delhi' },
  '110076': { city: 'New Delhi', state: 'Delhi' },
  '110077': { city: 'New Delhi', state: 'Delhi' },
  '110078': { city: 'New Delhi', state: 'Delhi' },
  '110079': { city: 'New Delhi', state: 'Delhi' },
  '110080': { city: 'New Delhi', state: 'Delhi' },
  '110081': { city: 'New Delhi', state: 'Delhi' },
  '110082': { city: 'New Delhi', state: 'Delhi' },
  '110083': { city: 'New Delhi', state: 'Delhi' },
  '110084': { city: 'New Delhi', state: 'Delhi' },
  '110085': { city: 'New Delhi', state: 'Delhi' },
  '110086': { city: 'New Delhi', state: 'Delhi' },
  '110087': { city: 'New Delhi', state: 'Delhi' },
  '110088': { city: 'New Delhi', state: 'Delhi' },
  '110089': { city: 'New Delhi', state: 'Delhi' },
  '110090': { city: 'New Delhi', state: 'Delhi' },
  '110091': { city: 'New Delhi', state: 'Delhi' },
  '110092': { city: 'New Delhi', state: 'Delhi' },
  '110093': { city: 'New Delhi', state: 'Delhi' },
  '110094': { city: 'New Delhi', state: 'Delhi' },
  '110095': { city: 'New Delhi', state: 'Delhi' },
  '110096': { city: 'New Delhi', state: 'Delhi' },
  '110097': { city: 'New Delhi', state: 'Delhi' },

  // Mumbai
  '400001': { city: 'Mumbai', state: 'Maharashtra' },
  '400002': { city: 'Mumbai', state: 'Maharashtra' },
  '400003': { city: 'Mumbai', state: 'Maharashtra' },
  '400004': { city: 'Mumbai', state: 'Maharashtra' },
  '400005': { city: 'Mumbai', state: 'Maharashtra' },
  '400006': { city: 'Mumbai', state: 'Maharashtra' },
  '400007': { city: 'Mumbai', state: 'Maharashtra' },
  '400008': { city: 'Mumbai', state: 'Maharashtra' },
  '400009': { city: 'Mumbai', state: 'Maharashtra' },
  '400010': { city: 'Mumbai', state: 'Maharashtra' },

  // Bangalore
  '560001': { city: 'Bangalore', state: 'Karnataka' },
  '560002': { city: 'Bangalore', state: 'Karnataka' },
  '560003': { city: 'Bangalore', state: 'Karnataka' },
  '560004': { city: 'Bangalore', state: 'Karnataka' },
  '560005': { city: 'Bangalore', state: 'Karnataka' },

  // Hyderabad
  '500001': { city: 'Hyderabad', state: 'Telangana' },
  '500002': { city: 'Hyderabad', state: 'Telangana' },
  '500003': { city: 'Hyderabad', state: 'Telangana' },
  '500004': { city: 'Hyderabad', state: 'Telangana' },

  // Chennai
  '600001': { city: 'Chennai', state: 'Tamil Nadu' },
  '600002': { city: 'Chennai', state: 'Tamil Nadu' },
  '600003': { city: 'Chennai', state: 'Tamil Nadu' },
  '600004': { city: 'Chennai', state: 'Tamil Nadu' },

  // Kolkata
  '700001': { city: 'Kolkata', state: 'West Bengal' },
  '700002': { city: 'Kolkata', state: 'West Bengal' },
  '700003': { city: 'Kolkata', state: 'West Bengal' },
  '700004': { city: 'Kolkata', state: 'West Bengal' },

  // Pune
  '411001': { city: 'Pune', state: 'Maharashtra' },
  '411002': { city: 'Pune', state: 'Maharashtra' },
  '411003': { city: 'Pune', state: 'Maharashtra' },
  '411004': { city: 'Pune', state: 'Maharashtra' },

  // Ahmedabad
  '380001': { city: 'Ahmedabad', state: 'Gujarat' },
  '380002': { city: 'Ahmedabad', state: 'Gujarat' },
  '380003': { city: 'Ahmedabad', state: 'Gujarat' },
  '380004': { city: 'Ahmedabad', state: 'Gujarat' },

  // Jaipur
  '302001': { city: 'Jaipur', state: 'Rajasthan' },
  '302002': { city: 'Jaipur', state: 'Rajasthan' },
  '302003': { city: 'Jaipur', state: 'Rajasthan' },
  '302004': { city: 'Jaipur', state: 'Rajasthan' },

  // Lucknow
  '226001': { city: 'Lucknow', state: 'Uttar Pradesh' },
  '226002': { city: 'Lucknow', state: 'Uttar Pradesh' },
  '226003': { city: 'Lucknow', state: 'Uttar Pradesh' },

  // Chandigarh
  '160001': { city: 'Chandigarh', state: 'Chandigarh' },
  '160002': { city: 'Chandigarh', state: 'Chandigarh' },
  '160003': { city: 'Chandigarh', state: 'Chandigarh' },
};

/**
 * Get location data from PIN code
 * @param pinCode - 6-digit Indian PIN code
 * @returns Location data (city, state) or null if not found
 */
export function getLocationFromPinCode(pinCode: string): LocationData | null {
  const cleanPinCode = pinCode.trim();
  
  // Validate PIN code format
  if (!/^\d{6}$/.test(cleanPinCode)) {
    return null;
  }

  return PIN_CODE_DATABASE[cleanPinCode] || null;
}

/**
 * Validate Indian PIN code format
 * @param pinCode - PIN code to validate
 * @returns true if valid, false otherwise
 */
export function isValidPinCode(pinCode: string): boolean {
  return /^\d{6}$/.test(pinCode.trim());
}

/**
 * Validate Indian phone number format
 * @param phone - Phone number to validate
 * @returns true if valid 10-digit Indian mobile number, false otherwise
 */
export function isValidIndianPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length === 10 && /^[6-9]/.test(cleanPhone);
}

/**
 * Format Indian phone number
 * @param phone - Raw phone number
 * @returns Formatted phone number (e.g., +91 98765 43210)
 */
export function formatIndianPhone(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length !== 10) return phone;
  return `+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`;
}

