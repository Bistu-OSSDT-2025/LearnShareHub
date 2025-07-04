import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSubjects, createSubject, Subject } from '@/integrations/supabase/subjects';

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjectsData = await getSubjects();
        setSubjects(subjectsData);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
    fetchSubjects();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewSubject(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.name) return;

    setLoading(true);
    try {
      const created = await createSubject(newSubject);
      setSubjects(prev => [created, ...prev]);
      setNewSubject({ name: '', description: '' });
    } catch (error) {
      console.error('Error creating subject:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">所有学科</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">学科列表</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Link to={`/subjects/${subject.id}`} key={subject.id}>
                <Card className="h-full hover:shadow-lg transition-shadow bg-white border-white">
                  <CardHeader>
                    <CardTitle>{subject.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{subject.description || '暂无描述'}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">创建新学科</h2>
          <Card className="bg-white border-white">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <Label htmlFor="name">学科名称</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newSubject.name}
                    onChange={handleInputChange}
                    placeholder="例如：线性代数"
                    required
                    className="border-white"
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="description">学科描述</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newSubject.description}
                    onChange={handleInputChange}
                    placeholder="简单描述一下这个学科"
                    rows={4}
                    className="border-white"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? '创建中...' : '创建学科'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubjectsPage;
