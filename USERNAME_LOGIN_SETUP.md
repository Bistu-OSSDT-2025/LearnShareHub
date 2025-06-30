# 用户名登录功能设置指南

本指南将帮助您在LearnShareHub项目中设置用户名登录功能。

## 功能概述

现在用户可以使用以下方式登录：
- 邮箱地址 + 密码
- 用户名 + 密码

## 已实现的功能

### 1. 登录页面改进
- ✅ 支持邮箱或用户名输入
- ✅ 动态图标显示（邮箱图标/用户图标）
- ✅ 智能识别输入类型
- ✅ 友好的错误提示

### 2. 注册页面改进
- ✅ 实时用户名验证
- ✅ 用户名唯一性检查
- ✅ 用户名格式验证
- ✅ 视觉状态指示器

### 3. 工具函数
- ✅ `isEmail()` - 检查是否为邮箱格式
- ✅ `isValidUsername()` - 验证用户名格式
- ✅ `findEmailByUsername()` - 通过用户名查找邮箱
- ✅ `checkUsernameExists()` - 检查用户名是否已存在

## 数据库设置

### 步骤1：运行数据库迁移

在Supabase控制台中执行以下SQL命令，或者使用Supabase CLI运行迁移文件：

```sql
-- 创建一个函数来通过用户名查找用户邮箱
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
```

### 步骤2：使用Supabase CLI（推荐）

如果您使用Supabase CLI，可以运行以下命令：

```bash
# 应用迁移
supabase db push

# 或者如果您想要生成新的迁移
supabase migration new add_username_support
```

### 步骤3：验证设置

在Supabase控制台的SQL编辑器中运行以下测试查询：

```sql
-- 测试函数是否正常工作
SELECT find_email_by_username('test_username');
SELECT check_username_exists('test_username');
```

## 使用方法

### 用户注册
1. 用户输入用户名时，系统会实时验证：
   - 格式是否正确（2-20个字符，字母数字下划线连字符）
   - 是否已被使用
2. 只有用户名验证通过才能完成注册

### 用户登录
1. 用户可以输入邮箱或用户名
2. 系统自动识别输入类型
3. 如果是用户名，系统会查找对应的邮箱进行登录

## 技术实现细节

### 用户名存储
- 用户名存储在 `auth.users.raw_user_meta_data.username` 字段中
- 注册时通过 `signUp` 的 `options.data` 参数设置

### 查找机制
- 使用PostgreSQL函数在数据库层面进行查找
- 避免了客户端遍历用户的安全风险
- 提供了良好的性能

### 安全考虑
- 数据库函数使用 `SECURITY DEFINER` 确保权限控制
- 只查询非删除用户（`deleted_at IS NULL`）
- 用户名格式验证防止恶意输入

## 故障排除

### 常见问题

1. **函数不存在错误**
   - 确保已在Supabase中执行了SQL迁移
   - 检查函数权限是否正确设置

2. **用户名查找失败**
   - 确保用户注册时用户名已正确保存到 `user_metadata`
   - 检查数据库函数是否正常工作

3. **实时验证不工作**
   - 检查网络连接
   - 确保Supabase客户端配置正确

### 调试步骤

1. 在浏览器开发者工具中检查网络请求
2. 查看控制台错误信息
3. 在Supabase控制台中测试数据库函数

## 未来改进建议

1. **创建专门的profiles表**
   - 更好的性能和查询能力
   - 支持更多用户信息字段

2. **添加用户名历史记录**
   - 防止用户名被恶意抢注
   - 支持用户名更改功能

3. **实现用户名搜索建议**
   - 当用户名被占用时提供替代建议
   - 智能用户名生成

## 相关文件

- `src/pages/Login.tsx` - 登录页面
- `src/pages/Register.tsx` - 注册页面
- `src/lib/auth-utils.ts` - 认证工具函数
- `supabase/migrations/001_add_username_support.sql` - 数据库迁移文件

---

如果您在设置过程中遇到任何问题，请检查Supabase控制台的日志或联系技术支持。