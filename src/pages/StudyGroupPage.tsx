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
  max_members: number;
  created_by: string;
  creator: {
    name: string;
    avatar: string;
  } | null;
  members: Array<{
      user_id: string;
      name: string;
      avatar: string;
  }>;
  isJoined: boolean;
  created_at: string;
  updated_at: string;
  nextMeeting?: string;
  image_url?: string; 
  memberCount: number;
}

export const StudyGroupPage = () => {
  // 移动静态数据数组到状态初始化前
  // 删除以下整个静态数据数组
  const StudyGroups = [
    {
      id: '1',
      name: '算法刷题小组',
      description: '每天一道算法题，一起提升编程能力',
      subject: '计算机科学',
      memberCount: 28,
      max_members: 30,
      created_by: '1',
      created_at: new Date().toISOString(),
      creator: {
        name: '算法大神',
        avatar: ''
      },
      members: [
        { user_id: '1', name: 'Alice', avatar: '' },
        { user_id: '2', name: 'Bob', avatar: '' },
        { user_id: '3', name: 'Charlie', avatar: '' },
        { user_id: '4', name: 'David', avatar: '' },
        { user_id: '5', name: 'Eve', avatar: '' }
      ],
      nextMeeting: '今晚8点',
      isJoined: false,
      updated_at: new Date().toISOString(),
      image_url: ''
    },
    {
      id: '2',
      name: '高数答疑互助',
      description: '高等数学学习讨论，互帮互助解决难题',
      subject: '数学',
      memberCount: 15,
      max_members: 25,
      created_by: '2',
      created_at: new Date().toISOString(),
      creator: {
        name: '数学达人',
        avatar: ''
      },
      members: [
        { user_id: '6', name: 'Frank', avatar: '' },
        { user_id: '7', name: 'Grace', avatar: '' },
        { user_id: '8', name: 'Henry', avatar: '' }
      ],
      nextMeeting: '明天下午2点',
      isJoined: true,
      updated_at: new Date().toISOString(),
      image_url: ''
    }
  ];
  // 将状态初始化为空数组
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // 恢复Supabase数据获取逻辑
  useEffect(() => {
    const fetchStudyGroups = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('study_groups')
        .select(`
          *, image_url,
          creator:profiles(name, avatar_url),
          members:group_members(
            user_id,
            user:profiles(name, avatar_url)
          )
        `)
        .order('updated_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching study groups:', error);
      } else {
        if (data) {
          const formattedData = data.map(group => ({
            ...group,
            imageUrl: group.image_url || '',
            memberCount: group.members?.length || 0,
            creator: {
              name: group.creator?.name || '未知',
              avatar: group.creator?.avatar_url || '',
            },
            members: group.members.map(member => ({
              user_id: member.user_id,
              name: member.user?.name || '未知成员',
              avatar: member.user?.avatar_url || '/placeholder.svg'
            })) || [],
            isJoined: group.members?.some(member => member.user_id === user?.id) || false
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
        members:group_members(
          user_id,
          user:profiles(name, avatar_url)
        )
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
          members: (data.members || []).map(member => ({
        user_id: member.user_id,
        name: member.user?.name || '未知成员',
        avatar: member.user?.avatar_url || '/placeholder.svg'
      })),
          isJoined: true
        };
        setStudyGroups([formattedData, ...studyGroups]);
      }
    }
  };
  const filteredGroups = studyGroups.filter(group => 
    (group.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (group.subject?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-6 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            学习小组
          </h1>
          <p className="text-black mt-1">加入或创建学习小组，与他人一起学习和成长</p>
        </div>

        <Link to="/create-study-group">
          <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
            <Plus className="mr-2 h-4 w-4" /> 创建小组
          </Button>
        </Link>
      </div>

      <Card className="mb-8 bg-academic-green-100">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="搜索学习小组..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 !placeholder:text-brown-800 !text-black"
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

        {/* 添加学习小组列表渲染代码 */}
        {isLoading ? (
          <div className="text-center py-10">加载中...</div>
        ) : filteredGroups.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">没有找到学习小组</p>
       
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map(group => (
              <StudyGroupCard key={group.id} group={{ 
                ...group, 
                maxMembers: group.max_members, 
                imageUrl: group.image_url 
              }} />
            ))}
          </div>
        )}

     
    </div>
    
  );
  

};
 

export default StudyGroupPage;
