const config = {
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  UPLOAD_PATH: process.env.REACT_APP_UPLOAD_PATH || 'http://localhost:5000/uploads',
};

export default config;
