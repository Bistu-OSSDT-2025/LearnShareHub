-- Drop the old text-based subject column
ALTER TABLE public.study_groups
DROP COLUMN IF EXISTS subject;

-- Add the new subject_id column to link to the subjects table
ALTER TABLE public.study_groups
ADD COLUMN subject_id BIGINT;

-- Add the foreign key constraint to the new column
ALTER TABLE public.study_groups
ADD CONSTRAINT study_groups_subject_id_fkey
FOREIGN KEY (subject_id)
REFERENCES public.subjects(id)
ON DELETE SET NULL;

COMMENT ON COLUMN public.study_groups.subject_id IS 'Foreign key to the subjects table, allowing groups to be categorized by subject.';
