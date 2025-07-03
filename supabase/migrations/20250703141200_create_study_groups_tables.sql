-- Create the study_groups table
CREATE TABLE study_groups (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    description TEXT,
    subject TEXT,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    max_members INT DEFAULT 10,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE study_groups IS 'Stores information about study groups.';

-- Create the group_members table
CREATE TABLE group_members (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    group_id BIGINT REFERENCES study_groups(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(group_id, user_id)
);

COMMENT ON TABLE group_members IS 'Stores the membership of users in study groups.';

-- Add the creator as the first member and admin of the group
CREATE OR REPLACE FUNCTION public.handle_new_study_group()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.group_members (group_id, user_id, role)
  VALUES (new.id, new.created_by, 'admin');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_study_group_created
  AFTER INSERT ON public.study_groups
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_study_group();
