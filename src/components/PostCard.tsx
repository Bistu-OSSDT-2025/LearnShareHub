import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock } from 'lucide-react';
import { PostWithAuthor } from '@/integrations/supabase/posts';

interface PostCardProps {
  post: PostWithAuthor;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <p className="text-gray-600 line-clamp-3 flex-grow">{post.content}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mt-4 pt-4 border-t">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.profiles?.avatar_url} />
              <AvatarFallback>{post.profiles?.username?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
            <span>{post.profiles?.username || '匿名用户'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
