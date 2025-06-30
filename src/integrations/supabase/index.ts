import { supabase } from './client';
import type { Database } from './types';

type StudyGroup = Database['public']['Tables']['study_groups']['Insert'];

export async function createStudyGroup(studyGroup: StudyGroup) {
  const { data, error } = await supabase
    .from('study_groups')
    .insert(studyGroup)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create study group: ${error.message}`);
  }

  return data;
}

export async function getStudyGroups() {
  const { data, error } = await supabase
    .from('study_groups')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch study groups: ${error.message}`);
  }

  return data;
}

export async function getStudyGroupById(id: string) {
  const { data, error } = await supabase
    .from('study_groups')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch study group: ${error.message}`);
  }

  return data;
}

export async function signIn({ account, password }: { account: string, password: string }) {
  let email = account;
  if (!account.includes('@')) {
    const { data, error } = await supabase.rpc('find_email_by_username', { username_param: account });
    if (error) throw new Error(`查询用户名失败: ${error.message}`);
    if (!data) throw new Error('用户名不存在');
    email = data;
  }

  return supabase.auth.signInWithPassword({ email, password });
}

export { supabase } from './client';
export type { Database } from './types';
