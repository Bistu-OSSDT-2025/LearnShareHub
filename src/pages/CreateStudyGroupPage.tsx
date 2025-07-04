
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { createStudyGroup, getSubjects, createSubject, Subject } from '@/integrations/supabase';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase';

export default function CreateStudyGroupPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [otherSubject, setOtherSubject] = useState('');
  const [showOtherSubjectInput, setShowOtherSubjectInput] = useState(false);

  // 添加创建人信息状态
  const [creatorName, setCreatorName] = useState('');
  const [creatorClass, setCreatorClass] = useState('');
  const [creatorStudentId, setCreatorStudentId] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjectsData = await getSubjects();
        setSubjects(subjectsData);
      } catch (error) {
        console.error('Failed to fetch subjects:', error);
        toast({
          title: "获取学科失败",
          description: "无法加载学科列表，请稍后重试。",
          variant: "destructive",
        });
      }
    };

    fetchSubjects();
  }, [toast]);

  // 删除所有成员相关处理函数
  const handleAddMember = () => {
// 由于注释中提到要删除所有成员相关处理函数，此函数及对应代码应该是多余的，可直接注释掉
// setMembers([...members, { name: '', class: '', studentId: '' }]);
  };

  const handleRemoveMember = (index: number) => {

  };

  const handleMemberChange = (index: number, field: 'name' | 'class' | 'studentId', value: string) => {

  };


  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    if (value === 'other') {
      setShowOtherSubjectInput(true);
    } else {
      setShowOtherSubjectInput(false);
      setOtherSubject('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "请先登录",
        description: "您需要登录后才能创建学习小组。",
        variant: "destructive",
      });
      return;
    }

    if (!name || !description || (!selectedSubject && !otherSubject)) {
      toast({
        title: "信息不完整",
        description: "请填写小组名称、描述并选择或创建一个学科。",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Check if group name already exists
      const { data: existingGroup, error: existingGroupError } = await supabase
        .from('study_groups')
        .select('name')
        .eq('name', name)
        .single();

      if (existingGroup) {
        toast({
          title: "创建失败",
          description: "该学习小组名称已存在，请使用其他名称。",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      let subjectId: number;

      if (showOtherSubjectInput && otherSubject) {
        const newSubject = await createSubject({ name: otherSubject, description: '' });
        subjectId = newSubject.id;
      } else {
        subjectId = parseInt(selectedSubject, 10);
      }

      const groupData = await createStudyGroup({
        name,
        description,
        subject_id: subjectId,
        created_by: user.id,
        max_members: 10,
        // 添加创建人信息
        // 原代码报错是因为 creator_name 不在对应类型定义中，推测需要更新类型定义
        // 这里暂时保持提交逻辑，后续需更新 createStudyGroup 函数的类型定义
        // 暂时移除 creator_name，等待更新 createStudyGroup 函数的类型定义
        // creator_name: creatorName,
        // 暂时移除 creator_class，等待更新 createStudyGroup 函数的类型定义
        // creator_class: creatorClass,
        // 暂时移除 creator_student_id，等待更新 createStudyGroup 函数的类型定义
        // creator_student_id: creatorStudentId
      });

      // The trigger 'on_study_group_created' should handle adding the creator as a member.
      // The explicit insertion below is redundant if the trigger is active.
      // We'll rely on the trigger for now.

      toast({
        title: "创建成功",
        description: "学习小组已成功创建！",
      });
      navigate('/study-group');
    } catch (error) {
      console.error('创建失败:', error);
      toast({
        title: "创建失败",
        description: error instanceof Error ? error.message : '无法创建学习小组，请稍后再试。',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F5F5F5] overflow-y-auto">
      <div className="max-w-2xl mx-auto p-6 min-h-screen">
        <Card className="bg-academic-blue-100">
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
                <Select onValueChange={handleSubjectChange} value={selectedSubject}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="选择一个学科" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id.toString()}>
                        {subject.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="other">其他...</SelectItem>
                  </SelectContent>
                </Select>
                {showOtherSubjectInput && (
                  <Input
                    id="other-subject"
                    value={otherSubject}
                    onChange={(e) => setOtherSubject(e.target.value)}
                    placeholder="请输入新的学科名称"
                    required
                    className="mt-2"
                  />
                )}
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
                  rows={4}
                />
              </div>

              {/* 删除成员信息部分，添加创建人信息 */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-medium mb-4">创建人信息</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="creatorName" className="block text-sm font-medium text-gray-700">
                      姓名
                    </label>
                    <Input
                      id="creatorName"
                      value={creatorName}
                      onChange={(e) => setCreatorName(e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="creatorClass" className="block text-sm font-medium text-gray-700">
                      班级
                    </label>
                    <Input
                      id="creatorClass"
                      value={creatorClass}
                      onChange={(e) => setCreatorClass(e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="creatorStudentId" className="block text-sm font-medium text-gray-700">
                      学号
                    </label>
                    <Input
                      id="creatorStudentId"
                      value={creatorStudentId}
                      onChange={(e) => setCreatorStudentId(e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-academic-blue-600 hover:bg-academic-blue-700 text-white mt-6"
              >
                {isSubmitting ? '创建中...' : '创建小组'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // 删除未使用的成员处理函数
  // const handleAddMember = () => {};
  // const handleRemoveMember = () => {};
  // const handleMemberChange = () => {};
}
