const setIp = (req, res, next) => {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded ? forwarded.split(",")[0] : req.connection.remoteAddress;
  req.userIP = ip;
  next();
};

module.exports = setIp;
