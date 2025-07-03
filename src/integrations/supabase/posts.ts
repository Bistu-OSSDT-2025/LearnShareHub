import { supabase } from './client';

export interface Post {
  id: number;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
}

export interface CreatePostParams {
  user_id: string;
  title: string;
  content: string;
}

export const createPost = async (post: CreatePostParams): Promise<Post> => {
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select()
    .single();

  if (error) {
    throw new Error(`Error creating post: ${error.message}`);
  }

  return data;
};

export const getPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Error fetching posts: ${error.message}`);
  }

  return data;
};
