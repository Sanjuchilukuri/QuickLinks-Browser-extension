import { supabase } from '../supabaseClient';
import { ILinkItem } from '../interfaces/ILinkItem';
import { Supabase } from '../constants';

export const addLink = async (linkItem: ILinkItem) => {
  const { data, error } = await supabase
    .from(Supabase.TableName) 
    .insert([linkItem]);

  if (error) throw error;
  return data;
};


export const getAllLinks = async (): Promise<ILinkItem[]> => {
  const { data, error } = await supabase
    .from(Supabase.TableName)
    .select('*');

  if (error) throw error;
  return data as ILinkItem[];
};


export const updateLink = async (id: number, updatedData: Partial<ILinkItem>) => {
  const { data, error } = await supabase
    .from(Supabase.TableName)
    .update(updatedData)
    .eq('id', id);

  if (error) throw error;
  return data;
};


export const deleteLink = async (id: number) => {
  const { data, error } = await supabase
    .from(Supabase.TableName)
    .delete()
    .eq('id', id);

  if (error) throw error;
  return data;
};
