import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { createStudyGroup } from '@/integrations/supabase';

export default function CreateStudyGroupPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      // 可以选择显示错误信息或重定向到登录页
      return;
    }
    try {
      await createStudyGroup({
        name,
        description,
        subject,
        created_by: user.id,
        member_count: 1,
        max_members: 10, // 默认值
      });
      navigate('/study-groups');
    } catch (error) {
      console.error('创建失败:', error);
      // 这里可以添加用户友好的错误提示
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">创建学习小组</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                小组名称
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                学科
              </label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                小组描述
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-full max-w-xs mt-6 bg-blue-600 text-white hover:bg-blue-700"
              >
                创建小组
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
