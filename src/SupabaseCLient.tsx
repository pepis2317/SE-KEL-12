import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto'
const supabase = createClient("https://tqiixohvighfwvmhabhj.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxaWl4b2h2aWdoZnd2bWhhYmhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzNjE0MzEsImV4cCI6MjAyOTkzNzQzMX0.BUrNV-agn62hzdPQfKXhHizaSef3d9J1yt_w9Ad3F2k")
export default supabase