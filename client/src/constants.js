if (process.env.NODE_ENV === 'production') {
  exports.API_URL = process.env.REACT_APP_API_HOST;
} else {
  exports.API_URL = 'http://localhost:3001';
}
