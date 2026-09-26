// js/supabase-config.js

// Replace these placeholders with your actual Supabase credentials
const SUPABASE_URL = 'https://jlttlcgbgmueljlrgixu.supabase.co/';
const SUPABASE_ANON_KEY = 'sb_publishable_iHeCYxtjWuRjzqM41be9mA_iz89ZrGy';

// Initializes the Supabase client and makes `supabase` available globally
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);