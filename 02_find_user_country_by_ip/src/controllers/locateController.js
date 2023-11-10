const supabase = require("../db");
const ipToNumber = require("../helpers/ipFormater");

exports.getUserLocationByIp = async (req, res) => {
  try {
    // const userIP = req.userIP;
    const userIP = "89.28.176.5";

    console.log(userIP);

    const numericIP = ipToNumber(userIP);

    const { data, error } = await supabase
      .from("ip_ranges")
      .select("country_name", "country_code")
      .lte("ip_start", numericIP)
      .gte("ip_end", numericIP)
      .single();

    if (error) {
      throw error;
    }

    if (data) {
      res.send({
        ip: userIP,
        country_name: data.country_name,
        country_code: data.country_code,
      });
    } else {
      res.status(404).send("IP address not found in any range");
    }
  } catch (error) {
    res.status(500).send("Error locating IP address");
  }
};
