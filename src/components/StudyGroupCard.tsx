
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Calendar, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

interface StudyGroupCardProps {
  group: {
    id: string;
    name: string;
    description: string;
    subject: string;
    memberCount: number;
    maxMembers: number;
    creator: {
      name: string;
      avatar: string;
    };
    members: Array<{
      name: string;
      avatar: string;
    }>;
    nextMeeting?: string;
    isJoined: boolean;
    imageUrl?: string;
    created_by: string;
  };
  onDelete: (id: string) => void;
}

const StudyGroupCard: React.FC<StudyGroupCardProps> = ({ group, onDelete }) => {
  const { user } = useAuth();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`你确定要删除小组 "${group.name}" 吗？`)) {
      onDelete(group.id);
    }
  };

  return (
    <Card className="hover-lift group relative h-full overflow-hidden bg-academic-green-100">
      {user?.id === group.created_by && (
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 z-10 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
      <Link to={`/groups/${group.id}`} className="block h-full">
        {/* 添加小组图片 */}
        <div className="h-40 w-full overflow-hidden bg-gray-100">
          <img
            src={group.imageUrl || '/placeholder.svg'}
            alt={group.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardHeader className={`pb-3 ${group.imageUrl ? 'pt-4' : ''}`}>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors mb-2">
                {group.name}
              </CardTitle>
              <p className="text-sm text-black mb-3">
                {group.description}
              </p>
              <Badge variant="outline" className="text-xs text-brown-700">
                {group.subject}
              </Badge>
            </div>
          </div>
        </CardHeader>
      
      <CardContent className="pt-0">
        {/* Group Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-black">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{group.memberCount}/{group.maxMembers}</span>
            </div>
            {group.nextMeeting && (
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{group.nextMeeting}</span>
              </div>
            )}
          </div>
        </div>

        {/* Creator Info */}
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={group.creator.avatar} />
            <AvatarFallback>{group.creator.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">组长: {group.creator.name}</p>
          </div>
        </div>

        {/* Member Avatars */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex -space-x-2">
            {group.members.slice(0, 4).map((member, index) => (
              <Avatar key={index} className="h-6 w-6 border-2 border-white">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="text-xs">{member.name[0]}</AvatarFallback>
              </Avatar>
            ))}
            {group.members.length > 4 && (
              <div className="h-6 w-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                <span className="text-xs text-gray-600">+{group.members.length - 4}</span>
              </div>
            )}
          </div>
        </div>

        {/* Join Button */}
        <Button 
          className={`w-full ${group.isJoined 
            ? 'bg-green-500 hover:bg-green-600' 
            : 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600'
          }`}
          size="sm"
        >
          {group.isJoined ? '已加入' : '加入小组'}
        </Button>
      </CardContent>
      </Link>
    </Card>
  );
};

export default StudyGroupCard;
