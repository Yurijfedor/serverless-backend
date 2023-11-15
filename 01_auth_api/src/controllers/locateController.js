const { createClient } = require("@supabase/supabase-js");
const { ipToNumber, numberToIp } = require("../helpers/ipFormater");

const publicSupabaseUrl = "https://gigbnqpcjwgghpfdqonj.supabase.co";
const publicSupabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpZ2JucXBjandnZ2hwZmRxb25qIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1OTIwNjMsImV4cCI6MjAxNTE2ODA2M30.k5oMkgJgjBi4KCbiw-0zRKfhFPr-zdUGXMXEAjX2Qec";

const supabase = createClient(publicSupabaseUrl, publicSupabaseKey);

exports.getUserLocationByIp = async (req, res) => {
  try {
    const userIP = req.userIP;
    // const userIP = "45.177.176.23";
    console.log(userIP);

    const numericIP = ipToNumber(userIP);
    const { data, error } = await supabase
      .from("ip_ranges")
      .select("*")
      .lte("ip_start", numericIP)
      .gte("ip_end", numericIP);

    if (error) {
      throw error;
    }

    if (data) {
      const startIp = numberToIp(data[0].ip_start);
      const endIp = numberToIp(data[0].ip_end);
      res.send({
        ip_range: `${startIp} - ${endIp}`,
        country_name: data[0].country_name,
        country_code: data[0].country_code,
      });
    } else {
      res.status(404).send("IP address not found in any range");
    }
  } catch (error) {
    res.status(500).send("Error locating IP address");
  }
};
