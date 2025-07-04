import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Typography, Tooltip, IconButton } from '@mui/material';
import UserProfile from './UserProfile';
import { fetchUserProfile } from '../services/user.services';
import type { ChessUser } from '../models/UserModel';

type UserListProps = {
  users: string[];
};

const UserList = ({ users }: UserListProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<ChessUser | null>(null);

  const handleOpenProfile = async (name: string): Promise<ChessUser | null> => {
    const response = await fetchUserProfile(name)

    if (response) {
      setIsModalOpen(true)
      setUserInfo(response)
    } else {
      console.error("No user data found for", name);
    }

    return response;
  }

  return (
    <>
      <Typography variant='h5' sx={{ mb: 2, textAlign: 'start', fontWeight: 'bold' }}>Chess Grand Masters</Typography><div className="p-4 h-96 overflow-auto mt-20">
        <UserProfile open={isModalOpen} onClose={() => setIsModalOpen(false)} userInfo={userInfo} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {users?.map((name, index) => (
            <div
              key={index}
              className=" bg-gray-200 text-center p-4 rounded-lg font-medium cursor-pointer hover:bg-gray-300 flex items-center justify-around"
            >
              <Box sx={{ textAlign: 'start' }}>
                <Typography>User Name</Typography>
                {name}
              </Box>
              <Tooltip title="View Profile" placement='top'>
                <IconButton onClick={() => handleOpenProfile(name)}>
                  <VisibilityIcon color='primary' />
                </IconButton>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserList;
