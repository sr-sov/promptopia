'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/profile';

const Profile = () => {
  return (
    <Profile
        name="My"
        desc="Welcome to your persionalized profile page"
        data={[]}
        handleEdit={}
        handleDelete={}
    />
  )
}

export default Profile