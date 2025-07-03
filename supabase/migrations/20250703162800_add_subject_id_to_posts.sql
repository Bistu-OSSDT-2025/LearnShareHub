-- Add the subject_id column to the posts table
ALTER TABLE public.posts
ADD COLUMN subject_id BIGINT;

-- Add the foreign key constraint to the new column
ALTER TABLE public.posts
ADD CONSTRAINT posts_subject_id_fkey
FOREIGN KEY (subject_id)
REFERENCES public.subjects(id)
ON DELETE CASCADE;

COMMENT ON COLUMN public.posts.subject_id IS 'Foreign key to the subjects table.';
