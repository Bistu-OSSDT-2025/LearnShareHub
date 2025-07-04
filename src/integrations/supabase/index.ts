// Supabase 集成模块入口文件
import { supabase } from './client';

export * from './studyGroups';
export * from './storage';
export * from './subjects';
export * from './posts';
export * from './types';

export async function signIn({ account, password }: { account: string, password: string }) {
  let email = account;
  if (!account.includes('@')) {
    // Assuming you have an RPC function to find email by username
    const { data, error } = await supabase.rpc('find_email_by_username', { username_param: account });
    if (error) throw new Error(`查询用户名失败: ${error.message}`);
    if (!data) throw new Error('用户名不存在');
    email = data;
  }

  return supabase.auth.signInWithPassword({ email, password });
}

export { supabase };
