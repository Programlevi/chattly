module.exports = (res, req, token) => {
  res.cookie('jwt', token, {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    sameSite: 'none'
  });
};
