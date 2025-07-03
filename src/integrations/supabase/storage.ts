import { supabase } from './client';

const BUCKET_NAME = 'avatars';

/**
 * Uploads a user avatar to the 'avatars' bucket in Supabase Storage.
 * @param file The image file to upload.
 * @param userId The ID of the user, used to create a unique folder for their avatar.
 * @returns The path of the uploaded file.
 * @throws An error if the upload fails.
 */
export const uploadAvatar = async (file: File, userId: string) => {
  // We use the user's ID to create a folder, ensuring avatars are organized.
  // The file name is sanitized to prevent path traversal issues.
  const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
  const filePath = `${userId}/${fileName}`;

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600', // Cache the image for 1 hour
      upsert: false, // Do not overwrite existing files to keep history
    });

  if (error) {
    console.error('Error uploading avatar:', error.message);
    throw new Error('Failed to upload avatar.');
  }

  return data.path;
};

/**
 * Gets the public URL for an avatar from the 'avatars' bucket.
 * @param path The path of the file within the bucket (e.g., 'user-id/avatar.png').
 * @returns The public URL of the avatar.
 */
export const getAvatarUrl = (path: string) => {
  if (!path) return null;
  
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
  return data.publicUrl;
};
