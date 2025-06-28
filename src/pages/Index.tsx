
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SubjectCard from '@/components/SubjectCard';
import PostCard from '@/components/PostCard';
import StudyGroupCard from '@/components/StudyGroupCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Clock, Users, BookOpen } from 'lucide-react';

const Index = () => {
  // Mock data
  const popularSubjects = [
    {
      id: '1',
      name: '计算机科学',
      description: '编程、算法、软件工程等技术讨论',
      icon: '💻',
      color: 'bg-blue-500',
      postCount: 1234,
      memberCount: 856,
      latestPost: {
        title: 'Python数据分析入门指南',
        author: '张三',
        time: '2分钟前'
      },
      tags: ['编程', 'Python', '数据分析']
    },
    {
      id: '2',
      name: '数学',
      description: '高等数学、线性代数、概率统计',
      icon: '📐',
      color: 'bg-green-500',
      postCount: 892,
      memberCount: 654,
      latestPost: {
        title: '微积分重点知识点总结',
        author: '李四',
        time: '5分钟前'
      },
      tags: ['微积分', '线代', '概率论']
    },
    {
      id: '3',
      name: '物理学',
      description: '力学、电磁学、量子物理学习交流',
      icon: '⚛️',
      color: 'bg-purple-500',
      postCount: 567,
      memberCount: 432,
      latestPost: {
        title: '量子力学基础概念解析',
        author: '王五',
        time: '10分钟前'
      },
      tags: ['量子力学', '电磁学', '热力学']
    },
    {
      id: '4',
      name: '英语',
      description: '英语学习、口语练习、考试备考',
      icon: '🗣️',
      color: 'bg-orange-500',
      postCount: 745,
      memberCount: 589,
      latestPost: {
        title: '雅思写作高分技巧分享',
        author: '赵六',
        time: '15分钟前'
      },
      tags: ['雅思', '托福', '口语']
    }
  ];

  const hotPosts = [
    {
      id: '1',
      title: 'CS专业大三学生的实习经验分享：从投简历到拿到offer的完整攻略',
      content: '作为一名刚刚结束实习的CS学生，我想把这段经历分享给大家，希望能帮到正在找实习的同学们...',
      author: {
        name: '科技小达人',
        avatar: '',
        level: 'Lv.8 学霸'
      },
      subject: '计算机科学',
      createdAt: '2小时前',
      replies: 128,
      likes: 245,
      views: 1567,
      tags: ['实习', '求职', '经验分享'],
      isHot: true
    },
    {
      id: '2',
      title: '高等数学期末复习资料整理：含历年真题和详细解答',
      content: '整理了近三年的高数期末考试真题，每道题都有详细的解题步骤，希望对大家有帮助...',
      author: {
        name: '数学小王子',
        avatar: '',
        level: 'Lv.6 学者'
      },
      subject: '数学',
      createdAt: '3小时前',
      replies: 89,
      likes: 312,
      views: 2134,
      tags: ['期末复习', '真题', '高等数学'],
      isPinned: true
    },
    {
      id: '3',
      title: '英语四级备考经验：如何在两个月内从400分提升到580分',
      content: '分享我的四级备考心得，从词汇记忆到听力练习，从阅读技巧到写作模板...',
      author: {
        name: 'English Master',
        avatar: '',
        level: 'Lv.7 专家'
      },
      subject: '英语',
      createdAt: '1天前',
      replies: 67,
      likes: 189,
      views: 1289,
      tags: ['四级', '备考', '学习方法']
    }
  ];

  const studyGroups = [
    {
      id: '1',
      name: '算法刷题小组',
      description: '每天一道算法题，一起提升编程能力',
      subject: '计算机科学',
      memberCount: 28,
      maxMembers: 30,
      creator: {
        name: '算法大神',
        avatar: ''
      },
      members: [
        { name: 'Alice', avatar: '' },
        { name: 'Bob', avatar: '' },
        { name: 'Charlie', avatar: '' },
        { name: 'David', avatar: '' },
        { name: 'Eve', avatar: '' }
      ],
      nextMeeting: '今晚8点',
      isJoined: false
    },
    {
      id: '2',
      name: '高数答疑互助',
      description: '高等数学学习讨论，互帮互助解决难题',
      subject: '数学',
      memberCount: 15,
      maxMembers: 25,
      creator: {
        name: '数学达人',
        avatar: ''
      },
      members: [
        { name: 'Frank', avatar: '' },
        { name: 'Grace', avatar: '' },
        { name: 'Henry', avatar: '' }
      ],
      nextMeeting: '明天下午2点',
      isJoined: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <HeroSection />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Popular Subjects Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">热门学科</h2>
              <p className="text-gray-600">选择你感兴趣的学科，开始学习交流</p>
            </div>
            <Button variant="outline">查看全部</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularSubjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        </section>

        {/* Hot Posts Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">热门讨论</h2>
              <p className="text-gray-600">最新最热的学习话题和经验分享</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                热门
              </Button>
              <Button variant="outline" size="sm">
                <Clock className="h-4 w-4 mr-1" />
                最新
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {hotPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        {/* Study Groups Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">学习小组</h2>
              <p className="text-gray-600">加入学习小组，与同学们一起进步</p>
            </div>
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              创建小组
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyGroups.map((group) => (
              <StudyGroupCard key={group.id} group={group} />
            ))}
          </div>
        </section>

        {/* Statistics Section */}
        <section className="bg-gray-50 rounded-2xl p-8">
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
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg gradient-bg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <span className="text-xl font-bold">LearnShareHub</span>
              </div>
              <p className="text-gray-400">专为校园设计的学习交流平台</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">学科板块</h3>
              <ul className="space-y-2 text-gray-400">
                <li>计算机科学</li>
                <li>数学</li>
                <li>物理学</li>
                <li>英语</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">功能特色</h3>
              <ul className="space-y-2 text-gray-400">
                <li>资料分享</li>
                <li>学习小组</li>
                <li>讨论交流</li>
                <li>智能搜索</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">联系我们</h3>
              <ul className="space-y-2 text-gray-400">
                <li>意见反馈</li>
                <li>使用帮助</li>
                <li>商务合作</li>
                <li>关于我们</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2024 LearnShareHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
