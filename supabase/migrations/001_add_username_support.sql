-- 创建一个函数来通过用户名查找用户邮箱
-- 这个函数会在auth.users表的raw_user_meta_data中查找username字段

CREATE OR REPLACE FUNCTION find_email_by_username(username_param text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    user_email text;
BEGIN
    -- 在auth.users表中查找匹配的用户名
    SELECT email INTO user_email
    FROM auth.users
    WHERE raw_user_meta_data->>'username' = username_param
    AND deleted_at IS NULL
    LIMIT 1;
    
    RETURN user_email;
END;
$$;

-- 创建一个函数来检查用户名是否已存在
CREATE OR REPLACE FUNCTION check_username_exists(username_param text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    user_count integer;
BEGIN
    -- 检查用户名是否已存在
    SELECT COUNT(*) INTO user_count
    FROM auth.users
    WHERE raw_user_meta_data->>'username' = username_param
    AND deleted_at IS NULL;
    
    RETURN user_count > 0;
END;
$$;

-- 为这些函数设置适当的权限
GRANT EXECUTE ON FUNCTION find_email_by_username(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION check_username_exists(text) TO anon, authenticated;