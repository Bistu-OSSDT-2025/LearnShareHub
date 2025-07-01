
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, Users, FileText, Plus } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative py-16 academic-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            让学习更有
            <span className="bg-gradient-to-r from-blue-600 via-green-500 to-purple-600 bg-clip-text text-transparent">
              温度
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            在LearnShareHub，与同学们一起分享知识、讨论课程、交流学习心得。
            让每一次学习都成为美好的回忆。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg">
              <Plus className="h-5 w-5 mr-2" />
              开始分享
            </Button>
            <Button size="lg" variant="outline" className="border-2 hover:bg-gray-50">
              <Search className="h-5 w-5 mr-2" />
              探索内容
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm hover-lift">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">学科分类</h3>
              <p className="text-gray-600">按学科组织的讨论板块，找到属于你的学习圈子</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm hover-lift">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">学习小组</h3>
              <p className="text-gray-600">组建学习小组，与志同道合的同学一起进步</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm hover-lift">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">资料分享</h3>
              <p className="text-gray-600">分享学习资料，获取他人的优质内容</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
