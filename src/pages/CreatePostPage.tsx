import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { createPost } from '@/integrations/supabase/posts';
import { useAuth } from '@/hooks/useAuth';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      await createPost({
        title,
        content,
        user_id: user.id
      });
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">创建新帖子</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="title">标题</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="输入帖子标题"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="content">内容</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="在此处输入帖子内容..."
            rows={6}
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? '发布中...' : '发布帖子'}
        </Button>
      </form>
    </div>
  );
}
