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

export const createSubject = async (subject: Omit<Subject, 'id'>): Promise<Subject> => {
  const { data, error } = await supabase
    .from('subjects')
    .insert(subject)
    .select()
    .single();

  if (error) {
    throw new Error(`Error creating subject: ${error.message}`);
  }

  return data;
};
