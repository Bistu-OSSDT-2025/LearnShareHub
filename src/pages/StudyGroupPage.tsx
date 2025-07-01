import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Plus } from 'lucide-react';
// StudyGroupPage.tsx
import StudyGroupCard from '@/components/StudyGroupCard'; 
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  subject: string;
  memberCount: number;   
  maxMembers: number;
  creator: {
    name: string;
    avatar: string;
  } | null;
  members: Array<{
      name: string;
       avatar: string
       ; // ✅ 和 StudyGroupCardProps 一致
      }>
  isJoined: boolean;
  updated_at: string;
}

export const StudyGroupPage = () => {
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStudyGroups = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('study_groups')
        .select(`
          *, image_url,
          creator:profiles(name, avatar_url),
          members:study_group_members(user_id)
        `)
        .order('updated_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching study groups:', error);
      } else {
        if (data) {
          const formattedData = data.map(group => ({
            ...group,
            imageUrl: group.image_url || '',
            creator: {
              name: group.creator?.name || '未知',
              avatar: group.creator?.avatar_url || '',
            },
            members: group.members || [],
            isJoined: group.members.some(member => member.user_id === user?.id)
          }));
          setStudyGroups(formattedData);
        }
      }
      setIsLoading(false);
    };

    fetchStudyGroups();
  }, [user]);

  const handleCreateGroup = async () => {
    if (!user) return;

    const newGroup = {
      name: '新学习小组',
      description: '这是一个新的学习小组',
      subject: '编程',
      member_count: 1,
      max_members: 10,
      created_by: user.id,
    };

    const { data, error } = await supabase
      .from('study_groups')
      .insert([newGroup])
      .select(`
        *,
        creator:profiles(name, avatar_url),
        members:study_group_members(user_id)
      `)
      .single();
    
    if (error) {
      console.error('Error creating study group:', error);
    } else {
      if (data) {
        const formattedData = {
          ...data,
          creator: {
            name: data.creator?.name || '未知',
            avatar: data.creator?.avatar_url || '',
          },
          members: data.members || [],
          isJoined: true
        };
        setStudyGroups([formattedData, ...studyGroups]);
      }
    }
  };

  const filteredGroups = studyGroups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-6 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            学习小组
          </h1>
          <p className="text-muted-foreground mt-1">加入或创建学习小组，与他人一起学习和成长</p>
        </div>
        <Button 
          onClick={handleCreateGroup}
          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
        >
          <Plus className="mr-2 h-4 w-4" /> 创建小组
        </Button>
        // 新增创建按钮
        <Button onClick={() => window.location.href = '/create-study-group'}>
          创建新小组
        </Button>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="搜索学习小组..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* 添加标题部分，与首页样式一致 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">热门学习小组</h2>
          <p className="text-gray-600">加入活跃的学习小组，一起交流进步</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredGroups.length === 0 ? (
        <Card className="py-12 text-center">
          <CardContent>
            <h3 className="font-medium text-lg mb-2">没有找到学习小组</h3>
            <p className="text-muted-foreground mb-6">尝试调整搜索条件或创建一个新的学习小组</p>
            <Button 
              variant="outline"
              onClick={handleCreateGroup}
            >
              <Plus className="mr-2 h-4 w-4" /> 创建第一个小组
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGroups.map((group) => (
            <Link key={group.id} to={`/groups/${group.id}`}>
              <StudyGroupCard group={group} />
            </Link>
          ))}
        </div>
      )}

      {/* 添加平台数据统计部分，与首页样式一致 */}
      <section className="bg-gray-50 rounded-2xl p-8 mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">平台数据</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">12,345</div>
            <div className="text-gray-600">注册用户</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">5,678</div>
            <div className="text-gray-600">发帖数量</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">89</div>
            <div className="text-gray-600">学科板块</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">234</div>
            <div className="text-gray-600">学习小组</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudyGroupPage;
