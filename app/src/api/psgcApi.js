export const fetchRegions = async () => {
  try {
    const response = await fetch('https://psgc.gitlab.io/api/regions/');
    return await response.json();
  } catch (error) {
    console.error('Error fetching regions:', error);
    throw error;
  }
};

export const fetchProvincesByRegion = async (regionCode) => {
  try {
    const response = await fetch(`https://psgc.gitlab.io/api/regions/${regionCode}/provinces`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching provinces:', error);
    throw error;
  }
};

export const fetchCitiesMunicipalitiesByProvince = async (provinceCode) => {
  try {
    const response = await fetch(`https://psgc.gitlab.io/api/provinces/${provinceCode}/cities-municipalities`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching cities/municipalities:', error);
    throw error;
  }
};

export const fetchBarangaysByCityMunicipality = async (cityMunicipalityCode) => {
  try {
    const response = await fetch(`https://psgc.gitlab.io/api/cities-municipalities/${cityMunicipalityCode}/barangays`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching barangays:', error);
    throw error;
  }
};