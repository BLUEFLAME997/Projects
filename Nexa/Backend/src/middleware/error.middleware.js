
function handleError(err, req, res, next) {
  
  return res.status(err.statusCode).json({
    Message: err.message,
    success: err.success
  })

}

export default handleError;