import { supabase } from '../supabaseClient';
import { ILinkItem } from '../interfaces/ILinkItem';
import { Supabase } from '../constants';

export const addLink = async (linkItem: ILinkItem) => {
  // alert("Hello");
   const { error } = await supabase
    .from(Supabase.TableName) 
    .insert([linkItem]);
  
  if (error)
  { 
    // alert(JSON.stringify(error, null, 2));
    throw error
  };
  
};


export const getAllLinks = async (userEmail:string): Promise<ILinkItem[]> => {
  
  const { data, error } = await supabase
    .from(Supabase.TableName)
    .select('*')
    .eq('userEmail', userEmail); ;

  if (error)
  { 
    // alert(JSON.stringify(error, null, 2));
    throw error
  };
  return data as ILinkItem[];
};


export const updateLink = async (id: string, updatedData: Partial<ILinkItem>) => {
  const { data, error } = await supabase
    .from(Supabase.TableName)
    .update(updatedData)
    .eq('id', id);

  if (error) throw error;
  return data;
};


export const deleteLink = async (id: string) => {
  const { data, error } = await supabase
    .from(Supabase.TableName)
    .delete()
    .eq('id', id);

  if (error) throw error;
  return data;
};
