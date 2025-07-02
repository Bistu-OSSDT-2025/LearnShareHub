
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User, FileText } from 'lucide-react';

interface SubjectCardProps {
  subject: {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    postCount: number;
    memberCount: number;
    latestPost: {
      title: string;
      author: string;
      time: string;
    };
    tags: string[];
  };
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject }) => {
  return (
    <Card className="hover-lift group cursor-pointer border-0 shadow-sm hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div 
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold ${subject.color}`}
            >
              {subject.icon}
            </div>
            <div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {subject.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {subject.description}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Statistics */}
        <div className="flex items-center space-x-6 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <FileText className="h-4 w-4" />
            <span>{subject.postCount} 帖子</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{subject.memberCount} 成员</span>
          </div>
        </div>

        {/* Latest Post */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">
            最新: {subject.latestPost.title}
          </p>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>by {subject.latestPost.author}</span>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{subject.latestPost.time}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {subject.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;
