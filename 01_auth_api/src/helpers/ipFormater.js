const ipToNumber = (ip) => {
  let ipl = 0;
  ip.split(".").forEach((octet) => {
    ipl <<= 8;
    ipl += parseInt(octet);
  });
  return ipl >>> 0;
};

const numberToIp = (number) =>
  (number >>> 24) +
  "." +
  ((number >> 16) & 255) +
  "." +
  ((number >> 8) & 255) +
  "." +
  (number & 255);

module.exports = { ipToNumber, numberToIp };
