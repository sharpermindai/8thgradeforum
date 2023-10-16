import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getPosts from '@wasp/queries/getPosts';
import createPost from '@wasp/actions/createPost';

export function HomePage() {
  const { data: posts, isLoading, error } = useQuery(getPosts);
  const createPostFn = useAction(createPost);
  const [newPostTitle, setNewPostTitle] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreatePost = () => {
    createPostFn({ title: newPostTitle });
    setNewPostTitle('');
  };

  return (
    <div className='p-4'>
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='New Post'
          className='px-1 py-2 border rounded text-lg'
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <button
          onClick={handleCreatePost}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Add Post
        </button>
      </div>
      <div>
        {posts.map((post) => (
          <div
            key={post.id}
            className='py-2 px-2 flex items-center hover:bg-slate-100 gap-x-2 rounded'
          >
            <Link to={`/post/${post.id}`}>
              <p>{post.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}