import { createClient } from '@supabase/supabase-js';
// import { SUPAANONKEY, SUPAURL } from './_private';

// const url = SUPAURL;
// const anonKey = SUPAANONKEY;

// const supabase = createClient(url, anonKey);
const supabase = createClient(
    'https://kesjtpesrpqzggzndisj.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtlc2p0cGVzcnBxemdnem5kaXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM2NjIwMzAsImV4cCI6MTk5OTIzODAzMH0.-KJoIZ0AHAv72wx60HcMbkbikouArD2LccFwyFBahz4',
);
export default supabase;
