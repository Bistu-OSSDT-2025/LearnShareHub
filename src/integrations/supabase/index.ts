import { supabase } from './client';
import type { StudyGroup } from './types';

export const createStudyGroup = async (group: Omit<StudyGroup, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('study_groups')
    .insert([group])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};
