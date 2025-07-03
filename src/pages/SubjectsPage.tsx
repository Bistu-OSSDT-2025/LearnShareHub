import { useState } from 'react';
import SubjectSection from '@/components/SubjectSection';

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState<Array<{name: string, desc: string}>>([]);
  const [newSubject, setNewSubject] = useState({
    name: '',
    desc: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewSubject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.name) return;
    
    setSubjects(prev => [newSubject, ...prev]);
    setNewSubject({
      name: '',
      desc: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#e8f5e9] p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#4A9D9A] text-center mb-8">学习科目管理</h1>
        
        <div className="mb-8">
          <SubjectSection 
            title="科目分类" 
            description="学科分类及其子分类"
          />
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-black">创建新科目</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-[#c8e6c9] mb-1">
                科目名称
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newSubject.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-[#c8e6c9] rounded focus:border-[#4A9D9A] focus:outline-none"
                placeholder="输入科目名称"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="desc" className="block text-sm font-medium text-[#c8e6c9] mb-1">
                科目描述
              </label>
              <textarea
                id="desc"
                name="desc"
                value={newSubject.desc}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-2 border border-[#c8e6c9] rounded focus:border-[#4A9D9A] focus:outline-none"
                placeholder="输入科目描述"
              />
            </div>
            <button
              type="submit"
              className="bg-[#c8e6c9] text-white px-4 py-2 rounded hover:bg-[#a5d6a7] transition"
            >
              创建科目
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-lg font-medium">{subject.name}</h3>
              <p className="text-gray-600 mt-2">{subject.desc || '暂无描述'}</p>
              <p className="text-sm text-gray-400 mt-2">
                创建时间: {new Date().toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectsPage;
