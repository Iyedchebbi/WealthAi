
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://latysviedpawyirzsfsl.supabase.co';
const supabaseAnonKey = 'sb_publishable__1Y4IhDiwopO3tIsbepeUQ_HYG3QN1R';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
