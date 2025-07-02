import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
  sender_name: string;
  sender_avatar: string | null;
};

const MessagesPage = () => {
  // 使用直接导入的supabase实例
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 获取所有消息
  const fetchMessages = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('messages')
      .select(`
        id,
        sender_id,
        receiver_id,
        content,
        created_at,
        is_read,
        profiles:profiles!messages_sender_id_fkey(username, avatar_url)
      `)
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('获取消息失败:', error);
      return;
    }

    const formattedMessages = data.map(msg => ({
      ...msg,
      sender_name: msg.profiles?.[0]?.username || '未知用户',
      sender_avatar: msg.profiles?.[0]?.avatar_url || null
    }));

    setMessages(formattedMessages);
  };

  // 发送消息
  const sendMessage = async (receiverId: string) => {
    if (!user || !newMessage.trim()) return;
    
    const { error } = await supabase
      .from('messages')
      .insert({
        sender_id: user.id,
        receiver_id: receiverId,
        content: newMessage.trim()
      });

    if (error) {
      console.error('发送消息失败:', error);
    } else {
      setNewMessage('');
      fetchMessages(); // 刷新消息列表
    }
  };

  useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [user]);

  // 标记消息为已读
  const markMessageAsRead = async (messageId: string) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('id', messageId);

    if (error) {
      console.error('标记消息已读失败:', error);
    } else {
      // 更新本地状态
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, is_read: true } : msg
      ));
    }
  };

  // 处理回复
  const handleReply = async (receiverId: string) => {
    if (!user || !replyContent.trim()) return;
    
    const { error } = await supabase
      .from('messages')
      .insert({
        sender_id: user.id,
        receiver_id: receiverId,
        content: replyContent.trim()
      });

    if (error) {
      console.error('发送回复失败:', error);
    } else {
      setReplyContent('');
      setReplyingTo(null);
      fetchMessages(); // 刷新消息列表
    }
  };

  // 滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">消息中心</h1>
      
      <div className="bg-white rounded-lg shadow p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">系统通知</h2>
          <div className="mt-2 p-3 bg-blue-50 rounded-lg">
            <p>暂无系统通知</p>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">私信</h2>
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={cn(
                  "p-4 rounded-lg border",
                  message.sender_id === user?.id 
                    ? "bg-green-50 border-green-100 ml-auto max-w-md" 
                    : "bg-white border-gray-200 max-w-md"
                )}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.sender_avatar || undefined} />
                    <AvatarFallback>
                      {message.sender_name[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{message.sender_name}</span>
                      <span className="text-sm text-gray-500">
                        {format(new Date(message.created_at), 'MM/dd HH:mm')}
                        {!message.is_read && message.receiver_id === user?.id && (
                          <span className="ml-2 text-blue-500">• 未读</span>
                        )}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-700">{message.content}</p>
                    
                    {message.sender_id !== user?.id && (
                      <div className="mt-2 flex justify-end">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            markMessageAsRead(message.id);
                            setReplyingTo(replyingTo === message.id ? null : message.id);
                          }}
                        >
                          {replyingTo === message.id ? "取消回复" : "回复"}
                        </Button>
                      </div>
                    )}
                    
                    {replyingTo === message.id && (
                      <div className="mt-3 flex gap-2">
                        <Input 
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder={`回复 ${message.sender_name}...`}
                        />
                        <Button 
                          onClick={() => handleReply(message.sender_id)}
                          disabled={!replyContent.trim()}
                        >
                          发送
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
