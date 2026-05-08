import { supabase } from '../lib/supabase';

export const supabaseService = {
  async list<T>(table: string, query?: any) {
    let request = supabase.from(table).select('*');
    if (query) {
      // Add filters if needed
    }
    const { data, error } = await request;
    if (error) throw error;
    return data as T[];
  },

  async getById<T>(table: string, id: string) {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as T;
  },

  async insert<T>(table: string, item: T) {
    const { data, error } = await supabase
      .from(table)
      .insert([item])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update<T>(table: string, id: string, changes: Partial<T>) {
    const { data, error } = await supabase
      .from(table)
      .update(changes)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  subscribe(table: string, callback: (payload: any) => void) {
    return supabase
      .channel(`public:${table}`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, callback)
      .subscribe();
  }
};
