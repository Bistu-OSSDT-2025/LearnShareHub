
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User, Menu, Plus, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getUserDisplayName = () => {
    if (!user) return '';
    return user.user_metadata?.username || user.email?.split('@')[0] || '用户';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg gradient-bg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                LearnShareHub
              </h1>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="搜索学习资料、讨论帖子..."
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              首页
            </Button>
            <Button variant="ghost" size="sm">
              科目板块
            </Button>
            <Button variant="ghost" size="sm">
              学习小组
            </Button>
            <Button variant="ghost" size="sm">
              资料库
            </Button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {/* New Post Button */}
            <Button size="sm" className="hidden sm:flex bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
              <Plus className="h-4 w-4 mr-1" />
              发帖
            </Button>

            {/* Notifications */}
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                3
              </Badge>
            </Button>

            {/* User Profile */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.user_metadata?.avatar_url} />
                      <AvatarFallback>
                        {getUserDisplayName()[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {getUserDisplayName()}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      个人资料
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    退出登录
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">
                    登录
                  </Link>
                </Button>
                <Button size="sm" asChild className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                  <Link to="/register">
                    注册
                  </Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white py-4 animate-fade-in">
            <div className="space-y-3">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="搜索学习资料、讨论帖子..."
                  className="pl-10 bg-gray-50"
                />
              </div>
              
              {/* Mobile Navigation */}
              <div className="grid grid-cols-2 gap-2">
                <Button variant="ghost" className="justify-start">首页</Button>
                <Button variant="ghost" className="justify-start">科目板块</Button>
                <Button variant="ghost" className="justify-start">学习小组</Button>
                <Button variant="ghost" className="justify-start">资料库</Button>
              </div>
              
              {/* Mobile New Post */}
              <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500">
                <Plus className="h-4 w-4 mr-2" />
                发布新帖子
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
