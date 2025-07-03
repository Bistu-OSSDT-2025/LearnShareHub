async function runStabilityTests() {
  // Dynamically import the required modules
  const { createPost } = await import('./src/integrations/supabase/posts.js');
  const { supabase } = await import('./src/integrations/supabase/client.js');
  
  const testUser = {
    id: 'test-user-id',
    email: 'test@example.com',
    user_metadata: { username: 'tester' }
  };
  
  console.log('Starting 10 stability tests...');
  
  for (let i = 1; i <= 10; i++) {
    try {
      const testPost = {
        title: `稳定性测试帖子 ${i}`,
        content: `这是第 ${i} 次稳定性测试内容。`,
        user_id: testUser.id
      };
      
      const result = await createPost(testPost);
      console.log(`✅ 测试 ${i} 成功: 帖子ID ${result.id}`);
      
      // Clean up
      await supabase.from('posts').delete().eq('id', result.id);
    } catch (error) {
      console.error(`❌ 测试 ${i} 失败:`, error.message);
    }
  }
  
  console.log('所有测试完成！');
}

runStabilityTests();
