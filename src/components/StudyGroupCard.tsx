
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Calendar, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  };
}

const StudyGroupCard: React.FC<StudyGroupCardProps> = ({ group }) => {
  return (
    <Card className="hover-lift group cursor-pointer h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg group-hover:text-primary transition-colors mb-2">
              {group.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground mb-3">
              {group.description}
            </p>
            <Badge variant="outline" className="text-xs">
              {group.subject}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Group Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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
    </Card>
  );
};

export default StudyGroupCard;
