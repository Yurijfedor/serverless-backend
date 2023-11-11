const { createClient } = require("@supabase/supabase-js");

const publicSupabaseUrl = "https://gigbnqpcjwgghpfdqonj.supabase.co";
const publicSupabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpZ2JucXBjandnZ2hwZmRxb25qIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1OTIwNjMsImV4cCI6MjAxNTE2ODA2M30.k5oMkgJgjBi4KCbiw-0zRKfhFPr-zdUGXMXEAjX2Qec";
const supabase = createClient(publicSupabaseUrl, publicSupabaseKey);


module.exports = supabase;
