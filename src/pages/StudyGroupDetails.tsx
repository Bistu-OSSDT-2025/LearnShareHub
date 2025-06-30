import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Link } from "react-router-dom";
const StudyGroupDetails = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroup = async () => {
      const { data, error } = await supabase
        .from('study_groups')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching group:', error);
      } else {
        setGroup(data);
      }
      setLoading(false);
    };

    fetchGroup();
  }, [id]);

  if (loading) return <div>加载中...</div>;
  if (!group) return <div>小组不存在</div>;

  return (
    <div>
      <h1>{group.name}</h1>
      <p>{group.description}</p>
      {/* 其他详情内容 */}
    </div>
  );
};
export default StudyGroupDetails;