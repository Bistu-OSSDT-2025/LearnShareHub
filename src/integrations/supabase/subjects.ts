import { supabase } from './client';

export interface Subject {
  id: number;
  name: string;
  description: string;
}

export const getSubjects = async (): Promise<Subject[]> => {
  const { data, error } = await supabase
    .from('subjects')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    throw new Error(`Error fetching subjects: ${error.message}`);
  }

  return data;
};
