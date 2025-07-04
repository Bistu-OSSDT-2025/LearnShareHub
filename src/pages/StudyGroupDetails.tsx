import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast'; // 导入正确的Toast钩子
const StudyGroupDetails = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // 添加错误状态

const { toast } = useToast(); // 添加toast提示

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          toast({ title: '请先登录', description: '登录后才能查看小组详情', variant: 'destructive' });
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('study_groups')
          .select(`
            *, 
            subjects(name),
            profiles(username, avatar_url)
          `)
          .eq('id', id)
          .single();

        console.log('Supabase查询结果:', { data, error });

        if (error) {
          setError(error);
          // 处理不同类型的错误
          if (error.code === 'PGRST116') {
            setGroup(null); // 小组不存在
          } else if (error.code === 'PGRST700') {
            // 权限不足错误
            setGroup(null);
            toast({ 
              title: '权限不足', 
              description: '你没有查看该小组的权限，请联系小组管理员或检查登录状态', 
              variant: 'destructive'
            });
          } else if (data) {
            setGroup(data); // 有数据但有错误警告
            toast({ title: '数据加载警告', description: '部分数据可能不完整', variant: 'destructive' });
          } else {
            setGroup(null); // 其他错误
            toast({ title: '查询错误', description: `错误代码: ${error.code}`, variant: 'destructive' });
          }
        } else {
          setGroup(data);
        }
      } catch (err) {
        console.error('获取小组信息失败:', err);
        setError(err);
        setGroup(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [id, toast]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-academic-blue-600 mb-4"></div>
        <p className="text-gray-600">加载中...</p>
      </div>
    </div>
  );

  // 添加PGRST700错误的专门处理
  if (!group && error?.code === 'PGRST700') return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">权限不足</h2>
        <p className="text-gray-600">你没有查看该小组的权限，请联系小组管理员或检查登录状态</p>
        <Button className="mt-4 bg-academic-blue-600 hover:bg-academic-blue-700 text-white">
          返回小组列表
        </Button>
      </div>
    </div>
  );

  // 其他错误情况显示通用错误提示，但仍尝试显示小组信息
  if (error && group) {
    toast({
      title: "加载错误",
      description: error.message || '获取小组信息时发生错误',
      variant: "destructive"
    });
  }

  // 如果group仍为null且不是已知错误，显示未知错误
  if (!group) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">发生未知错误</h2>
        <p className="text-gray-600">无法加载小组信息，请稍后重试</p>
      </div>
    </div>
  );

  // 正常显示小组信息
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          {/* 小组头部信息 */}
          <div className="bg-gradient-to-r from-academic-blue-600 to-academic-blue-400 text-white p-6">
            <div className="flex items-center"> {/* 替换HStack */}
              <Avatar className="h-16 w-16 border-2 border-white">
                <AvatarImage src={group.profiles?.avatar_url || '/placeholder.svg'} />
                <AvatarFallback className="bg-white text-academic-blue-600 font-bold">
                  {group.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 flex flex-col"> {/* 替换VStack */}
                <CardTitle className="text-2xl font-bold">{group.name}</CardTitle>
                <CardDescription className="text-white/90 flex items-center">
                  <Badge variant="secondary" className="bg-white/20 text-white mr-2">
                    {group.subjects?.name || '未分类'}
                  </Badge>
                  <span>成员: {group.current_members || 1}/{group.max_members}</span>
                </CardDescription>
              </div>
              <div className="flex-1"></div> {/* 替换Spacer */}
              <Badge className="bg-white text-academic-blue-600 hover:bg-white/90">
                创建于 {new Date(group.created_at).toLocaleDateString()}
              </Badge>
            </div>
          </div>

          <CardContent className="p-6">
            {/* 小组描述 */}
            <div className="space-y-6"> {/* 替换VStack spacing={6} */}
              <div> {/* 替换Box */}
                <div className="text-lg font-semibold text-gray-800 mb-2">小组描述</div> {/* 替换Text */}
                <div className="text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100"> {/* 替换Text */}
                  {group.description || '暂无描述'}
                </div>
              </div>

              <Separator />

              {/* 创建人信息 */}
              <div> {/* 替换Box */}
                <div className="text-lg font-semibold text-gray-800 mb-3">创建人信息</div> {/* 替换Text */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100"> {/* 替换Flex */}
                  <div className="flex flex-col space-y-2"> {/* 替换VStack */}
                    <div className="flex items-center space-x-2"> {/* 替换HStack */}
                      <div className="text-gray-500 w-20">姓名:</div> {/* 替换Text */}
                      <div className="font-medium">{group.creator_name}</div> {/* 替换Text */}
                    </div>
                    <div className="flex items-center space-x-2"> {/* 替换HStack */}
                      <div className="text-gray-500 w-20">班级:</div> {/* 替换Text */}
                      <div className="font-medium">{group.creator_class}</div> {/* 替换Text */}
                    </div>
                    <div className="flex items-center space-x-2"> {/* 替换HStack */}
                      <div className="text-gray-500 w-20">学号:</div> {/* 替换Text */}
                      <div className="font-medium">{group.creator_student_id}</div> {/* 替换Text */}
                    </div>
                  </div>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex justify-end mt-4"> {/* 替换Flex justify="end" */}
                <Button className="bg-academic-blue-600 hover:bg-academic-blue-700 text-white">
                  加入小组
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudyGroupDetails;