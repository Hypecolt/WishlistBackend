const errorsMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message });

  return;
};

module.exports = errorsMiddleware;
