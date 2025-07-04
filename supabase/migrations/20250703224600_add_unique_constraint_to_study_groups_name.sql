ALTER TABLE public.study_groups
ADD CONSTRAINT study_groups_name_unique UNIQUE (name);

COMMENT ON CONSTRAINT study_groups_name_unique ON public.study_groups IS 'Ensures that every study group has a unique name.';
