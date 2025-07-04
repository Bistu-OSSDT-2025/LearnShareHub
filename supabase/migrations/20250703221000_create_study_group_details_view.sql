CREATE OR REPLACE VIEW public.study_group_details AS
SELECT
    sg.id,
    sg.name,
    sg.description,
    sg.max_members,
    sg.created_at,
    sg.created_by,
    s.name as subject_name,
    -- Extract display_name from the creator's metadata
    creator_user.raw_user_meta_data->>'display_name' as creator_name,
    -- Extract avatar_url from the creator's metadata (assuming it exists)
    creator_user.raw_user_meta_data->>'avatar_url' as creator_avatar_url,
    (SELECT COUNT(*) FROM public.group_members gm WHERE gm.group_id = sg.id) as member_count,
    (
        SELECT json_agg(json_build_object(
            'user_id', member_user.id,
            'name', member_user.raw_user_meta_data->>'display_name',
            'avatar_url', member_user.raw_user_meta_data->>'avatar_url'
        ))
        FROM public.group_members gm
        -- Join with auth.users to get member details
        JOIN auth.users member_user ON gm.user_id = member_user.id
        WHERE gm.group_id = sg.id
    ) as members
FROM
    public.study_groups sg
LEFT JOIN
    public.subjects s ON sg.subject_id = s.id
-- Join with auth.users to get creator details
LEFT JOIN
    auth.users creator_user ON sg.created_by = creator_user.id;

COMMENT ON VIEW public.study_group_details IS 'Provides a detailed view of study groups, joining with auth.users to get user metadata.';
