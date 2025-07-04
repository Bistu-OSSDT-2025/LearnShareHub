import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSubjects, Subject } from '@/integrations/supabase/subjects';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';

const PopularSubjectsPage = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        const subjectsData = await getSubjects();
        setSubjects(subjectsData);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">热门学科</h1>
            <p className="text-gray-600">选择你感兴趣的学科，开始学习交流</p>
          </div>
          <Link to="/subjects">
            <Button variant="outline">管理学科</Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center">加载中...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {subjects.map((subject) => (
              <Link to={`/subjects/${subject.id}`} key={subject.id}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{subject.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 line-clamp-3">{subject.description || '暂无描述'}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
            {subjects.length === 0 && (
              <p className="col-span-full text-center text-gray-500">
                还没有任何学科。请前往“管理学科”页面创建第一个学科。
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default PopularSubjectsPage;
