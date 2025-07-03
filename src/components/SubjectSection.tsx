import React from 'react';
import { useNavigate } from 'react-router-dom';


interface SubjectProps {
  title: string;
  description: string;
}

const subjects = [
  { 
    id: 1, 
    name: '数学', 
    color: 'bg-[#4A9D9A]',
    subcategories: ['高等数学', '线性代数', '离散数学']
  },
  { 
    id: 2, 
    name: '英语', 
    color: 'bg-[#4A9D9A]',
    subcategories: ['学术英语', '跨文化交流', '口语', '思辨阅读与写作']
  },
  { 
    id: 3, 
    name: '物理', 
    color: 'bg-[#4A9D9A]',
    subcategories: ['大学物理', '物理实验', '电路分析设计']
  },
  { 
    id: 4, 
    name: '计算机科学', 
    color: 'bg-[#4A9D9A]',
    subcategories: ['数据结构', '算法', '操作系统']
  },
];

export default function SubjectSection({ title, description }: SubjectProps) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">{title}</h2>
      <p className="text-gray-600 mb-8 text-lg">{description}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {subjects.map((subject) => (
          <div key={subject.id} className={`rounded-xl overflow-hidden transition-all hover:shadow-md aspect-square ${subject.id === 1 || subject.id === 2 || subject.id === 3 || subject.id === 4 ? 'bg-[#e8f5e9]' : ''}`}>
            <div className={`${subject.color} p-3 text-white flex items-center`}>
              <h3 className="text-lg font-semibold">{subject.name}</h3>
            </div>
            <div className="p-3 grid grid-cols-2 gap-1">
              {subject.subcategories.map((sub, i) => (
                <div key={i} className="bg-morandi-light p-3 rounded-lg text-center text-gray-700 hover:bg-morandi-lighter hover:scale-105 active:bg-morandi active:scale-95 transition-all cursor-pointer" onClick={() => navigate(`/subject/${subject.id}/${encodeURIComponent(sub)}`)}>
                  {sub}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
