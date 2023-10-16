import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getPosts from '@wasp/queries/getPosts';
import getComments from '@wasp/queries/getComments';
import createComment from '@wasp/actions/createComment';

export function Post() {
  const { postId } = useParams();
  const { data: post, isLoading: postLoading, error: postError } = useQuery(getPosts);
  const { data: comments, isLoading: commentsLoading, error: commentsError } = useQuery(getComments, { postId });
  const createCommentFn = useAction(createComment);
  const [newComment, setNewComment] = useState('');

  if (postLoading || commentsLoading) return 'Loading...';
  if (postError || commentsError) return 'Error: ' + (postError || commentsError);

  const handleCreateComment = () => {
    createCommentFn({ content: newComment, postId });
    setNewComment('');
  };

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold mb-2'>{post.title}</h1>
        <p className='text-gray-600'>{post.content}</p>
      </div>
      <div className='mb-4'>
        <h2 className='text-xl font-bold mb-2'>Comments</h2>
        {comments.map((comment) => (
          <div key={comment.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
      <div>
        <h2 className='text-xl font-bold mb-2'>Add Comment</h2>
        <textarea
          className='border rounded p-2 mb-2 w-full'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button
          onClick={handleCreateComment}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Add Comment
        </button>
      </div>
    </div>
  );
}