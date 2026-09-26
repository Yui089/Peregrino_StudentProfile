// js/supabase-config.js

// Replace these placeholders with your actual Supabase credentials
const SUPABASE_URL = 'https://xtlxnlsklzxjizvsaicr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_UQ0PRiatPEi_m8lk7bLylQ_2n6aP_gh';

window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
