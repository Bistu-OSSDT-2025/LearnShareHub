import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSubjectById, Subject } from '@/integrations/supabase/subjects';
import { getPostsBySubject, PostWithAuthor } from '@/integrations/supabase/posts';
import PostCard from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SubjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubjectData = async () => {
      if (!id) {
        setError('学科 ID 未提供');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const subjectId = parseInt(id, 10);
        
        const [subjectData, postsData] = await Promise.all([
          getSubjectById(subjectId),
          getPostsBySubject(subjectId)
        ]);

        setSubject(subjectData);
        setPosts(postsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载数据时发生未知错误');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjectData();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">加载中...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">错误: {error}</div>;
  }

  if (!subject) {
    return <div className="text-center py-10">找不到该学科。</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-2">{subject.name}</h1>
        <p className="text-lg text-gray-600">{subject.description}</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">相关帖子</h2>
        <Button asChild>
          <Link to="/create-post">创建新帖子</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <p className="md:col-span-3 text-center text-gray-500">该学科下还没有帖子，快来发布第一篇吧！</p>
        )}
      </div>
    </div>
  );
};

export default SubjectPage;
