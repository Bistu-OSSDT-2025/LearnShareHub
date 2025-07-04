import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import StudyGroupCard from '@/components/StudyGroupCard';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Database } from '@/integrations/supabase/types';
import { deleteStudyGroup } from '@/integrations/supabase';
import { useToast } from '@/components/ui/use-toast';

type StudyGroupFromView = Database['public']['Views']['study_group_details']['Row'];

// This interface should match the structure of the data passed to the StudyGroupCard component.
interface StudyGroupForCard {
  id: string;
  name: string;
  description: string | null;
  subject: string | null;
  memberCount: number | null;
  maxMembers: number | null;
  creator: {
    name: string | null;
    avatar: string | null;
  };
  members: {
    name: string | null;
    avatar: string | null;
  }[];
  isJoined: boolean;
  created_by: string | null;
}

export const StudyGroupPage = () => {
  const [studyGroups, setStudyGroups] = useState<StudyGroupForCard[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleDeleteGroup = async (id: string) => {
    try {
      await deleteStudyGroup(parseInt(id, 10));
      setStudyGroups(studyGroups.filter(group => group.id !== id));
      toast({
        title: "删除成功",
        description: "学习小组已成功删除。",
      });
    } catch (error) {
      console.error('Error deleting study group:', error);
      toast({
        title: "删除失败",
        description: error instanceof Error ? error.message : "无法删除学习小组，请稍后再试。",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const fetchStudyGroups = async () => {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('study_group_details')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching study groups:', error);
        setStudyGroups([]);
      } else if (data) {
        const formattedData: StudyGroupForCard[] = data.map((group: StudyGroupFromView) => ({
          id: String(group.id),
          name: group.name || '未命名小组',
          description: group.description,
          subject: group.subject_name,
          memberCount: group.member_count,
          maxMembers: group.max_members,
          creator: {
            name: group.creator_name,
            avatar: group.creator_avatar_url,
          },
          members: (group.members as any[] || []).map(m => ({ name: m.name, avatar: m.avatar_url })),
          isJoined: (group.members as any[] || []).some(m => m.user_id === user?.id),
          created_by: group.created_by,
        }));
        setStudyGroups(formattedData);
      }
      setIsLoading(false);
    };

    fetchStudyGroups();

    const channel = supabase.channel('study_groups_realtime_channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'study_groups' },
        () => fetchStudyGroups()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'group_members' },
        () => fetchStudyGroups()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

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

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">热门学习小组</h2>
          <p className="text-gray-600">加入活跃的学习小组，一起交流进步</p>
        </div>
      </div>

        {isLoading ? (
          <div className="text-center py-10">加载中...</div>
        ) : filteredGroups.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">没有找到学习小组</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map(group => (
              <StudyGroupCard key={group.id} group={group} onDelete={handleDeleteGroup} />
            ))}
          </div>
        )}
    </div>
  );
};

export default StudyGroupPage;
