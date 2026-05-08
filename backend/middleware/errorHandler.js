// Global error handling middleware
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.status && err.message) {
    return res.status(err.status).json({ error: err.message });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'Validation failed', details: err.message });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token expired' });
  }

  // Default error response
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};

// 404 handler
export const notFoundHandler = (req, res) => {
  res.status(404).json({ error: 'Route not found' });
};
