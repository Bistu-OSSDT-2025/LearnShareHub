import { useEffect, useState } from 'react';
import { createPost } from '@/integrations/supabase/posts';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export default function StabilityTestPage() {
  const { user } = useAuth();
  const [results, setResults] = useState<Array<{test: number, success: boolean, message: string}>>([]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!user || running) return;
    
    const runTests = async () => {
      setRunning(true);
      const newResults = [];
      
      for (let i = 1; i <= 10; i++) {
        try {
          const testPost = {
            title: `稳定性测试帖子 ${i}`,
            content: `这是第 ${i} 次稳定性测试内容。`,
            user_id: user.id
          };
          
          const result = await createPost(testPost);
          // Clean up
          await supabase.from('posts').delete().eq('id', result.id);
          
          newResults.push({
            test: i,
            success: true,
            message: `✅ 测试 ${i} 成功: 帖子ID ${result.id}`
          });
        } catch (error: any) {
          newResults.push({
            test: i,
            success: false,
            message: `❌ 测试 ${i} 失败: ${error.message}`
          });
        }
        setResults([...newResults]);
      }
      
      setRunning(false);
    };

    runTests();
  }, [user, running]);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">帖子功能稳定性测试</h1>
      
      {running ? (
        <p>测试运行中...</p>
      ) : results.length > 0 ? (
        <div>
          <p className="mb-4">所有测试完成！</p>
          <ul className="space-y-2">
            {results.map(result => (
              <li 
                key={result.test} 
                className={result.success ? 'text-green-600' : 'text-red-600'}
              >
                {result.message}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>准备开始测试...</p>
      )}
    </div>
  );
}
