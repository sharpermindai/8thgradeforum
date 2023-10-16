import React from 'react';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUser from '@wasp/queries/getUser';
import banUser from '@wasp/actions/banUser';
import unbanUser from '@wasp/actions/unbanUser';
import verifyUser from '@wasp/actions/verifyUser';
import unverifyUser from '@wasp/actions/unverifyUser';

export function Admin() {
  const { data: user, isLoading, error } = useQuery(getUser, { id: 1 });
  const banUserFn = useAction(banUser);
  const unbanUserFn = useAction(unbanUser);
  const verifyUserFn = useAction(verifyUser);
  const unverifyUserFn = useAction(unverifyUser);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleBanUser = () => {
    banUserFn({ userId: user.id });
  };

  const handleUnbanUser = () => {
    unbanUserFn({ userId: user.id });
  };

  const handleVerifyUser = () => {
    verifyUserFn({ userId: user.id });
  };

  const handleUnverifyUser = () => {
    unverifyUserFn({ userId: user.id });
  };

  return (
    <div className='p-4'>
      <h1>Admin Panel</h1>
      <div className='py-2'>
        <h2>User: {user.username}</h2>
        <h3>Status: {user.isAdmin ? 'Admin' : 'Regular User'}</h3>
        <h3>Verification: {user.isVerified ? 'Verified' : 'Unverified'}</h3>
        <h3>Ban Status: {user.isBanned ? 'Banned' : 'Not Banned'}</h3>
        <button
          onClick={handleBanUser}
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
        >
          Ban User
        </button>
        <button
          onClick={handleUnbanUser}
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
        >
          Unban User
        </button>
        <button
          onClick={handleVerifyUser}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2'
        >
          Verify User
        </button>
        <button
          onClick={handleUnverifyUser}
          className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2'
        >
          Unverify User
        </button>
      </div>
    </div>
  );
}