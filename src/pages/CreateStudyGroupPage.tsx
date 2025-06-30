import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

import { createStudyGroup } from '@/supabase';


export default function CreateStudyGroupPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createStudyGroup({
        name: '新学习小组',
        creator_id: user?.id || '',
        member_count: 1,
        max_members: 10
      });
      navigate('/study-groups');
    } catch (error) {
      console.error('创建失败:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">创建学习小组</h1>
      <form onSubmit={handleSubmit}>
        <Button type="submit">创建测试小组</Button>
      </form>
    </div>
  );
}