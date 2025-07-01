
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, User, FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    author: {
      name: string;
      avatar: string;
      level: string;
    };
    subject: string;
    createdAt: string;
    replies: number;
    likes: number;
    views: number;
    tags: string[];
    isHot?: boolean;
    isPinned?: boolean;
  };
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card className="hover-lift group cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {post.isPinned && (
                <Badge variant="destructive" className="text-xs">
                  置顶
                </Badge>
              )}
              {post.isHot && (
                <Badge variant="default" className="text-xs bg-orange-500">
                  热门
                </Badge>
              )}
              <Badge variant="outline" className="text-xs">
                {post.subject}
              </Badge>
            </div>
            
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2 mb-2">
              {post.title}
            </h3>
            
            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
              {post.content}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          {/* Author Info */}
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{post.author.name}</p>
              <p className="text-xs text-muted-foreground">{post.author.level}</p>
            </div>
          </div>

          {/* Post Stats */}
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <FileText className="h-4 w-4" />
              <span>{post.replies}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Plus className="h-4 w-4" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.createdAt}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
