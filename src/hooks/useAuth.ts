import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    // 获取初始会话
    const getInitialSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
      }
      setAuthState({
        user: session?.user ?? null,
        session,
        loading: false,
      });
    };

    getInitialSession();

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuthState({
          user: session?.user ?? null,
          session,
          loading: false,
        });

        if (event === 'SIGNED_IN') {
          toast({
            title: "登录成功",
            description: "欢迎回到 LearnShareHub！",
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "已退出登录",
            description: "感谢您的使用，期待您的再次访问！",
          });
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "退出失败",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "退出失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    }
  };

  const isAuthenticated = !!authState.user;
  const isLoading = authState.loading;

  return {
    user: authState.user,
    session: authState.session,
    isAuthenticated,
    isLoading,
    signOut,
  };
};

export default useAuth;