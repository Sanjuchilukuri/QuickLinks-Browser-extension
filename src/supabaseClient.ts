import { createClient } from '@supabase/supabase-js';
import { Supabase } from './constants';

export const supabase = createClient(Supabase.ProjectUrl, Supabase.AnonKey);
