import { supabase } from '@/integrations/supabase/client';

/**
 * 检查输入是否为邮箱格式
 */
export const isEmail = (input: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
};

/**
 * 通过用户名查找对应的邮箱地址
 * 使用Supabase RPC函数在auth.users表的user_metadata中查找
 */
export const findEmailByUsername = async (username: string): Promise<string | null> => {
  try {
    // 使用RPC函数查找用户名对应的邮箱
    const { data, error } = await supabase.rpc('find_email_by_username', {
      username_param: username
    });
    
    if (error) {
      console.error('查找用户名时发生错误:', error);
      return null;
    }
    
    return data || null;
  } catch (error) {
    console.error('查找用户名失败:', error);
    return null;
  }
};

/**
 * 验证用户名格式
 */
export const isValidUsername = (username: string): boolean => {
  // 用户名应该是2-20个字符，只包含字母、数字、下划线和连字符
  return /^[a-zA-Z0-9_-]{2,20}$/.test(username);
};

/**
 * 检查用户名是否已存在
 * 这个函数需要在注册时使用，确保用户名的唯一性
 */
export const checkUsernameExists = async (username: string): Promise<boolean> => {
  try {
    // 使用RPC函数检查用户名是否已存在
    const { data, error } = await supabase.rpc('check_username_exists', {
      username_param: username
    });
    
    if (error) {
      console.error('检查用户名时发生错误:', error);
      return false;
    }
    
    return data === true;
  } catch (error) {
    console.error('检查用户名失败:', error);
    return false;
  }
};