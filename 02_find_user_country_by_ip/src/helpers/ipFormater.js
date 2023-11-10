const ipToNumber = (ip) => {
  let ipl = 0;
  ip.split(".").forEach((octet) => {
    ipl <<= 8;
    ipl += parseInt(octet);
  });
  return ipl >>> 0;
};

module.exports = ipToNumber;
