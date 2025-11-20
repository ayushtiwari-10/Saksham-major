const successResponse = (message, data = null) => {
  return {
    success: true,
    message,
    data,
  };
};

const errorResponse = (message, statusCode = 500) => {
  return {
    success: false,
    message,
  };
};

module.exports = {
  successResponse,
  errorResponse,
};
