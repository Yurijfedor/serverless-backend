const { createClient } = require("@supabase/supabase-js");
// const testConnection = require("./helpers/testConnection");

const supabaseUrl = process.env.YOUR_SUPABASE_URL;
const supabaseKey = process.env.YOUR_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// testConnection();

module.exports = supabase;
