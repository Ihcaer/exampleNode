const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server error.');
};

export default errorHandler;
