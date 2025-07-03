import React, { useState } from 'react';

interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: string;
  upvotes: number;
}

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      text: 'Great subject! Really helpful for understanding the core concepts.',
      author: 'John Doe',
      timestamp: '2024-07-01',
      upvotes: 12
    },
    {
      id: '2',
      text: 'I found this subject very challenging but rewarding. The examples really helped.',
      author: 'Jane Smith',
      timestamp: '2024-07-02',
      upvotes: 8
    }
  ]);

  const [newComment, setNewComment] = useState('');

  const addComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        text: newComment,
        author: 'Anonymous User',
        timestamp: new Date().toISOString().split('T')[0],
        upvotes: 0
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const upvoteComment = (id: string) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, upvotes: comment.upvotes + 1 } : comment
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>
      <div className="mb-6">
        <textarea 
          className="w-full p-3 border rounded-lg mb-2"
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button 
          onClick={addComment}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Post Comment
        </button>
      </div>
      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="border-b pb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{comment.author}</span>
              <span className="text-sm text-gray-500">{comment.timestamp}</span>
            </div>
            <p className="text-gray-700">{comment.text}</p>
            <button 
              onClick={() => upvoteComment(comment.id)}
              className="text-blue-500 hover:text-blue-600 mt-2"
            >
              {comment.upvotes} Upvotes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
