import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import SubjectCard from '@/components/SubjectCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const PopularSubjectsPage = () => {
  // 所有热门学科数据
  const allSubjects = [
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
    },
    {
      id: '5',
      name: '生物',
      description: '生物学、遗传学、生态学等知识交流',
      icon: '🧬',
      color: 'bg-lime-500',
      postCount: 456,
      memberCount: 321,
      latestPost: {
        title: '基因编辑技术最新进展',
        author: '生物博士',
        time: '30分钟前'
      },
      tags: ['生物', '基因', '生态']
    },
    {
      id: '6',
      name: '化学',
      description: '有机化学、无机化学、物理化学学习讨论',
      icon: '🧪',
      color: 'bg-red-500',
      postCount: 321,
      memberCount: 256,
      latestPost: {
        title: '新型材料化学合成方法',
        author: '化学达人',
        time: '1小时前'
      },
      tags: ['化学', '材料', '合成']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">热门学科 - 全部</h2>
              <p className="text-gray-600">查看所有热门学科</p>
            </div>
            <Link to="/">
              <Button variant="outline">返回首页</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allSubjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default PopularSubjectsPage;