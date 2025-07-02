import { supabase } from './index';
import { TablesInsert, Database } from './types';

export type StudyGroupInsert = TablesInsert<'study_groups'>;

export const createStudyGroup = async (data: StudyGroupInsert) => {
  const { error } = await supabase
    .from('study_groups')
    .insert([data]);

  if (error) {
    throw error;
  }

  return data;
};
