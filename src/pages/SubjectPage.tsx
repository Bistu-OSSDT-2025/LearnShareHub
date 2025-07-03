import React from 'react';
import SubjectSection from '../components/SubjectSection';

export default function SubjectPage() {
  return (
    <div className="p-6">
      <SubjectSection
        title="核心概念学习"
        description="这个科目专注于讲解核心概念，帮助你更好地理解相关知识。"
      />
    </div>
  );
}
