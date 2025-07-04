import { supabase } from './client';

export interface Post {
  id: number;
  user_id: string;
  subject_id: number;
  title: string;
  content: string;
  created_at: string;
}

export interface PostWithAuthor extends Post {
  profiles: {
    username: string;
    avatar_url: string;
  } | null;
}

export interface CreatePostParams {
  user_id: string;
  subject_id: number;
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

export const getPostsBySubject = async (subjectId: number): Promise<PostWithAuthor[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:user_id (
        username,
        avatar_url
      )
    `)
    .eq('subject_id', subjectId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Error fetching posts by subject: ${error.message}`);
  }

  return data;
};

export const getPosts = async (): Promise<PostWithAuthor[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:user_id (
        username,
        avatar_url
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Error fetching posts: ${error.message}`);
  }

  return data;
};
